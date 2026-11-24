export interface SiteConfig {
  name: string;
  shortName: string;
  initials: string;
  /** Main professional title, used site-wide. */
  role: string;
  /** Short form for tight spaces (header, chips). */
  roleShort: string;
  location: string;
  locationShort: string;
  timezone: string;
  /** Month the QA career started; shown instead of a hard-coded year count so it never goes stale. */
  testingSince: string;
  testingSinceISO: string;
  email: string;
  linkedin: string;
  linkedinHandle: string;
  github: string;
  resumeUrl: string;
  resumeFileName: string;
  headline: string;
  heroSupport: string;
  intro: string;
  status: {
    open: boolean;
    label: string;
    detail: string;
    workTypes: string[];
  };
  replyTime: string;
  ndaNote: string;
  studio: {
    name: string;
    url: string;
    line: string;
  };
}

/** Single source for editable personal details. */
export const siteConfig: SiteConfig = {
  name: 'Abdullah Al Mahmud',
  shortName: 'Abdullah',
  initials: 'AAM',
  role: 'Software Quality Assurance Engineer',
  roleShort: 'SQA Engineer',
  location: 'Dhaka, Bangladesh',
  locationShort: 'Dhaka, BD',
  timezone: 'UTC+6',
  testingSince: 'December 2021',
  testingSinceISO: '2021-12-01',
  email: 'mahmudnis@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aamahmuds/',
  linkedinHandle: '/in/aamahmuds',
  github: 'https://github.com/Mahmud9248',
  resumeUrl: '/documents/resume.pdf',
  resumeFileName: 'Abdullah-Al-Mahmud-Resume.pdf',
  headline: 'Quality isn’t an assumption. It’s tested.',
  heroSupport:
    'Software QA engineer testing SaaS, AI-powered and FinTech products since December 2021. Most recently at WalletHub, validating financial workflows, REST APIs and Stripe billing; before that, four years at Codemen Solutions, from SQA intern to Software Quality Assurance Engineer.',
  intro:
    'I test the paths between what a product promises and what a person actually experiences. My work spans functional, regression, exploratory and REST API testing across web and mobile, with a focus on financial accuracy, release stability and clear defect evidence.',
  status: {
    open: true,
    label: 'Open to QA roles',
    detail: 'Remote, hybrid or on-site in Dhaka · full-time, contract or freelance',
    workTypes: ['Remote', 'Hybrid / on-site in Dhaka', 'Full-time', 'Contract & freelance'],
  },
  replyTime: 'I usually reply within two working days.',
  ndaNote: 'Real project walkthroughs are available in interviews, within NDA limits.',
  studio: {
    name: 'KeraKode',
    url: 'https://kerakode.mahmudqa.cv/?utm_source=mahmudqa.cv&utm_medium=site',
    line: 'My design & build studio. I also build sites and tools — then test them.',
  },
};

/** Whole years of QA work since `testingSinceISO`, computed at runtime so the copy never goes stale. */
export function yearsTesting(now = new Date()): number {
  const start = new Date(siteConfig.testingSinceISO);
  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth()) years -= 1;
  return Math.max(years, 0);
}

export const navigation = [
  { index: '00', label: 'Index', href: '/' },
  { index: '01', label: 'Case Studies', href: '/case-studies' },
  { index: '02', label: 'QA Artifacts', href: '/qa-artifacts' },
  { index: '03', label: 'About', href: '/about' },
  { index: '04', label: 'Contact', href: '/contact' },
] as const;

export const demoDisclaimer =
  'Portfolio demonstration. The scenarios, records, endpoints, data, and results shown here are fictional examples created for this site. They are not employer projects, production systems, or real customer data.';
