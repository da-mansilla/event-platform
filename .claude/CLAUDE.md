# Event Platform - Plataforma de Gestión de Eventos

## Descripción General

Plataforma full-stack para crear, organizar y compartir eventos. Los usuarios pueden crear eventos, gestionar asistentes, generar tickets, y compartir eventos con la comunidad.

**Objetivo:** Aprender Claude Code explorando todas sus features (agentes, hooks, MCP, slash commands) mientras construimos una aplicación real.

---

## Stack Tecnológico

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript (strict mode)
- **Estilos:** Tailwind CSS
- **UI Components:** shadcn/ui (a instalar)
- **State Management:** Zustand (a instalar)
- **Forms:** React Hook Form + Zod (a instalar)

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Auth:** NextAuth.js (a instalar)
- **Validación:** Zod

### DevOps
- **Containerización:** Docker + Docker Compose
- **Orquestación:** Kubernetes (manifests)
- **CI/CD:** GitHub Actions
- **Registry:** Docker Hub / GitHub Container Registry

### Integraciones Externas
- **Version Control:** GitHub (con MCP)
- **Diseño:** Figma (con MCP)
- **Project Management:** Jira (con MCP + agente dedicado)
- **Notificaciones:** (a definir: SendGrid/Resend)
- **File Storage:** (a definir: Cloudinary/AWS S3)

---

## Estructura del Proyecto

```
event-platform/
├── .claude/                    # Claude Code config
│   ├── CLAUDE.md              # Este archivo
│   ├── settings.json          # Configuración de permisos y hooks
│   ├── commands/              # Slash commands personalizados
│   │   ├── setup-db.md
│   │   ├── docker-build.md
│   │   ├── sync-jira.md
│   │   └── figma-export.md
│   ├── agents/                # Agentes especializados
│   │   ├── code-reviewer.md
│   │   ├── jira-manager.md
│   │   ├── ui-designer.md
│   │   ├── devops-specialist.md
│   │   └── test-runner.md
│   └── skills/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Auth routes (login, register)
│   │   ├── (dashboard)/      # Protected routes
│   │   ├── api/              # API endpoints
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/               # shadcn components
│   │   ├── events/           # Event-specific components
│   │   ├── layout/           # Layout components
│   │   └── shared/           # Shared components
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # NextAuth config
│   │   ├── validations/      # Zod schemas
│   │   └── utils.ts
│   ├── hooks/                # Custom React hooks
│   ├── stores/               # Zustand stores
│   ├── types/                # TypeScript types
│   └── styles/
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── migrations/
│   └── seed.ts
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── docker-compose.yml
├── k8s/                      # Kubernetes manifests
│   ├── deployment.yml
│   ├── service.yml
│   ├── configmap.yml
│   └── secrets.yml
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── .github/
    └── workflows/
        └── ci-cd.yml
```

---

## Modelos de Datos (Prisma Schema)

### Modelo: User
- id, email, password, name
- role (USER, ORGANIZER, ADMIN)
- createdAt, updatedAt

### Modelo: Event
- id, title, description, date, location
- organizerId (FK → User)
- capacity, status (DRAFT, PUBLISHED, CANCELLED)
- image, category
- createdAt, updatedAt

### Modelo: Ticket
- id, eventId (FK → Event)
- userId (FK → User)
- qrCode, status (RESERVED, CONFIRMED, CANCELLED)
- createdAt

### Modelo: Category
- id, name, slug, description

---

## Features Principales

### MVP (Fase 1)
- [ ] Autenticación (registro, login, logout)
- [ ] Crear eventos (organizadores)
- [ ] Listar y buscar eventos (público)
- [ ] Reservar tickets
- [ ] Dashboard de organizador (mis eventos)
- [ ] Dashboard de usuario (mis tickets)

### Fase 2
- [ ] Categorías de eventos
- [ ] Filtros y búsqueda avanzada
- [ ] QR codes para tickets
- [ ] Notificaciones por email
- [ ] Sistema de comentarios/reviews
- [ ] Compartir eventos (social)

### Fase 3
- [ ] Pagos (Stripe/PayPal)
- [ ] Eventos recurrentes
- [ ] Analytics para organizadores
- [ ] Multi-idioma (i18n)
- [ ] PWA / Mobile app

---

## Comandos Frecuentes

### Development
```bash
npm run dev                 # Dev server (puerto 3000)
npm run build              # Build producción
npm run start              # Start producción
npm run lint               # ESLint
npm run type-check         # TypeScript check
```

### Database (Prisma)
```bash
npx prisma generate        # Generar Prisma Client
npx prisma migrate dev     # Crear migration
npx prisma migrate deploy  # Aplicar migrations
npx prisma db seed         # Seed data
npx prisma studio          # UI para DB
npx prisma db push         # Sync schema sin migration (dev only)
```

### Docker
```bash
docker-compose up -d       # Levantar servicios
docker-compose down        # Bajar servicios
docker build -t event-platform:latest .
docker run -p 3000:3000 event-platform:latest
```

### Kubernetes
```bash
kubectl apply -f k8s/      # Deploy all manifests
kubectl get pods           # Ver pods
kubectl logs <pod-name>    # Ver logs
kubectl delete -f k8s/     # Delete deployment
```

### Testing
```bash
npm test                   # Unit tests (Jest)
npm run test:e2e          # E2E tests (Playwright)
npm run test:coverage     # Coverage report
```

---

## Estándares de Código

### TypeScript
- **Strict mode:** Activado (`tsconfig.json`)
- **Naming:**
  - Variables/funciones: `camelCase`
  - Componentes/Tipos: `PascalCase`
  - Constantes: `UPPER_SNAKE_CASE`
  - Archivos: `kebab-case.tsx`
- **Imports:** Usar alias `@/` (ej: `import { Button } from '@/components/ui/button'`)

### React/Next.js
- **Componentes:** Funcionales con hooks
- **Server Components:** Por defecto (marcar con `'use client'` solo cuando necesario)
- **API Routes:** Validar inputs con Zod
- **Error Handling:** Usar `error.tsx` y `try/catch` en server actions

### Prisma
- **Queries:** Usar `select` o `include` explícitamente (evitar N+1)
- **Transactions:** Usar `$transaction` para operaciones múltiples
- **Migrations:** Nombres descriptivos (ej: `add-user-profile`)

### CSS/Tailwind
- **Preferir:** Tailwind classes
- **Componentes reutilizables:** shadcn/ui
- **Custom styles:** Solo cuando Tailwind no sea suficiente

---

## Flujo de Trabajo con Claude Code

### 1. Desarrollo de Features
```
1. Sincronizar con Jira (agente jira-manager)
2. Implementar feature
3. Code review automático (agente code-reviewer)
4. Ejecutar tests (agente test-runner)
5. Commit + PR a GitHub (automático con hooks)
6. Actualizar Jira automáticamente
```

### 2. Diseño UI/UX
```
1. Diseñar en Figma
2. Usar agente ui-designer para extraer specs
3. Implementar componentes según Figma
4. Validar con diseñador
```

### 3. DevOps/Deployment
```
1. Crear/actualizar Dockerfile (agente devops-specialist revisa)
2. Build y test local con Docker
3. Deploy a K8s staging
4. Pruebas
5. Deploy a producción
```

---

## Agentes Especializados

### 1. **code-reviewer**
- Revisa PRs antes de merge
- Verifica TypeScript strict, seguridad, performance
- Se invoca automáticamente después de cambios grandes

### 2. **jira-manager**
- Sincroniza tickets de Jira
- Actualiza estado de tareas
- Crea subtareas automáticamente
- Genera reportes de sprint

### 3. **ui-designer**
- Extrae specs de Figma
- Verifica consistencia con design system
- Sugiere componentes shadcn/ui
- Valida responsive design

### 4. **devops-specialist**
- Revisa Dockerfiles y K8s manifests
- Optimiza builds
- Verifica security best practices
- Gestiona secrets y configs

### 5. **test-runner**
- Ejecuta tests automáticamente
- Reporta fallos
- Sugiere nuevos tests
- Genera coverage reports

---

## Integraciones MCP

### GitHub
- Crear/listar PRs
- Gestionar issues
- Ver commits
- **Comando:** `/mcp__github__create_pr`

### Figma
- Extraer designs
- Obtener specs de componentes
- Exportar assets
- **Comando:** `/mcp__figma__get_file`

### Jira
- Listar tickets del sprint
- Actualizar estados
- Crear subtareas
- **Comando:** `/mcp__jira__list_issues`

---

## Hooks Configurados

### PostToolUse (Después de editar)
1. **Prettier:** Auto-format código
2. **Prisma Generate:** Si se modifica `schema.prisma`
3. **TypeScript Check:** Validar tipos

### PreCommit (Antes de commit)
1. **Lint:** ESLint --fix
2. **Type Check:** tsc --noEmit
3. **Tests:** Run affected tests

---

## Slash Commands Personalizados

### `/setup-db`
- Ejecuta migrations
- Seed database
- Abre Prisma Studio

### `/docker-build`
- Build imagen Docker
- Run container localmente
- Test health endpoint

### `/sync-jira`
- Sincroniza con Jira board
- Actualiza estados de tickets
- Genera reporte

### `/figma-export`
- Extrae componentes de Figma
- Genera código base
- Actualiza design tokens

---

## Variables de Entorno

### Desarrollo (.env.local)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/eventdb
NEXTAUTH_SECRET=dev-secret-change-in-prod
NEXTAUTH_URL=http://localhost:3000
GITHUB_TOKEN=
FIGMA_TOKEN=
JIRA_API_TOKEN=
JIRA_PROJECT_KEY=
```

### Producción (K8s Secrets)
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- API Keys externas

---

## Notas Importantes

- **Prisma:** Siempre ejecutar `npx prisma generate` después de cambios en schema
- **Git:** NO commitear `.env*` files (están en `.gitignore`)
- **Docker:** Usar multi-stage builds para producción
- **Tests:** Coverage mínimo 80% para features críticas
- **Security:** Validar TODOS los inputs de usuario con Zod
- **Performance:** Usar React Server Components por defecto
- **Accessibility:** Todos los componentes deben ser accesibles (WCAG AA)

---

## Próximos Pasos

1. ✅ Proyecto Next.js creado
2. ✅ Estructura `.claude/` inicializada
3. ⏳ Instalar dependencias (Prisma, NextAuth, shadcn/ui, Zod)
4. ⏳ Configurar MCP servers (GitHub, Figma, Jira)
5. ⏳ Crear agentes especializados
6. ⏳ Configurar hooks
7. ⏳ Crear slash commands
8. ⏳ Diseñar schema de base de datos
9. ⏳ Implementar autenticación
10. ⏳ Crear primeras features (CRUD eventos)

---

**Última actualización:** 2025-12-07
**Claude Code Version:** Latest
**Modelo:** Claude Sonnet 4.5
