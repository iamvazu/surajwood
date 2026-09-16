import paramiko
import time
import sys
import codecs

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HOST = "187.127.148.61"
USER = "root"
PASSWORD = "1302@Sanjose"

def run_command(ssh, cmd, stream_output=True):
    print(f"\n[EXEC] {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd, get_pty=True)
    out_lines = []
    while True:
        line = stdout.readline()
        if not line:
            break
        if stream_output:
            try:
                print(line, end="")
            except Exception:
                print(line.encode("ascii", "replace").decode("ascii"), end="")
        out_lines.append(line)
    exit_status = stdout.channel.recv_exit_status()
    if exit_status != 0:
        print(f"[ERROR] Command exited with code {exit_status}")
    return exit_status, "".join(out_lines)

print(f"Connecting to {HOST}...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASSWORD, timeout=30)
print("Connected successfully!\n")

# 1. Check & Allow Firewall Port 3005
run_command(ssh, "ufw allow 3005/tcp || true; iptables -I INPUT -p tcp --dport 3005 -j ACCEPT || true")

# 2. Install PM2 and required Chromium libraries for Ubuntu 24.04
commands = [
    "npm install -g pm2",
    "apt-get update -y && apt-get install -y ca-certificates fonts-liberation libasound2t64 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 git build-essential",
]

for cmd in commands:
    status, _ = run_command(ssh, cmd)
    if status != 0:
        print(f"Warning during: {cmd}")

# 3. Setup Project Directory
run_command(ssh, "mkdir -p /var/www/surajwood-wa-agent")

# 4. Clone or pull repo
setup_repo_cmd = """
if [ -d "/var/www/surajwood_repo" ]; then
    cd /var/www/surajwood_repo && git pull origin main
else
    cd /var/www && git clone https://github.com/iamvazu/surajwood.git surajwood_repo
fi
cp -ru /var/www/surajwood_repo/surajwood-wa-agent/* /var/www/surajwood-wa-agent/
"""
run_command(ssh, setup_repo_cmd)

# 5. Configure .env in /var/www/surajwood-wa-agent
env_cmd = """
cd /var/www/surajwood-wa-agent
if [ ! -f .env ]; then
    cp .env.example .env
fi
"""
run_command(ssh, env_cmd)

# 6. Install node modules & build typescript
build_cmd = """
cd /var/www/surajwood-wa-agent
mkdir -p logs data/session
npm install
npm run build
"""
run_command(ssh, build_cmd)

# 7. Start/Restart with PM2
pm2_cmd = """
cd /var/www/surajwood-wa-agent
pm2 delete surajwood-wa-agent 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup | tail -n 1 | bash 2>/dev/null || true
pm2 status
"""
run_command(ssh, pm2_cmd)

print("\n========================================================")
print("Deployment Completed on Hostinger VPS!")
print(f"Web QR Code URL: http://{HOST}:3005/qr")
print("========================================================")

ssh.close()
