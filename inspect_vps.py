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

stdin, stdout, stderr = ssh.exec_command('docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"; iptables -L INPUT -n -v')
print(stdout.read().decode())

ssh.close()
