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

anthropic_key = os.environ.get("ANTHROPIC_API_KEY", "")
env_content = f"""ANTHROPIC_API_KEY={anthropic_key}
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
ADMIN_WHATSAPP_NUMBERS=919009171819@c.us
PORT=3005
SESSION_DATA_PATH=/app/data/session
DEBOUNCE_DELAY_MS=4000
HUMAN_TAKEOVER_MINUTES=45
NODE_ENV=production
"""

sftp = ssh.open_sftp()
with sftp.file('/var/www/surajwood-wa-agent/.env', 'w') as f:
    f.write(env_content)
sftp.close()
print("Updated /var/www/surajwood-wa-agent/.env on Hostinger VPS!")

# Restart docker container
stdin, stdout, stderr = ssh.exec_command("cd /var/www/surajwood-wa-agent && docker compose restart")
print(stdout.read().decode())
print(stderr.read().decode())

# Check container status and logs
stdin, stdout, stderr = ssh.exec_command("docker ps | grep surajwood; docker logs surajwood-wa-agent --tail 25")
print("=== DOCKER LOGS ===")
print(stdout.read().decode())

ssh.close()
