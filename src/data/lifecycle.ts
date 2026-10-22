export interface LifecyclePhase {
  id: string;
  index: string;
  label: string;
  short: string;
  description: string;
  activities: string[];
  artifact: string;
}

export const lifecyclePhases: LifecyclePhase[] = [
  {
    id: 'frame',
    index: '01',
    label: 'Frame the requirement',
    short: 'Requirement',
    description:
      'Turn prose into a testable statement. Resolve contradictions, state assumptions and identify the decision points before looking at the implementation.',
    activities: [
      'Read the requirement against the user journey.',
      'Write down ambiguous terms and ask for a decision.',
      'Extract acceptance criteria and business rules.',
      'Identify the consequence of failure, not just the likelihood.',
    ],
    artifact: 'Requirement notes / clarification log',
  },
  {
    id: 'design',
    index: '02',
    label: 'Design the proof',
    short: 'Test design',
    description:
      'Select the test technique that exposes the specific risk: decision tables for rule combinations, boundaries for thresholds, role matrices for permission paths.',
    activities: [
      'Map happy, negative and edge scenarios.',
      'Use boundary values with the exact threshold.',
      'Define test data and expected outcomes.',
      'Choose where evidence will come from.',
    ],
    artifact: 'Test plan / decision table / test cases',
  },
  {
    id: 'prepare',
    index: '03',
    label: 'Prepare the ground',
    short: 'Test data',
    description:
      'Create synthetic, traceable data and confirm the environment can actually prove the expected result. A missing clock control is a test limitation, not a test result.',
    activities: [
      'Build isolated test accounts and records.',
      'Check fixtures for exact boundary values.',
      'Verify access to logs, database or statement output.',
      'Record environment and build identifiers.',
    ],
    artifact: 'Test data set / environment checklist',
  },
  {
    id: 'execute',
    index: '04',
    label: 'Execute with intent',
    short: 'Execution',
    description:
      'Run scripted cases with deliberate data, then explore the paths the script did not anticipate. Observe the product; do not merely confirm the script.',
    activities: [
      'Execute smoke and risk-priority cases first.',
      'Compare actual against exact expected values.',
      'Explore adjacent states and recovery paths.',
      'Capture evidence while the state is current.',
    ],
    artifact: 'Execution results / evidence log',
  },
  {
    id: 'report',
    index: '05',
    label: 'Make failure legible',
    short: 'Defect report',
    description:
      'A defect should let another person reproduce the behavior, see the expected outcome and understand the impact. Severity and priority are separate arguments.',
    activities: [
      'Describe environment, preconditions and exact steps.',
      'Contrast expected and actual behavior.',
      'Attach the smallest sufficient evidence.',
      'Distinguish severity from priority.',
    ],
    artifact: 'Defect report / triage notes',
  },
  {
    id: 'verify',
    index: '06',
    label: 'Verify the whole promise',
    short: 'Release',
    description:
      'Retest the fix, select regression around what changed, and state residual risk plainly. Release confidence is an evidence position, not a feeling.',
    activities: [
      'Retest the original failure and adjacent boundaries.',
      'Execute the change-impacted regression pack.',
      'Reconcile UI, API and data where relevant.',
      'Record a go / hold recommendation with reasons.',
    ],
    artifact: 'Retest record / regression report / release note',
  },
];
