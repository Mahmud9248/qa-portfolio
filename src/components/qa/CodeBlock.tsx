import { cx } from '../../lib/cx';
import { CopyButton } from '../ui/CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  showCopy?: boolean;
}

export function CodeBlock({ code, language = 'text', title, className, showCopy = true }: CodeBlockProps) {
  return (
    <div className={cx('code-block', className)}>
      <div className="code-block__head">
        <div className="code-block__label">
          <span className="code-block__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {title ? <span>{title}</span> : null}
          <span className="code-block__language">{language}</span>
        </div>
        {showCopy ? <CopyButton value={code} label="Copy" /> : null}
      </div>
      <div className="code-block__scroll" tabIndex={0} role="region" aria-label={title ? `Code sample: ${title}` : 'Code sample'}>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
