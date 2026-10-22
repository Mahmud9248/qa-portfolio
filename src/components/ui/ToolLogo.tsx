import type { Tool } from '../../data/tools';
import { cx } from '../../lib/cx';

interface ToolLogoProps {
  tool: Tool;
  className?: string;
}

export function ToolLogo({ tool, className }: ToolLogoProps) {
  return (
    <span className={cx('tool-mark', !tool.iconPath && 'tool-mark--wordmark', className)} aria-hidden="true">
      {tool.iconPath ? (
        <svg viewBox={tool.iconViewBox ?? '0 0 24 24'} role="presentation" focusable="false">
          <path d={tool.iconPath} fill="currentColor" fillRule={tool.iconFillRule} />
        </svg>
      ) : (
        <span>{tool.fallbackWordmark ?? tool.name}</span>
      )}
    </span>
  );
}
