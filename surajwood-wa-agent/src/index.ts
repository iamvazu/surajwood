import express, { Request, Response } from "express";
import cors from "cors";
import QRCode from "qrcode";
import { CONFIG } from "./config";
import { initWhatsAppBot, getStatus, getLatestQrData } from "./bot/client";
import { getRecentLeads } from "./services/leadStore";

const app = express();
app.use(cors());
app.use(express.json());

// ─── Web Dashboard & QR Scan UI ─────────────────────────────────────────────
app.get("/qr", async (req: Request, res: Response) => {
  const status = getStatus();
  const qrData = getLatestQrData();

  if (status.connected) {
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SurajWood WhatsApp AI Agent - Connected</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0B0F17; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #151C28; border: 1px solid #1E293B; border-radius: 20px; padding: 40px; text-align: center; max-width: 440px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .badge { display: inline-flex; align-items: center; gap: 8px; background: #064E3B; color: #34D399; font-weight: bold; font-size: 13px; padding: 6px 14px; border-radius: 9999px; margin-bottom: 20px; }
          h1 { font-size: 22px; margin: 0 0 10px; color: #fff; }
          p { color: #94A3B8; font-size: 14px; line-height: 1.6; }
          .pulse { width: 10px; height: 10px; background: #10B981; border-radius: 50%; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); animation: pulse 1.6s infinite; }
          @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge"><div class="pulse"></div> BOT LIVE & CONNECTED</div>
          <h1>SurajWood WhatsApp Agent Active</h1>
          <p>Anthropic Claude 3.5 AI is actively answering inquiries, calculating kitchen/wardrobe estimates, and dispatching sample requests.</p>
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #1E293B;">
            <a href="/api/leads" style="color: #C28E5C; font-size: 13px; text-decoration: none; font-weight: bold;">View Recent Leads & Quotes →</a>
          </div>
        </div>
      </body>
      </html>
    `);
  }

  if (!qrData) {
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SurajWood Bot - Generating QR Code...</title>
        <meta http-equiv="refresh" content="3">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: sans-serif; background: #0B0F17; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #151C28; padding: 40px; border-radius: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>🚀 Initializing WhatsApp Session...</h2>
          <p style="color: #94A3B8;">Connecting to Chromium. This page will refresh automatically in 3 seconds.</p>
        </div>
      </body>
      </html>
    `);
  }

  try {
    const qrImage = await QRCode.toDataURL(qrData, { width: 320, margin: 2 });
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SurajWood WhatsApp Bot - Link Device</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="refresh" content="20">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0B0F17; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
          .card { background: #151C28; border: 1px solid #1E293B; border-radius: 24px; padding: 32px; text-align: center; max-width: 440px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          h1 { font-size: 20px; margin: 0 0 8px; }
          p { color: #94A3B8; font-size: 13px; line-height: 1.5; margin: 0 0 20px; }
          .qr-box { background: #fff; padding: 12px; border-radius: 16px; display: inline-block; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
          .qr-box img { display: block; border-radius: 8px; width: 100%; max-width: 280px; height: auto; }
          .instructions { text-align: left; background: #0B0F17; padding: 16px; border-radius: 12px; margin-top: 24px; font-size: 12px; color: #CBD5E1; border: 1px solid #1E293B; }
          .instructions ol { margin: 8px 0 0; padding-left: 18px; }
          .instructions li { margin-bottom: 6px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Link SurajWood WhatsApp</h1>
          <p>Scan this QR code with your WhatsApp Business phone to activate the Claude AI Agent.</p>
          <div class="qr-box">
            <img src="${qrImage}" alt="WhatsApp QR Code" />
          </div>
          <div class="instructions">
            <strong>How to Link:</strong>
            <ol>
              <li>Open WhatsApp on your phone</li>
              <li>Tap <strong>Settings / Menu (⋮)</strong> &gt; <strong>Linked Devices</strong></li>
              <li>Tap <strong>Link a Device</strong> and point your camera at this QR code</li>
            </ol>
          </div>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    return res.status(500).send("Error generating QR code");
  }
});

// ─── Health & API Endpoints ──────────────────────────────────────────────────
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    bot: getStatus(),
    company: CONFIG.companyName,
    model: CONFIG.anthropicModel,
  });
});

app.get("/api/leads", (req: Request, res: Response) => {
  res.json({
    leads: getRecentLeads(50),
  });
});

// ─── Start Server & Bot ──────────────────────────────────────────────────────
const server = app.listen(CONFIG.port, () => {
  console.log(`\n🌐 SurajWood WhatsApp Agent Dashboard running at http://localhost:${CONFIG.port}`);
  console.log(`📱 Web QR Code Page: http://localhost:${CONFIG.port}/qr\n`);

  initWhatsAppBot().catch((err) => {
    console.error("❌ Failed to start WhatsApp Bot Client:", err);
  });
});
