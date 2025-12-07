# 🎉 Event Platform

Plataforma full-stack para crear, organizar y compartir eventos. Construida con Next.js, TypeScript, Prisma, y PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Inicio Rápido](#-inicio-rápido)
- [Desarrollo con Claude Code](#-desarrollo-con-claude-code)
- [Comandos Disponibles](#-comandos-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración](#️-configuración)
- [Docker](#-docker)
- [Base de Datos](#️-base-de-datos)

---

## ✨ Características

- 🔐 **Autenticación** - NextAuth con múltiples providers
- 📅 **Gestión de Eventos** - CRUD completo con categorización
- 🎫 **Sistema de Tickets** - Reservas y QR codes
- 🔍 **Búsqueda y Filtros** - Búsqueda avanzada por categoría, fecha, ubicación
- 👥 **Roles de Usuario** - Usuario, Organizador, Admin
- 📊 **Dashboard** - Panel para organizadores y usuarios
- 🐳 **Docker Ready** - Containerización completa
- 🤖 **Claude Code Integration** - Agentes especializados y automatización

---

## 🛠️ Stack Tecnológico

### Frontend
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand + React Hook Form + Zod

### Backend
- Next.js API Routes + Prisma + PostgreSQL
- NextAuth.js

### DevOps
- Docker + Docker Compose

---

## 🚀 Inicio Rápido

### Opción 1: Desarrollo con Docker Compose (Recomendado)

```bash
# 1. Clonar y entrar al proyecto
git clone <tu-repo-url>
cd event-platform

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Levantar servicios
docker-compose up -d

# El proyecto estará disponible en:
# - App: http://localhost:3000
# - Prisma Studio: http://localhost:5555
# - PostgreSQL: localhost:5432
```

### Opción 2: Desarrollo Local (sin Docker)

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env
cp .env.example .env
# Editar DATABASE_URL="postgresql://postgres:password@localhost:5432/eventdb"

# 3. Setup base de datos
npm run db:generate
npm run db:migrate
npm run db:seed

# 4. Iniciar servidor
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🤖 Desarrollo con Claude Code

Este proyecto está optimizado para **Claude Code** con agentes especializados.

### Agentes Disponibles

1. **code-reviewer** - Revisa código automáticamente
2. **jira-manager** - Gestiona tickets de Jira
3. **ui-designer** - Integración con Figma
4. **devops-specialist** - Docker y Kubernetes
5. **test-runner** - Ejecuta y mantiene tests

### Slash Commands

```bash
/setup-db         # Setup base de datos (migrations + seed)
/docker-build     # Build y test Docker
/sync-jira        # Sincroniza con Jira
/figma-export     # Exporta desde Figma
```

### Uso

```bash
cd event-platform
claude

# Ejemplos:
> Crea un nuevo componente EventCard
> Revisa el código con code-reviewer
> Actualiza el schema de Prisma
```

---

## 📜 Comandos Disponibles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

### Base de Datos
```bash
npm run db:generate   # Genera Prisma Client
npm run db:migrate    # Crea migration
npm run db:seed       # Seed datos demo
npm run db:studio     # Prisma Studio UI
npm run db:reset      # Reset completo
```

### Docker
```bash
docker-compose up -d              # Levantar servicios
docker-compose logs -f nextjs     # Ver logs
docker-compose down               # Detener servicios
```

---

## 📁 Estructura del Proyecto

```
event-platform/
├── .claude/              # Claude Code config
│   ├── CLAUDE.md        # Documentación
│   ├── agents/          # 5 agentes especializados
│   └── commands/        # Slash commands
├── prisma/
│   ├── schema.prisma    # Schema DB
│   └── seed.ts          # Datos demo
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/ui/  # shadcn components
│   └── lib/            # Utilidades
├── docker/
│   └── Dockerfile.dev
├── docker-compose.yml
└── Dockerfile
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea `.env` basado en `.env.example`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/eventdb"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### MCP Servers (Integraciones Opcionales)

```bash
# GitHub
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# Figma (agregar en .env)
FIGMA_TOKEN="your-token"

# Jira (agregar en .env)
JIRA_API_TOKEN="your-token"
JIRA_PROJECT_KEY="EVT"
```

---

## 🐳 Docker

### Development

```bash
docker-compose up -d       # Iniciar
docker-compose logs -f     # Ver logs
docker-compose down        # Detener
```

**Servicios:**
- nextjs (puerto 3000)
- postgres (puerto 5432)
- prisma-studio (puerto 5555)

### Production Build

```bash
docker build -t event-platform:latest .
docker run -p 3000:3000 event-platform:latest
```

---

## 🗄️ Base de Datos

### Modelos

- **User** - Usuarios (USER, ORGANIZER, ADMIN)
- **Event** - Eventos
- **Ticket** - Tickets con QR
- **Category** - Categorías

### Datos Demo

```bash
npm run db:seed
```

**Credenciales:**
- `organizer@example.com` / `password123`
- `user@example.com` / `password123`
- `admin@example.com` / `password123`

---

## 📝 Licencia

MIT

---

🤖 Construido con [Claude Code](https://claude.com/claude-code)
