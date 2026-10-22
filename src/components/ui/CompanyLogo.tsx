import { cx } from '../../lib/cx';

export type CompanyBrand = 'wallethub' | 'codemen';

const companyLogos: Record<CompanyBrand, { src: string; label: string }> = {
  wallethub: {
    src: '/logos/wallethub.svg',
    label: 'WalletHub',
  },
  codemen: {
    src: '/logos/codemen-solutions.png',
    label: 'Codemen Solutions Ltd.',
  },
};

interface CompanyLogoProps {
  brand: CompanyBrand;
  className?: string;
  /** Set when the company name is already visible next to the mark. */
  decorative?: boolean;
}

/**
 * Employer marks are rendered as CSS masks so every logo inherits the same
 * monochrome ink colour as the surrounding interface.
 */
export function CompanyLogo({ brand, className, decorative = false }: CompanyLogoProps) {
  const logo = companyLogos[brand];

  return (
    <span
      className={cx('company-logo', `company-logo--${brand}`, className)}
      style={{ maskImage: `url(${logo.src})`, WebkitMaskImage: `url(${logo.src})` }}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : logo.label}
      aria-hidden={decorative || undefined}
    />
  );
}
