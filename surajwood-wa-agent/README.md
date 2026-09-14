# SurajWood 24/7 WhatsApp AI Agent 🤖🪵

A fully autonomous, multi-device WhatsApp AI Agent built for **Suraj Wood Products Pvt. Ltd.** powered by **Anthropic Claude 3.5 Sonnet** and **Open-WA**.

---

## 🌟 Key Features

1. **24/7 Architect & OEM Consultation**: Answers questions regarding Acrylux, Acrymatte, Acrysilk, Acryglass UNO (1.5mm/2mm), and Continental 3D Membrane Shutters with deep technical precision.
2. **Instant Cost Estimator Tool**: Automatically calculates square footage, sheet requirements, edgeband costs, substrate options (HDHMR, MDF, Birch), and GST for kitchen layouts, wardrobes, and wall panels.
3. **Complimentary Sample Box Capture**: Collects architect/designer studio addresses, phone numbers, and requested finishes and logs them into `data/leads.json`.
4. **Smart Message Debouncing**: Waits 4 seconds to group rapid-fire incoming WhatsApp messages into a single coherent prompt before replying.
5. **Human Sales Rep Takeover**: If an internal sales rep responds from the mobile phone, the bot automatically mutes itself on that conversation for 45 minutes so you can chat naturally without bot interruptions.
6. **Web QR Code Portal**: View and scan your WhatsApp linking QR code via a clean browser UI at `http://YOUR_SERVER_IP:3005/qr`.

---

## 📁 Architecture Overview

```
surajwood-wa-agent/
├── src/
│   ├── index.ts               # Express server, healthcheck & Web QR page
│   ├── config.ts              # Environment settings & company constants
│   ├── agent/
│   │   ├── claude.ts          # Anthropic SDK orchestration & tool execution loop
│   │   ├── prompt.ts          # SurajWood system instructions & tone guidelines
│   │   └── tools.ts           # Tool schemas (calculate_quote, request_sample_kit, handover)
│   ├── knowledge/
│   │   └── catalog.ts         # Structured 2026 specs, substrates, edgebands & FAQs
│   ├── services/
│   │   ├── costCalculator.ts  # Ver 2.0 Pricing formula engine
│   │   └── leadStore.ts       # Lead persistence (data/leads.json)
│   ├── handlers/
│   │   └── messageQueue.ts    # Debouncer & human takeover detector
│   └── bot/
│       └── client.ts          # Open-WA headless Chromium lifecycle & QR generation
├── ecosystem.config.js        # PM2 production configuration
├── deploy.sh                  # 1-command VPS deployment script
├── package.json
└── tsconfig.json
```

---

## 🚀 Hostinger VPS Setup Instructions (`187.127.148.61`)

### Step 1: Connect to VPS via SSH
```bash
ssh root@187.127.148.61
```

### Step 2: Clone or Copy Project onto the Server
```bash
mkdir -p /var/www/surajwood-wa-agent
cd /var/www/surajwood-wa-agent
```
*(Copy the files from this folder using SCP, Git, or SFTP)*

### Step 3: Configure `.env`
```bash
cp .env.example .env
nano .env
```
Paste your **Anthropic API Key**:
```env
ANTHROPIC_API_KEY=sk-ant-api03-...
ADMIN_WHATSAPP_NUMBERS=919009171819@c.us
PORT=3005
```

### Step 4: Run the Automated Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

### Step 5: Link WhatsApp Device
1. Open your browser and go to: `http://187.127.148.61:3005/qr`
2. Open WhatsApp on your business phone (`Settings > Linked Devices > Link a Device`).
3. Scan the QR code displayed on the screen.
4. Once scanned, the screen will switch to **BOT LIVE & CONNECTED**.

---

## 📊 Useful Server Commands

- **Check Bot Status**: `pm2 status`
- **View Live Message Logs**: `pm2 logs surajwood-wa-agent`
- **Restart Bot**: `pm2 restart surajwood-wa-agent`
- **Stop Bot**: `pm2 stop surajwood-wa-agent`
- **View Captured Leads**: `curl http://localhost:3005/api/leads`
