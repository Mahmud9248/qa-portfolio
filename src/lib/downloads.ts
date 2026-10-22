import type { Artifact, ArtifactBlock } from '../types';

export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadText(filename: string, text: string, type = 'text/markdown;charset=utf-8'): void {
  downloadBlob(filename, new Blob([text], { type }));
}

export async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the legacy path below.
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  } catch {
    return false;
  }
}

function tableToMarkdown(table: { title?: string; columns: string[]; rows: string[][] }): string {
  const header = `| ${table.columns.join(' | ')} |`;
  const divider = `| ${table.columns.map(() => '---').join(' | ')} |`;
  const rows = table.rows.map((row) => `| ${row.join(' | ')} |`);
  return [table.title ? `### ${table.title}\n` : '', header, divider, ...rows].join('\n');
}

function blockToMarkdown(block: ArtifactBlock): string {
  switch (block.type) {
    case 'paragraph':
      return block.text;
    case 'list':
      return [block.title ? `### ${block.title}` : '', ...block.items.map((item) => `- ${item}`)].join('\n');
    case 'table':
      return tableToMarkdown(block.table);
    case 'code':
      return `### ${block.title}\n\n\`\`\`${block.language}\n${block.code}\n\`\`\``;
    case 'fields':
      return [block.title ? `### ${block.title}` : '', ...block.fields.map((field) => `**${field.label}:** ${field.value}`)].join('\n\n');
    case 'callout':
      return `> **${block.label}**\n> ${block.text}`;
    default:
      return '';
  }
}

export function artifactToMarkdown(artifact: Artifact): string {
  return [
    `# ${artifact.title}`,
    '',
    `${artifact.id} · ${artifact.category} · ${artifact.format}`,
    '',
    '> Portfolio demonstration. All scenarios, data, systems and results are fictional and created for this portfolio.',
    '',
    '## Purpose',
    '',
    artifact.purpose,
    '',
    '## How to use',
    '',
    ...artifact.howToUse.map((item) => `- ${item}`),
    '',
    '## Artifact',
    '',
    ...artifact.blocks.map(blockToMarkdown),
    '',
    `Related case study: ${artifact.relatedCase}`,
    '',
  ].join('\n');
}
