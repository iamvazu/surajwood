import paramiko
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HOST = "187.127.148.61"
USER = "root"
PASSWORD = "1302@Sanjose"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)

docker_deploy_cmd = """
# Stop PM2 instance to avoid port conflict
pm2 stop surajwood-wa-agent 2>/dev/null || true
pm2 delete surajwood-wa-agent 2>/dev/null || true

cd /var/www/surajwood_repo
git pull origin main
cp -ru /var/www/surajwood_repo/surajwood-wa-agent/* /var/www/surajwood-wa-agent/

cd /var/www/surajwood-wa-agent
if [ ! -f .env ]; then
    cp .env.example .env
fi

docker compose down 2>/dev/null || true
docker compose up -d --build
docker ps | grep surajwood
"""

print("Executing Docker Build & Deployment on Hostinger VPS...")
stdin, stdout, stderr = ssh.exec_command(docker_deploy_cmd, get_pty=True)
while True:
    line = stdout.readline()
    if not line:
        break
    print(line, end="")

exit_code = stdout.channel.recv_exit_status()
print(f"\nFinished with exit code: {exit_code}")

ssh.close()
