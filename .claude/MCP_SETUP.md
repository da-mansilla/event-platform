# Configuración de MCP Servers

Esta guía te ayudará a configurar las integraciones externas (MCP servers) para el proyecto Event Platform.

## ¿Qué son los MCP Servers?

**MCP (Model Context Protocol)** permite que Claude Code se integre con servicios externos como GitHub, Figma, y Jira directamente desde la conversación.

---

## 🔧 Configuraciones Disponibles

### 1. GitHub Integration

Permite que Claude gestione PRs, issues, y commits automáticamente.

#### Setup:

```bash
# Opción A: HTTP Transport (recomendado)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# Opción B: Manual config
# Editar ~/.claude/mcp.json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

#### Uso:

```bash
# Dentro de Claude Code:
> Crea un PR con todos los cambios actuales
> Lista todos los issues abiertos
> Comenta en el issue #42
```

#### Comandos MCP disponibles:

```bash
/mcp__github__create_pr
/mcp__github__list_issues
/mcp__github__create_issue
/mcp__github__list_prs
/mcp__github__get_commit
```

---

### 2. Figma Integration

Extrae diseños, componentes y assets desde Figma.

#### Setup:

**Paso 1: Obtener Figma Token**

1. Ve a [Figma Settings](https://www.figma.com/settings)
2. Scroll hasta "Personal Access Tokens"
3. Crea un nuevo token
4. Copia el token

**Paso 2: Configurar en el proyecto**

Agrega a tu `.env` (nunca commitear):

```env
FIGMA_TOKEN="figd_YOUR_TOKEN_HERE"
```

**Paso 3: Configurar MCP**

Opción A - Por proyecto (`.mcp.json` en la raíz):

```json
{
  "mcpServers": {
    "figma": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_TOKEN": "${FIGMA_TOKEN}"
      }
    }
  }
}
```

Opción B - Global (`~/.claude/mcp.json`):

```bash
claude mcp add --transport stdio figma -- npx -y @modelcontextprotocol/server-figma
```

Luego configura el token en `~/.claude/env.json`:

```json
{
  "FIGMA_TOKEN": "figd_YOUR_TOKEN_HERE"
}
```

#### Uso:

```bash
# Slash command personalizado:
/figma-export

# O directamente:
> Extrae el diseño de este Figma file: https://figma.com/file/abc123
> Genera el componente EventCard basado en Figma
> Exporta todos los iconos del design system
```

#### Comandos MCP disponibles:

```bash
/mcp__figma__get_file
/mcp__figma__get_components
/mcp__figma__get_styles
/mcp__figma__export_images
```

---

### 3. Jira Integration

Gestiona tickets, sprints y automatiza workflows de Jira.

#### Setup:

**Paso 1: Obtener Jira API Token**

1. Ve a [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Crea un nuevo token
3. Copia el token

**Paso 2: Configurar en el proyecto**

Agrega a tu `.env`:

```env
JIRA_API_TOKEN="your-jira-api-token"
JIRA_EMAIL="your-email@example.com"
JIRA_DOMAIN="your-company.atlassian.net"
JIRA_PROJECT_KEY="EVT"
```

**Paso 3: Configurar MCP**

Opción A - Por proyecto (`.mcp.json`):

```json
{
  "mcpServers": {
    "jira": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-jira"],
      "env": {
        "JIRA_API_TOKEN": "${JIRA_API_TOKEN}",
        "JIRA_EMAIL": "${JIRA_EMAIL}",
        "JIRA_DOMAIN": "${JIRA_DOMAIN}",
        "JIRA_PROJECT_KEY": "${JIRA_PROJECT_KEY}"
      }
    }
  }
}
```

Opción B - Global:

```bash
claude mcp add --transport stdio jira -- npx -y @modelcontextprotocol/server-jira
```

#### Uso:

```bash
# Slash command:
/sync-jira

# Directamente:
> Lista todos los tickets del sprint actual
> Mueve el ticket EVT-42 a "In Progress"
> Crea un nuevo ticket para implementar autenticación
> Genera reporte del sprint
```

#### Comandos MCP disponibles:

```bash
/mcp__jira__list_issues
/mcp__jira__get_issue
/mcp__jira__create_issue
/mcp__jira__update_issue
/mcp__jira__transition_issue
/mcp__jira__add_comment
```

---

### 4. Database Integration (PostgreSQL)

Permite queries directos a la base de datos.

#### Setup:

```bash
# Opción A: Por proyecto (.mcp.json)
{
  "mcpServers": {
    "database": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@bytebase/dbhub"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}

# Opción B: Comando directo
claude mcp add --transport stdio database -- npx -y @bytebase/dbhub
```

#### Uso:

```bash
> Ejecuta una query para ver todos los eventos publicados
> Cuenta cuántos usuarios hay en la BD
> Muestra los últimos 10 tickets creados
```

---

## 📂 Estructura de Archivos MCP

```
project/
├── .mcp.json              # Config de MCP del proyecto (commiteable)
├── .env                   # Variables sensibles (NO commitear)
└── .env.example           # Template de variables

~/.claude/
├── mcp.json               # Config global de MCP
└── env.json               # Variables globales (opcional)
```

---

## 🔐 Seguridad: Variables de Entorno

### ❌ NUNCA commitear:

```
.env
.env.local
.env.*.local
```

### ✅ SÍ commitear:

```
.env.example
.mcp.json (sin tokens hardcodeados)
```

### Ejemplo `.env.example`:

```env
# GitHub (usualmente no necesita token si usas HTTP transport)
# GITHUB_TOKEN=""

# Figma
FIGMA_TOKEN="figd_..."

# Jira
JIRA_API_TOKEN="your-token"
JIRA_EMAIL="you@example.com"
JIRA_DOMAIN="company.atlassian.net"
JIRA_PROJECT_KEY="EVT"

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/eventdb"
```

---

## 🧪 Testing de MCP Servers

### Verificar que MCP está funcionando:

```bash
# Dentro de Claude Code
> /mcp

# Debería mostrar lista de servers configurados
```

### Test individual:

```bash
# GitHub
> Lista los issues de este repositorio

# Figma
> ¿Qué componentes hay en el archivo de Figma X?

# Jira
> Muestra todos los tickets del proyecto EVT

# Database
> Cuántos eventos hay en la base de datos?
```

---

## 🚨 Troubleshooting

### Error: "MCP server not found"

```bash
# Verificar instalación
npm list -g @modelcontextprotocol/server-figma

# Reinstalar si es necesario
npm install -g @modelcontextprotocol/server-figma
```

### Error: "Authentication failed"

```bash
# Verificar que las variables de entorno están cargadas
echo $FIGMA_TOKEN
echo $JIRA_API_TOKEN

# Recargar .env
source .env
```

### Error: "Permission denied"

```bash
# Verificar permisos en settings.json
# Agregar MCP tools a la lista de permitidos
```

---

## 📚 Recursos

- [MCP Documentation](https://code.claude.com/docs/en/mcp.md)
- [Available MCP Servers](https://github.com/anthropics/mcp-servers)
- [Figma API](https://www.figma.com/developers/api)
- [Jira REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- [GitHub API](https://docs.github.com/en/rest)

---

## 💡 Tips

1. **Empieza con GitHub** - Es la integración más simple y útil
2. **Usa variables de entorno** - Nunca hardcodees tokens
3. **Configura globalmente** - Si usas los mismos tokens en múltiples proyectos
4. **Documenta en .env.example** - Para que tu equipo sepa qué tokens necesita
5. **Usa el agente jira-manager** - Invócalo para gestionar Jira automáticamente

---

¿Preguntas? Revisa `.claude/CLAUDE.md` para más detalles sobre el proyecto.
