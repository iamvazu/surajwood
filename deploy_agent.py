import tarfile
import paramiko
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HOST = "187.127.148.61"
USER = "root"
PASSWORD = "1302@Sanjose"

def deploy():
    tar_path = os.path.join(os.getcwd(), "agent_update.tar.gz")
    local_base = os.path.join(os.getcwd(), "surajwood-wa-agent")

    print("📦 Creating tar.gz archive...")
    with tarfile.open(tar_path, "w:gz") as tar:
        tar.add(os.path.join(local_base, "dist"), arcname="dist")
        tar.add(os.path.join(local_base, "src"), arcname="src")

    print(f"Archive size: {os.path.getsize(tar_path)} bytes")

    print("🚀 Uploading archive to VPS...")
    transport = paramiko.Transport((HOST, 22))
    transport.connect(username=USER, password=PASSWORD)
    sftp = paramiko.SFTPClient.from_transport(transport)
    sftp.put(tar_path, "/tmp/agent_update.tar.gz")
    sftp.close()
    transport.close()

    print("🔧 Extracting and updating container on VPS...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)

    cmds = [
        "tar -xzf /tmp/agent_update.tar.gz -C /var/www/surajwood-wa-agent/",
        "docker cp /var/www/surajwood-wa-agent/dist surajwood-wa-agent:/app/",
        "docker cp /var/www/surajwood-wa-agent/public surajwood-wa-agent:/app/",
        "docker restart surajwood-wa-agent",
        "sleep 3",
        "docker logs surajwood-wa-agent --tail 25",
    ]

    for cmd in cmds:
        print(f">>> {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        out = stdout.read().decode()
        err = stderr.read().decode()
        if out:
            print(out)
        if err:
            print("ERR:", err)

    ssh.close()
    if os.path.exists(tar_path):
        os.remove(tar_path)
    print("🎉 Deployment finished successfully!")

if __name__ == "__main__":
    deploy()
