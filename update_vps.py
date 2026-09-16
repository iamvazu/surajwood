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

update_cmd = """
cd /var/www/surajwood_repo
git pull origin main
cp -ru /var/www/surajwood_repo/surajwood-wa-agent/* /var/www/surajwood-wa-agent/
cd /var/www/surajwood-wa-agent
npm run build
pm2 restart surajwood-wa-agent
sleep 3
pm2 status
"""

stdin, stdout, stderr = ssh.exec_command(update_cmd)
print("=== UPDATE OUTPUT ===")
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
