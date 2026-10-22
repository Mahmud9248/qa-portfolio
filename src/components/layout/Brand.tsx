import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx';

interface BrandMarkProps {
  className?: string;
  light?: boolean;
}

export function BrandMark({ className, light = false }: BrandMarkProps) {
  return (
    <span className={cx('brand-mark', className)} aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M9 9h9M9 9v9M55 9h-9M55 9v9M9 55h9M9 55v-9M55 55h-9M55 55v-9" stroke="currentColor" strokeWidth="1" opacity=".5" />
        <path d="M18 47 30.5 15h3L46 47h-6.2l-2.4-7.1H26.6L24.2 47H18Zm10.3-12h8.2l-4.1-12-4.1 12Z" fill="currentColor" />
        <rect x="40" y="40" width="13" height="13" fill={light ? '#08090B' : '#93B4D6'} />
        <path d="m43.2 46.3 2.2 2.2 4.6-5.2" stroke={light ? '#D5D9E0' : '#08090B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      className="brand"
      aria-label="Abdullah Al Mahmud, Manual QA Engineer — home"
      onClick={onClick}
    >
      <BrandMark className="brand__mark" />
      <span className="brand__text">
        <span className="brand__name">Abdullah Al Mahmud</span>
        <span className="brand__role">Manual QA Engineer</span>
      </span>
    </Link>
  );
}
