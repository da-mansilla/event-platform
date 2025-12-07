---
description: Build and test Docker image locally
allowed-tools: Bash
---

Construye y prueba la imagen Docker:

1. **Build Docker Image:**
```bash
cd /home/amansilla/www/claude/event-platform && docker build -t event-platform:latest -f docker/Dockerfile .
```

2. **Run Container Locally:**
```bash
docker run -d -p 3000:3000 --name event-platform-test event-platform:latest
```

3. **Wait for Container to Start:**
```bash
sleep 5
```

4. **Test Health Endpoint:**
```bash
curl http://localhost:3000/api/health || echo "Health check failed"
```

5. **Show Container Logs:**
```bash
docker logs event-platform-test
```

6. **Cleanup:**
```bash
docker stop event-platform-test && docker rm event-platform-test
```

Útil cuando:
- Quieres probar la imagen Docker antes de deploy
- Necesitas verificar que la build funciona
- Estás debugeando problemas de containerización
- Antes de hacer push al registry
