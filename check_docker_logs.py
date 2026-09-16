import paramiko
import urllib.request
import json
import time

HOST = "187.127.148.61"
USER = "root"
PASSWORD = "1302@Sanjose"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASSWORD, timeout=10)

stdin, stdout, stderr = ssh.exec_command("docker logs surajwood-wa-agent --tail 30")
print("=== DOCKER CONTAINER LOGS ===")
print(stdout.read().decode())

ssh.close()
