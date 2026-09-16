import paramiko
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

def enable_ssl():
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
      - CSP_UPGRADE_INSECURE_REQUESTS=false
      - ENABLE_SWAGGER=true
      - LOG_LEVEL=info
    volumes:
      - /opt/openwa/data:/app/data
    labels:
      - "traefik.enable=true"
      - "traefik.http.middlewares.openwa-redirect.redirectscheme.scheme=https"
      - "traefik.http.middlewares.openwa-redirect.redirectscheme.permanent=true"
      - "traefik.http.routers.openwa-http.entrypoints=web"
      - "traefik.http.routers.openwa-http.rule=Host(`openwa.srv1566293.hstgr.cloud`)"
      - "traefik.http.routers.openwa-http.middlewares=openwa-redirect"
      - "traefik.http.routers.openwa.entrypoints=websecure"
      - "traefik.http.routers.openwa.rule=Host(`openwa.srv1566293.hstgr.cloud`)"
      - "traefik.http.routers.openwa.tls.certresolver=letsencrypt"
      - "traefik.http.services.openwa.loadbalancer.server.port=2785"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:2785/api/health/ready"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
"""

    transport = paramiko.Transport((HOST, 22))
    transport.connect(username=USER, password=PASSWORD)
    sftp = paramiko.SFTPClient.from_transport(transport)

    with sftp.open("/opt/openwa/docker-compose.standalone.yml", "w") as f:
        f.write(compose_content)

    sftp.close()
    transport.close()
    print("✅ Updated docker-compose.standalone.yml with Traefik SSL labels.")

    cmds = [
        "cd /opt/openwa && docker compose -f docker-compose.standalone.yml up -d --force-recreate",
        "sleep 5",
        "docker ps | grep openwa"
    ]

    for c in cmds:
        run_ssh(c)

if __name__ == "__main__":
    enable_ssl()
