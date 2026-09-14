#!/bin/bash
set -e

echo "========================================================"
echo "    SurajWood WhatsApp AI Agent - Hostinger Setup     "
echo "========================================================"

# 1. Update system packages
echo "📦 [1/6] Updating system packages..."
apt-get update -y && apt-get upgrade -y

# 2. Install Node.js 20 LTS if missing
if ! command -v node &> /dev/null; then
  echo "📦 [2/6] Installing Node.js 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

# 3. Install Chromium dependencies for headless browser
echo "🌐 [3/6] Installing Chromium & Puppeteer runtime dependencies..."
apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libgcc1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  chromium-browser \
  git \
  build-essential

# 4. Install PM2 globally
echo "⚙️ [4/6] Installing PM2 Process Manager..."
npm install -g pm2

# 5. Install Agent dependencies & build TypeScript
echo "🔨 [5/6] Installing npm packages and compiling TypeScript..."
mkdir -p logs data/session
npm install
npm run build

# 6. Start or Restart with PM2
echo "🚀 [6/6] Launching SurajWood WhatsApp Agent via PM2..."
pm2 delete surajwood-wa-agent 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo ""
echo "========================================================"
echo "✅ SURAJWOOD WHATSAPP AI AGENT IS NOW RUNNING!"
echo "========================================================"
echo "👉 Open Web QR Code: http://187.127.148.61:3005/qr"
echo "👉 Monitor Live Logs: pm2 logs surajwood-wa-agent"
echo "👉 Leads & Quotes:   http://187.127.148.61:3005/api/leads"
echo "========================================================"
