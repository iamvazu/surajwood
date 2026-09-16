import paramiko
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HOST = "187.127.148.61"
USER = "root"
PASSWORD = "1302@Sanjose"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASSWORD, timeout=10)

# Check .env and write default .env if missing
env_content = """ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
ADMIN_WHATSAPP_NUMBERS=919009171819@c.us
PORT=3005
SESSION_DATA_PATH=/var/www/surajwood-wa-agent/data/session
DEBOUNCE_DELAY_MS=4000
HUMAN_TAKEOVER_MINUTES=45
"""

sftp = ssh.open_sftp()
with sftp.file('/var/www/surajwood-wa-agent/.env', 'w') as f:
    f.write(env_content)
sftp.close()

stdin, stdout, stderr = ssh.exec_command("pm2 restart surajwood-wa-agent; sleep 3; pm2 logs surajwood-wa-agent --lines 25 --nostream")
print("=== PM2 LOGS ===")
print(stdout.read().decode())
print(stderr.read().decode())

# Test HTTP request to localhost:3005
stdin, stdout, stderr = ssh.exec_command("curl -I http://127.0.0.1:3005/health; curl -I http://127.0.0.1:3005/qr")
print("=== HTTP TEST ===")
print(stdout.read().decode())

ssh.close()
