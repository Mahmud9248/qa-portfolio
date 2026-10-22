export interface SiteConfig {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  linkedinHandle: string;
  resumeUrl: string;
  resumeFileName: string;
  headline: string;
  heroSupport: string;
  intro: string;
  availabilityNote: string;
  phone: {
    value: string;
    /** Kept hidden by default. Set to true only when you want the number public. */
    display: boolean;
  };
}

/**
 * Single source for editable personal details.
 * Professional facts are drawn from the supplied résumé.
 */
export const siteConfig: SiteConfig = {
  name: 'Abdullah Al Mahmud',
  shortName: 'Abdullah',
  initials: 'AAM',
  role: 'Manual QA Engineer',
  location: 'Mirpur, Dhaka, Bangladesh',
  email: 'mahmudnis@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aamahmuds/',
  linkedinHandle: '/in/aamahmuds',
  resumeUrl: '/documents/resume.pdf',
  resumeFileName: 'Abdullah-Al-Mahmud-Resume.pdf',
  headline: 'Quality isn’t an assumption. It’s tested.',
  heroSupport:
    'Manual QA engineer with 4+ years of experience testing SaaS, AI-driven and FinTech products. I validate complex workflows, APIs and release behaviour so teams can ship with evidence — not optimism.',
  intro:
    'I test the paths between what a product promises and what a person actually experiences. My work spans functional, regression, exploratory and REST API testing across web and mobile, with a focus on financial accuracy, release stability and clear defect evidence.',
  availabilityNote: 'Based in Dhaka, Bangladesh · Working with distributed product teams',
  phone: {
    value: '+8801701014210',
    display: false,
  },
};

export const navigation = [
  { index: '00', label: 'Index', href: '/' },
  { index: '01', label: 'Case Studies', href: '/case-studies' },
  { index: '02', label: 'QA Artifacts', href: '/qa-artifacts' },
  { index: '03', label: 'About', href: '/about' },
  { index: '04', label: 'Contact', href: '/contact' },
] as const;

export const demoDisclaimer =
  'Portfolio demonstration. The scenarios, records, endpoints, data, and results shown here are fictional examples created for this site. They are not employer projects, production systems, or real customer data.';
