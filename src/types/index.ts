export type TestStatus = 'Passed' | 'Failed' | 'Blocked' | 'Pending';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Priority = 'Immediate' | 'High' | 'Medium' | 'Low';
export type RiskLevel = 'High' | 'Medium' | 'Low';
export type CaseStudySlug = 'financial-validation' | 'saas-regression-testing' | 'api-data-validation';

export interface TestCase {
  id: string;
  requirementId: string;
  scenario: string;
  preconditions: string;
  steps: string[];
  testData: string;
  expected: string;
  status: TestStatus;
  evidence?: string;
}

export interface Defect {
  id: string;
  title: string;
  environment: string;
  preconditions: string;
  steps: string[];
  expected: string;
  actual: string;
  severity: Severity;
  priority: Priority;
  status: 'Open' | 'In progress' | 'Retest' | 'Verified' | 'Closed';
  evidence: string[];
  note?: string;
}

export interface Risk {
  id: string;
  area: string;
  statement: string;
  likelihood: RiskLevel;
  impact: RiskLevel;
  response: string;
}

export interface Requirement {
  id: string;
  statement: string;
  acceptance: string[];
}

export interface ScenarioGroup {
  type: 'Positive' | 'Negative' | 'Edge';
  title: string;
  description: string;
  examples: string[];
}

export interface CaseStudy {
  slug: CaseStudySlug;
  number: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  intro: string;
  domain: string;
  tags: string[];
  demoLabel: string;
  atAGlance: { label: string; value: string }[];
  overview: string[];
  problem: string;
  problemPoints: string[];
  requirements: Requirement[];
  assumptions: string[];
  objectives: string[];
  scope: { inScope: string[]; outOfScope: string[] };
  risks: Risk[];
  strategy: { title: string; body: string }[];
  environments: string[];
  scenarioGroups: ScenarioGroup[];
  testCases: TestCase[];
  executionNotes: string[];
  defects: Defect[];
  regression: { intro: string; checklist: string[]; releaseDecision: string };
  conclusions: string[];
  lessons: string[];
}

export type ArtifactCategory = 'Planning' | 'Test design' | 'Execution' | 'Defects' | 'API & data';
export type ArtifactTab = 'document' | 'context';

export interface ArtifactTable {
  title?: string;
  caption?: string;
  columns: string[];
  rows: string[][];
}

export type ArtifactBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; title?: string; items: string[] }
  | { type: 'table'; table: ArtifactTable }
  | { type: 'code'; title: string; language: string; code: string }
  | { type: 'fields'; title?: string; fields: { label: string; value: string }[] }
  | { type: 'callout'; label: string; text: string };

export interface Artifact {
  id: string;
  title: string;
  category: ArtifactCategory;
  format: string;
  summary: string;
  purpose: string;
  howToUse: string[];
  tags: string[];
  relatedCase: CaseStudySlug;
  updated: string;
  blocks: ArtifactBlock[];
  downloadName: string;
}

export interface ExecutionTest {
  id: string;
  name: string;
  area: string;
  status: TestStatus;
  note?: string;
}
