/**
 * Figma API Helper
 *
 * Utilities to interact with Figma API directly.
 * Requires FIGMA_TOKEN environment variable.
 *
 * API Documentation: https://www.figma.com/developers/api
 */

const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Extract File ID from Figma URL
 * Example: https://www.figma.com/file/ABC123/My-Design -> ABC123
 */
export function extractFileIdFromUrl(url: string): string | null {
  const match = url.match(/\/file\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

/**
 * Fetch Figma File
 * Returns complete file structure including components, styles, and frames
 */
export async function getFigmaFile(fileId: string, token: string) {
  const response = await fetch(`${FIGMA_API_BASE}/files/${fileId}`, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get File Components
 * Returns all components defined in the file
 */
export async function getFigmaComponents(fileId: string, token: string) {
  const response = await fetch(`${FIGMA_API_BASE}/files/${fileId}/components`, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get File Styles
 * Returns all styles (colors, text, effects, etc.)
 */
export async function getFigmaStyles(fileId: string, token: string) {
  const response = await fetch(`${FIGMA_API_BASE}/files/${fileId}/styles`, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Export Images from Figma
 * Returns URLs to download rendered images
 */
export async function exportFigmaImages(
  fileId: string,
  nodeIds: string[],
  token: string,
  options: {
    format?: 'jpg' | 'png' | 'svg' | 'pdf';
    scale?: number;
  } = {}
) {
  const { format = 'png', scale = 2 } = options;

  const params = new URLSearchParams({
    ids: nodeIds.join(','),
    format,
    scale: scale.toString(),
  });

  const response = await fetch(
    `${FIGMA_API_BASE}/images/${fileId}?${params}`,
    {
      headers: {
        'X-Figma-Token': token,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Example usage:
 *
 * const fileId = extractFileIdFromUrl('https://www.figma.com/file/ABC123/My-Design');
 * const file = await getFigmaFile(fileId, process.env.FIGMA_TOKEN!);
 * const components = await getFigmaComponents(fileId, process.env.FIGMA_TOKEN!);
 * const styles = await getFigmaStyles(fileId, process.env.FIGMA_TOKEN!);
 * const images = await exportFigmaImages(fileId, ['nodeId1', 'nodeId2'], process.env.FIGMA_TOKEN!);
 */
