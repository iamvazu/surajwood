import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  WASocket,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import pino from "pino";
import qrcodeTerminal from "qrcode-terminal";
import fs from "fs";
import path from "path";
import { enqueueMessage, registerHumanResponse } from "../handlers/messageQueue";
import { CONFIG } from "../config";

let sock: WASocket | null = null;
let latestQrCodeData: string | null = null;
let connectionStatus: "disconnected" | "qr_ready" | "connected" | "authenticated" = "disconnected";

export function getStatus() {
  return {
    status: connectionStatus,
    hasQr: Boolean(latestQrCodeData),
    connected: connectionStatus === "connected" || connectionStatus === "authenticated",
  };
}

export function getLatestQrData() {
  return latestQrCodeData;
}

export async function initWhatsAppBot(): Promise<WASocket> {
  console.log("🚀 Initializing SurajWood WhatsApp Bot with Baileys WebSocket...");

  const { state, saveCreds } = await useMultiFileAuthState(CONFIG.sessionDataPath);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`Using WA Web protocol v${version.join(".")}, isLatest: ${isLatest}`);

  sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }) as any,
    printQRInTerminal: false,
    auth: state,
    generateHighQualityLinkPreview: true,
    browser: ["SurajWood AI Desk", "Chrome", "1.0.0"],
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      latestQrCodeData = qr;
      connectionStatus = "qr_ready";
      console.log("\n==================== SCAN WHATSAPP QR CODE ====================");
      qrcodeTerminal.generate(qr, { small: true });
      console.log("===============================================================\n");
      console.log(`👉 Web QR Code: http://0.0.0.0:${CONFIG.port}/qr\n`);
    }

    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log(
        "❌ Connection closed due to:",
        lastDisconnect?.error,
        ", reconnecting:",
        shouldReconnect
      );
      connectionStatus = "disconnected";
      if (shouldReconnect) {
        initWhatsAppBot();
      }
    } else if (connection === "open") {
      console.log("✅ SurajWood WhatsApp Client Connected & Authenticated via WebSocket!");
      connectionStatus = "connected";
      latestQrCodeData = null;
    }
  });

  // Listen to incoming messages
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    for (const msg of messages) {
      if (!msg.message) continue;

      const senderJid = msg.key.remoteJid;
      if (!senderJid || senderJid.endsWith("@g.us")) {
        // Skip group messages
        continue;
      }

      // If message was sent by human sales rep from the business phone
      if (msg.key.fromMe) {
        registerHumanResponse(senderJid);
        continue;
      }

      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        msg.message.imageMessage?.caption ||
        "";

      const senderName = msg.pushName || "Customer";

      if (!text || text.trim().length === 0) continue;

      console.log(`📩 [Incoming WA] ${senderJid} (${senderName}): "${text}"`);

      // Enqueue with debouncing
      enqueueMessage(senderJid, text, senderName, async (targetJid, reply) => {
        try {
          if (!sock) return;

          // 1. If images are attached, send each photo with caption
          if (reply.images && reply.images.length > 0) {
            for (const img of reply.images) {
              try {
                let imagePayload: any = null;
                const urlPath = img.url.replace(/^https?:\/\/[^\/]+/, "");
                const possibleLocalPaths = [
                  path.join(process.cwd(), "public", urlPath),
                  path.join("/app/public", urlPath),
                  path.join("/var/www/surajwood-wa-agent/public", urlPath),
                ];

                let foundPath: string | null = null;
                for (const p of possibleLocalPaths) {
                  if (fs.existsSync(p)) {
                    foundPath = p;
                    break;
                  }
                }

                if (foundPath) {
                  imagePayload = fs.readFileSync(foundPath);
                  console.log(`🖼️ [Photo Loaded Locally from ${foundPath}]`);
                } else {
                  imagePayload = { url: img.url };
                  console.log(`🖼️ [Photo Loading from URL: ${img.url}]`);
                }

                await sock.sendMessage(targetJid, {
                  image: imagePayload,
                  caption: img.caption || "",
                });
                console.log(`🖼️ [Photo Sent to] ${targetJid}: ${img.url}`);
              } catch (imgErr) {
                console.error(`❌ Failed to send image to ${targetJid}:`, imgErr);
              }
            }
          }

          // 2. Send the main text reply
          if (reply.text && reply.text.trim().length > 0) {
            await sock.sendMessage(targetJid, { text: reply.text });
            console.log(`📤 [AI Replied to] ${targetJid}`);
          }
        } catch (sendErr) {
          console.error(`❌ Failed to send reply to ${targetJid}:`, sendErr);
        }
      });
    }
  });

  return sock;
}
