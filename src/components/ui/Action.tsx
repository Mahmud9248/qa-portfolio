import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cx } from '../../lib/cx';

type Variant = 'primary' | 'secondary' | 'ghost';

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  showArrow?: boolean;
}

interface LinkProps extends CommonProps {
  to: string;
  href?: never;
  download?: never;
  external?: never;
  onClick?: () => void;
}

interface AnchorProps extends CommonProps {
  href: string;
  to?: never;
  download?: string | boolean;
  external?: boolean;
  onClick?: () => void;
}

interface ButtonProps extends CommonProps {
  onClick: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
}

function ButtonInner({ children, icon, showArrow = false }: CommonProps) {
  return (
    <>
      <span className="btn__label">{children}</span>
      {icon ? <span className="btn__icon">{icon}</span> : null}
      {showArrow ? (
        <span className="btn__icon btn__arrow" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={1.6} />
        </span>
      ) : null}
    </>
  );
}

export function ActionLink(props: LinkProps | AnchorProps) {
  const variant = props.variant ?? 'primary';
  const classes = cx('btn', `btn--${variant}`, props.className);

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        <ButtonInner {...props} />
      </Link>
    );
  }

  return (
    <a
      href={props.href}
      className={classes}
      download={props.download}
      target={props.external ? '_blank' : undefined}
      rel={props.external ? 'noreferrer noopener' : undefined}
      onClick={props.onClick}
    >
      <ButtonInner {...props} />
      {props.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

export function ActionButton({ variant = 'primary', className, onClick, type = 'button', disabled, ariaLabel, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('btn', `btn--${variant}`, className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <ButtonInner variant={variant} {...rest} />
    </button>
  );
}
