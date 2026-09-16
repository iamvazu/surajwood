import paramiko
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HOST = "187.127.148.61"
USER = "root"
PASSWORD = "1302@Sanjose"

def run_ssh(cmd):
    print(f"\n>>> Running: {cmd}")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode()
    err = stderr.read().decode()
    ssh.close()
    if out:
        print("STDOUT:\n", out.strip())
    if err:
        print("STDERR:\n", err.strip())
    return out, err

def setup_openwa():
    print("🚀 Configuring OpenWA Docker container on Hostinger VPS...")

    # 1. Create data directory and env file
    env_content = """# OpenWA - Production Environment Configuration
PORT=2785
BIND_HOST=0.0.0.0
NODE_ENV=production

# Database (Self-contained SQLite)
DATABASE_TYPE=sqlite
DATABASE_NAME=/app/data/openwa.sqlite
DATABASE_SYNCHRONIZE=true
DATABASE_LOGGING=false

# Storage & Sessions
STORAGE_TYPE=local
STORAGE_LOCAL_PATH=/app/data/media
SESSION_DATA_PATH=/app/data/sessions
AUTO_START_SESSIONS=true
MAX_CONCURRENT_SESSIONS=10

# WhatsApp Engine (Default to baileys for low memory & fast web socket sync)
ENGINE_TYPE=baileys

# Redis / Queue disabled for standalone deployment
REDIS_ENABLED=false
QUEUE_ENABLED=false
CACHE_ENABLED=false

# Web UI & Swagger
ENABLE_SWAGGER=true
LOG_LEVEL=info
"""

    compose_content = """services:
  openwa:
    image: ghcr.io/rmyndharis/openwa:latest
    container_name: openwa-api
    restart: unless-stopped
    ports:
      - "0.0.0.0:2785:2785"
    environment:
      - PORT=2785
      - BIND_HOST=0.0.0.0
      - NODE_ENV=production
      - DATABASE_TYPE=sqlite
      - DATABASE_NAME=/app/data/openwa.sqlite
      - DATABASE_SYNCHRONIZE=true
      - STORAGE_TYPE=local
      - STORAGE_LOCAL_PATH=/app/data/media
      - SESSION_DATA_PATH=/app/data/sessions
      - AUTO_START_SESSIONS=true
      - ENABLE_SWAGGER=true
      - LOG_LEVEL=info
    volumes:
      - /opt/openwa/data:/app/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:2785/api/health/ready"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
"""

    # Upload configuration
    transport = paramiko.Transport((HOST, 22))
    transport.connect(username=USER, password=PASSWORD)
    sftp = paramiko.SFTPClient.from_transport(transport)

    try:
        sftp.mkdir("/opt/openwa")
    except Exception:
        pass
    try:
        sftp.mkdir("/opt/openwa/data")
    except Exception:
        pass

    with sftp.open("/opt/openwa/.env", "w") as f:
        f.write(env_content)

    with sftp.open("/opt/openwa/docker-compose.standalone.yml", "w") as f:
        f.write(compose_content)

    sftp.close()
    transport.close()
    print("✅ Configuration files uploaded to /opt/openwa.")

    # Run docker compose
    cmds = [
        "mkdir -p /opt/openwa/data",
        "chmod -R 777 /opt/openwa/data",
        "cd /opt/openwa && docker compose -f docker-compose.standalone.yml down || true",
        "cd /opt/openwa && docker compose -f docker-compose.standalone.yml up -d",
        "sleep 5",
        "docker ps | grep openwa",
        "docker logs openwa-api --tail 30"
    ]

    for c in cmds:
        run_ssh(c)

    print("\n🎉 OpenWA container is live on port 2785!")

if __name__ == "__main__":
    setup_openwa()
