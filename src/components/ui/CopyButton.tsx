import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyText } from '../../lib/downloads';
import { cx } from '../../lib/cx';

interface CopyButtonProps {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export function CopyButton({ value, label = 'Copy', copiedLabel = 'Copied', className }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleCopy() {
    const success = await copyText(value);
    setState(success ? 'success' : 'error');
    window.setTimeout(() => setState('idle'), 2200);
  }

  return (
    <button type="button" className={cx('copy-button', className)} onClick={handleCopy} aria-live="polite">
      {state === 'success' ? <Check size={14} strokeWidth={1.8} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.6} aria-hidden="true" />}
      <span>{state === 'success' ? copiedLabel : state === 'error' ? 'Copy unavailable' : label}</span>
    </button>
  );
}
