import paramiko
import json

HOST = "187.127.148.61"
USER = "root"
PASSWORD = "1302@Sanjose"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASSWORD, timeout=10)

stdin, stdout, stderr = ssh.exec_command("docker inspect jicreations_wordpress --format '{{json .Config.Labels}}'; docker inspect brightbean-studio-app-1 --format '{{json .Config.Labels}}'")
print("=== LABELS ===")
print(stdout.read().decode())

ssh.close()
