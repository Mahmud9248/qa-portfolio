export interface CareerRole {
  title: string;
  period: string;
  note?: string;
}

export interface ExperienceEntry {
  company: string;
  parenthetical?: string;
  period: string;
  summary: string;
  roles: CareerRole[];
  responsibilities: string[];
  tools: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'WalletHub',
    parenthetical: 'A Product of Evolution Finance, Inc.',
    period: 'Jan 2026 — Sep 2026',
    summary:
      'Manual QA for a U.S.-based personal-finance product, within a globally distributed, English-speaking team.',
    roles: [{ title: 'Manual QA Engineer', period: 'Jan 2026 — Sep 2026' }],
    responsibilities: [
      'Executed functional, regression, smoke, and exploratory testing across cross-platform web and mobile applications.',
      'Validated complex financial workflows, calculations, and data-driven features for accuracy and reliability.',
      'Tested transaction-related flows and backend-integrated functionality under boundary and edge-case scenarios.',
      'Performed REST API validation with Postman, checking authentication, response behavior, and data integrity.',
      'Validated third-party integrations and subscription / billing workflows connected to Stripe, including upgrades, cancellations, and billing scenarios.',
      'Investigated application errors and backend exceptions with monitoring tools to support debugging.',
      'Supported release cycles through end-to-end validation, regression coverage, and risk-based testing.',
      'Validated releases in Blue-Green deployments through smoke and regression testing before rollout.',
      'Verified notifications, email communications, and user-facing content for consistency and correctness.',
      'Identified, documented, and managed defects in Jira in collaboration with cross-functional teams.',
    ],
    tools: ['Jira', 'Postman', 'Stripe (test environment)', 'Sentry.io', 'Blue-Green releases'],
  },
  {
    company: 'Codemen Solutions Ltd.',
    parenthetical: 'Affiliated with PremiseHQ SaaS Inc.',
    period: 'Dec 2021 — Jan 2026',
    summary:
      'Progressive QA responsibility across SaaS and AI-powered applications — from internship to mentoring peers and supporting client-facing delivery.',
    roles: [
      { title: 'Software Quality Assurance Engineer', period: 'Apr 2024 — Jan 2026' },
      { title: 'Associate Software QA Engineer', period: 'Apr 2022 — Mar 2024' },
      { title: 'SQA Intern', period: 'Dec 2021 — Mar 2022' },
    ],
    responsibilities: [
      'Designed and executed test plans and test cases for SaaS and AI-powered applications.',
      'Performed functional, regression, smoke, and exploratory testing to validate features and workflows.',
      'Led API testing and debugging with Postman, checking authentication, authorization, and data integrity.',
      'Conducted performance testing with JMeter to evaluate scalability and response behavior.',
      'Collaborated with developers and product managers to triage, prioritize, and resolve defects.',
      'Delivered client-facing demos and contributed QA insight to product improvements.',
      'Mentored junior QA engineers on test design and UAT practices.',
    ],
    tools: ['TestRail', 'Qase', 'Postman', 'JMeter', 'Jira'],
  },
];

export const skills = [
  {
    title: 'Test design & execution',
    items: [
      'Functional testing',
      'Regression testing',
      'Smoke testing',
      'Exploratory testing',
      'Boundary & edge-case analysis',
      'Cross-browser & compatibility testing',
      'Agile / Scrum delivery',
    ],
  },
  {
    title: 'API, data & performance',
    items: [
      'REST API validation',
      'Authentication & authorization checks',
      'Data integrity validation',
      'SQL / MySQL queries',
      'Performance testing',
      'Amazon Redshift data checks',
    ],
  },
  {
    title: 'Release & collaboration',
    items: [
      'Risk-based release validation',
      'Test planning & case design',
      'Defect triage & tracking',
      'UAT support',
      'Client-facing demonstrations',
      'QA knowledge sharing & mentoring',
    ],
  },
] as const;

export const education = {
  degree: 'BSc in Computer Science & Engineering',
  institution: 'American International University-Bangladesh',
  period: '2017 — 2021',
  grade: 'CGPA 3.16 / 4.00',
};

export const recognition = {
  context: 'SAIL AI platform',
  award: 'Realcomm Digie Award 2023',
  category: 'Best Tech Innovation',
  contribution: 'Contributed to QA of the SAIL AI platform.',
};

export const engagements = [
  {
    title: 'CUET-ETE × Codemen QA orientation',
    description: 'Hosted a QA orientation session with CUET-ETE and Codemen.',
  },
  {
    title: 'QA knowledge sharing',
    description: 'Conducted internal QA knowledge-sharing sessions.',
  },
  {
    title: 'Mentoring',
    description: 'Mentored junior QA engineers on test design and UAT practices.',
  },
];

export const languages = [
  { name: 'Bengali', level: 'Native' },
  { name: 'English', level: 'Professional proficiency — daily use in an international work environment' },
];

export const interests = [
  'Test automation frameworks',
  'System design fundamentals',
  'Cloud QA (AWS, Azure)',
  'Testing AI-driven applications',
];
