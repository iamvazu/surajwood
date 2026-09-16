import paramiko
import sys

HOST = "187.127.148.61"
USER = "root"
PASSWORD = "1302@Sanjose"

print(f"Connecting to {HOST} via SSH...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    print("SSH Connection Successful!")
    
    stdin, stdout, stderr = ssh.exec_command("uname -a; lsb_release -a; free -m; node -v; pm2 -v")
    print("=== System Info ===")
    print(stdout.read().decode())
    print("=== Errors (if any) ===")
    print(stderr.read().decode())
    
    ssh.close()
except Exception as e:
    print(f"Error connecting: {e}")
    sys.exit(1)
