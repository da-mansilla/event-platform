---
description: Sync with Jira board and update ticket status
allowed-tools: Read, Write, Bash
---

Sincroniza con el board de Jira y actualiza el estado de tickets.

**Este comando requiere:**
- MCP Jira integration configurada
- Variables de entorno: JIRA_API_TOKEN, JIRA_PROJECT_KEY

## Proceso:

1. **Listar tickets del Sprint Actual:**
   - Usa el agente jira-manager para obtener tickets
   - Filtra por sprint activo
   - Muestra estado de cada ticket

2. **Actualizar Estado de Tickets:**
   - Detecta commits recientes con ticket IDs
   - Actualiza estado en Jira basado en trabajo realizado
   - Agrega comentarios con progreso

3. **Generar Reporte:**
   - Resumen de tickets completados
   - Tickets en progreso
   - Blockers identificados
   - Velocity del sprint

## Uso:

```
/sync-jira
```

Esto invocará al agente **jira-manager** automáticamente para ejecutar la sincronización.

## Output Esperado:

```
📊 Jira Sync Report

Sprint: Sprint 5
Periodo: 2025-12-01 - 2025-12-15

✅ Completed: 5 tickets (13 points)
🔄 In Progress: 3 tickets (8 points)
📋 To Do: 2 tickets (5 points)
🚫 Blocked: 1 ticket (3 points)

Velocity: 0.87 points/day
Projected Completion: On track
```

## Workflow Automático:

Este comando también se puede configurar como hook para ejecutarse:
- Después de cada commit
- Al crear un PR
- Al mergear a main

Útil cuando:
- Necesitas actualizar Jira con tu progreso
- Quieres ver el estado del sprint
- Estás preparando el daily standup
- Necesitas generar reportes de progreso
