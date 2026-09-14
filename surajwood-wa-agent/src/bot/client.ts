import { create, Client, ChatId, ev } from "@open-wa/wa-automate";
import qrcodeTerminal from "qrcode-terminal";
import QRCode from "qrcode";
import { enqueueMessage, registerHumanResponse } from "../handlers/messageQueue";
import { CONFIG } from "../config";

let waClient: Client | null = null;
let latestQrCodeData: string | null = null;
let connectionStatus: "disconnected" | "qr_ready" | "connected" | "authenticated" = "disconnected";

// Listen to all events emitted by OpenWA
ev.onAny((event: any, value: any) => {
  const eventName = Array.isArray(event) ? event.join(".") : String(event);
  console.log(`[OpenWA Event]: ${eventName}`);
  if (eventName.includes("qr")) {
    const qrStr = typeof value === "string" ? value : value?.qr || value?.data;
    if (typeof qrStr === "string") {
      handleQrCode(qrStr);
    }
  }
});

ev.on("sessionData.**", () => {
  connectionStatus = "authenticated";
});

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

export async function getLivePageScreenshot(): Promise<Buffer | null> {
  try {
    if (waClient && (waClient as any).page) {
      return await (waClient as any).page.screenshot({ type: "png" });
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export async function initWhatsAppBot(): Promise<Client> {
  console.log("🚀 Initializing SurajWood WhatsApp Bot with Open-WA...");

  const client = await create({
    sessionId: "SURAJWOOD_WA_SESSION",
    multiDevice: true,
    authTimeout: 0,
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    logConsole: true,
    useChrome: true,
    qrTimeout: 0,
    sessionDataPath: CONFIG.sessionDataPath,
    qrRefreshS: 15,
    qrLogSkip: false,
    throwErrorOnTosBlock: false,
    killProcessOnBrowserClose: false,
  });

  waClient = client;
  connectionStatus = "connected";
  console.log("✅ SurajWood WhatsApp Client Connected & Authenticated!");

  // Listen for state changes
  client.onStateChanged((state) => {
    console.log(`[WA State Changed]: ${state}`);
    if (state === "CONFLICT" || state === "UNLAUNCHED") {
      client.forceRefocus();
    }
  });

  // Listen for incoming messages
  client.onMessage(async (message) => {
    try {
      const isGroup = message.isGroupMsg;
      if (isGroup) {
        // Optionally ignore group chats unless mentioned
        return;
      }

      const chatId = message.from;
      const text = message.body || message.caption || "";
      const senderName = message.sender?.pushname || message.sender?.formattedName || "Customer";

      if (!text || text.trim().length === 0) {
        return;
      }

      console.log(`📩 [Incoming WA] ${chatId} (${senderName}): "${text}"`);

      // Enqueue for AI response with debouncing
      enqueueMessage(chatId, text, senderName, async (targetChatId, reply) => {
        try {
          await client.sendText(targetChatId as any, reply);
          console.log(`📤 [AI Replied to] ${targetChatId}`);
        } catch (sendErr) {
          console.error(`❌ Failed to send reply to ${targetChatId}:`, sendErr);
        }
      });
    } catch (err) {
      console.error("[onMessage Error]:", err);
    }
  });

  // Listen for outgoing messages sent by human from phone
  client.onAnyMessage(async (message) => {
    if (message.fromMe && message.to && !message.isGroupMsg) {
      // Human sales rep answered from mobile device
      registerHumanResponse(message.to as any);
    }
  });

  return client;
}

// Handler for QR codes before client starts
export function handleQrCode(qrCode: string) {
  latestQrCodeData = qrCode;
  connectionStatus = "qr_ready";
  console.log("\n==================== SCAN WHATSAPP QR CODE ====================");
  qrcodeTerminal.generate(qrCode, { small: true });
  console.log("===============================================================\n");
  console.log(`Tip: You can also scan via Web Browser at http://YOUR_SERVER_IP:${CONFIG.port}/qr\n`);
}
