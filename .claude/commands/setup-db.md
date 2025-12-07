---
description: Setup database with Prisma migrations and seeding
allowed-tools: Bash
---

Ejecuta el setup completo de la base de datos:

1. **Generar Prisma Client:**
```bash
cd /home/amansilla/www/claude/event-platform && npx prisma generate
```

2. **Aplicar Migraciones:**
```bash
cd /home/amansilla/www/claude/event-platform && npx prisma migrate deploy
```

3. **Seed Database (si existe seed file):**
```bash
cd /home/amansilla/www/claude/event-platform && npx prisma db seed 2>/dev/null || echo "No seed file configured"
```

4. **Abrir Prisma Studio (opcional):**
```bash
cd /home/amansilla/www/claude/event-platform && npx prisma studio
```

Útil cuando:
- Acabas de clonar el proyecto
- Hay cambios en el schema de Prisma
- Necesitas reiniciar la base de datos
- Quieres inspeccionar datos visualmente
