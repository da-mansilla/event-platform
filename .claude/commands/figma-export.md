---
description: Export components and specs from Figma designs
allowed-tools: Read, Write, WebFetch, Bash
---

Extrae componentes y especificaciones de diseños de Figma usando la API directa.

**Este comando requiere:**
- Variable de entorno: FIGMA_TOKEN (en .env)
- Figma File URL o File ID

## Proceso:

1. **Obtener Figma File:**
   - Pedir al usuario el Figma File URL o ID
   - Extraer File ID de la URL usando `src/lib/figma-api.ts`
   - Hacer request a Figma API: `https://api.figma.com/v1/files/{fileId}`

2. **Extraer Componentes:**
   - Identificar componentes en el diseño
   - Obtener specs (dimensiones, colores, tipografía, spacing)
   - Mapear a Tailwind CSS classes

3. **Generar Código:**
   - Crear componentes React con TypeScript
   - Aplicar estilos con Tailwind
   - Sugerir componentes shadcn/ui donde aplique

4. **Exportar Assets:**
   - Descargar imágenes/iconos
   - Guardar en `/public/assets/`
   - Optimizar para web (WebP)

## Uso:

```
/figma-export
```

El sistema te pedirá:
- Figma File URL o ID
- Qué componentes quieres exportar
- Dónde guardar los archivos generados

## Ejemplo de Output:

```
🎨 Figma Export Results

Componentes Generados:
✅ EventCard → src/components/events/EventCard.tsx
✅ EventHero → src/components/events/EventHero.tsx
✅ CategoryBadge → src/components/ui/CategoryBadge.tsx

Assets Descargados:
✅ hero-bg.webp → public/assets/images/
✅ event-icon-music.svg → public/assets/icons/
✅ event-icon-sports.svg → public/assets/icons/

Design Tokens Actualizados:
✅ tailwind.config.js (colores, espaciado)
```

## Workflow con ui-designer Agent:

Este comando invoca automáticamente al agente **ui-designer** para:
- Validar consistencia con design system
- Sugerir mejoras
- Asegurar responsive design
- Verificar accesibilidad

Útil cuando:
- El diseñador actualiza Figma
- Necesitas implementar nuevos componentes UI
- Quieres sincronizar código con diseño
- Estás creando el design system inicial
