import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  WASocket,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import pino from "pino";
import qrcodeTerminal from "qrcode-terminal";
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
          if (sock) {
            await sock.sendMessage(targetJid, { text: reply });
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
