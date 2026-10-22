import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  CircleAlert,
  FileText,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { caseStudies, getCaseStudy } from '../data/caseStudies';
import { artifacts } from '../data/artifacts';
import type { ArtifactBlock, CaseStudy } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { PageCTA } from '../components/ui/PageCTA';
import { CodeBlock } from '../components/qa/CodeBlock';
import { DataTable } from '../components/qa/DataTable';
import { DefectReport, ExecutionSummary } from '../components/qa/DefectReport';
import { TestCaseTable } from '../components/qa/TestCaseTable';
import { RuleProbe } from '../components/case-studies/RuleProbe';
import { ReleaseGate } from '../components/case-studies/ReleaseGate';
import { ApiConsole } from '../components/case-studies/ApiConsole';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { cx } from '../lib/cx';
import { NotFoundPage } from './NotFoundPage';

const CASE_SECTION_IDS = [
  'overview',
  'context',
  'requirements',
  'scope',
  'risks',
  'strategy',
  'environment',
  'coverage',
  'execution',
  'defects',
  'regression',
  'conclusion',
  'related',
];

const sectionLabels: { id: string; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Problem & context' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'scope', label: 'Objectives & scope' },
  { id: 'risks', label: 'Risk analysis' },
  { id: 'strategy', label: 'Strategy & demo' },
  { id: 'environment', label: 'Environment' },
  { id: 'coverage', label: 'Coverage map' },
  { id: 'execution', label: 'Execution evidence' },
  { id: 'defects', label: 'Defects' },
  { id: 'regression', label: 'Regression & release' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'related', label: 'Related material' },
];

function Section({
  id,
  index,
  eyebrow,
  title,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="dossier-section" id={id} aria-labelledby={`${id}-title`}>
      <header className="dossier-section__head">
        <p className="eyebrow">
          <span className="eyebrow__mark" aria-hidden="true" />
          {index} / {eyebrow}
        </p>
        <h2 id={`${id}-title`}>{title}</h2>
      </header>
      <div className="dossier-section__body">{children}</div>
    </section>
  );
}

function getBlock<T extends ArtifactBlock['type']>(
  study: CaseStudy,
  artifactId: string,
  type: T,
): Extract<ArtifactBlock, { type: T }> | undefined {
  void study;
  const artifact = artifacts.find((item) => item.id === artifactId);
  return artifact?.blocks.find((block): block is Extract<ArtifactBlock, { type: T }> => block.type === type);
}

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;
  const sectionIds = useMemo(() => [...CASE_SECTION_IDS], [slug]);
  const active = useScrollSpy(sectionIds);

  usePageMeta({
    title: study ? `${study.shortTitle} — Case Study ${study.number}` : 'Case Study Not Found',
    description: study
      ? `${study.intro} A fictional portfolio case study by Abdullah Al Mahmud.`
      : 'This case study could not be found.',
  });

  if (!study) return <NotFoundPage />;

  const decisionBlock = getBlock(study, 'ART-04', 'table');
  const sqlBlocks = study.slug === 'api-data-validation'
    ? artifacts
        .find((artifact) => artifact.id === 'ART-07')
        ?.blocks.filter((block): block is Extract<ArtifactBlock, { type: 'code' }> => block.type === 'code')
        .slice(1, 3) ?? []
    : [];
  const relatedArtifacts = artifacts.filter((artifact) => artifact.relatedCase === study.slug);
  const currentIndex = caseStudies.findIndex((item) => item.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <>
      <PageHero
        index={`Case ${study.number}`}
        eyebrow={`${study.domain} / Demo dossier`}
        title={study.title}
        intro={
          <>
            <p>{study.intro}</p>
            <ul className="tag-list dossier-tags" aria-label="Case study techniques">
              {study.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </>
        }
        backLink={{ to: '/case-studies', label: 'All case studies' }}
        aside={
          <div className="dossier-facts">
            <div className="dossier-facts__head">
              <span className="mono-label">At a glance</span>
              <span className="dossier-facts__badge">DEMO</span>
            </div>
            <dl>
              {study.atAGlance.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="dossier-facts__footer">
              <Info size={14} strokeWidth={1.5} aria-hidden="true" />
              Fictional system and records
            </div>
          </div>
        }
      />

      <div className="demo-banner">
        <div className="shell demo-banner__inner">
          <span className="signal-dot" aria-hidden="true" />
          <p>
            <strong>Portfolio demonstration.</strong> This dossier describes a fictional product and synthetic data.
            It is not a previous employer project or a real production result.
          </p>
        </div>
      </div>

      <div className="dossier-shell shell">
        <aside className="dossier-toc" aria-label="On this page">
          <div className="dossier-toc__head">
            <span className="mono-label">Dossier index</span>
            <span className="dossier-toc__number">{study.number} / 03</span>
          </div>
          <nav>
            <ol>
              {sectionLabels.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={cx(active === section.id && 'is-active')}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="dossier-toc__foot">
            <span className="mono-label">Fictional data</span>
            <span className="mono-label">AAM / QA</span>
          </div>
        </aside>

        <article className="dossier">
          <Section id="overview" index="01" eyebrow="Overview" title="What the release had to prove.">
            <div className="prose prose--lead">
              {study.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="overview-cues">
              <div>
                <span className="mono-label">Domain</span>
                <strong>{study.domain}</strong>
              </div>
              <div>
                <span className="mono-label">Evidence focus</span>
                <strong>{study.atAGlance.find((fact) => fact.label === 'Evidence')?.value}</strong>
              </div>
              <div>
                <span className="mono-label">Demo</span>
                <strong>{study.demoLabel}</strong>
              </div>
            </div>
          </Section>

          <Section id="context" index="02" eyebrow="Problem / context" title="Where a correct-looking result can still fail.">
            <p className="section-lede">{study.problem}</p>
            <ul className="evidence-list">
              {study.problemPoints.map((point, index) => (
                <li key={point}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{point}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="requirements" index="03" eyebrow="Requirements" title="Turn prose into testable conditions.">
            <div className="requirement-list">
              {study.requirements.map((requirement) => (
                <article className="requirement-card" key={requirement.id}>
                  <header>
                    <span className="mono-label">{requirement.id}</span>
                    <FileText size={15} strokeWidth={1.4} aria-hidden="true" />
                  </header>
                  <p className="requirement-card__statement">{requirement.statement}</p>
                  <div>
                    <span className="mono-label">Acceptance conditions</span>
                    <ul>
                      {requirement.acceptance.map((item) => (
                        <li key={item}><span aria-hidden="true">↳</span>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="scope" index="04" eyebrow="Objectives & scope" title="Define the test object before expanding it.">
            <div className="scope-grid">
              <div className="scope-panel">
                <span className="mono-label">In scope</span>
                <ul>
                  {study.scope.inScope.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}
                </ul>
              </div>
              <div className="scope-panel scope-panel--muted">
                <span className="mono-label">Out of scope</span>
                <ul>
                  {study.scope.outOfScope.map((item) => <li key={item}><span aria-hidden="true">−</span>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="objective-row">
              <div>
                <span className="mono-label">Test objectives</span>
                <ol>
                  {study.objectives.map((objective) => <li key={objective}>{objective}</li>)}
                </ol>
              </div>
              <details className="assumptions">
                <summary>
                  <span>Assumptions &amp; constraints</span>
                  <span>{String(study.assumptions.length).padStart(2, '0')}</span>
                </summary>
                <ul>
                  {study.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}
                </ul>
              </details>
            </div>
          </Section>

          <Section id="risks" index="05" eyebrow="Risk analysis" title="Test the consequence, not just the likelihood.">
            <p className="section-lede">
              Risk ranking directed the execution order. High-impact invariants were tested before broad surface
              coverage, even where the likelihood was lower.
            </p>
            <DataTable
              columns={['ID', 'Area', 'Risk statement', 'Likelihood', 'Impact', 'Test response']}
              rows={study.risks.map((risk) => [
                risk.id,
                risk.area,
                risk.statement,
                risk.likelihood,
                risk.impact,
                risk.response,
              ])}
              caption={`${study.shortTitle} risk register`}
            />
          </Section>

          <Section id="strategy" index="06" eyebrow="Strategy & interactive demo" title="Choose the technique that can expose the risk.">
            <div className="strategy-grid">
              {study.strategy.map((item, index) => (
                <div className="strategy-card" key={item.title}>
                  <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>

            <div className="case-demo">
              <div className="case-demo__head">
                <div>
                  <span className="mono-label">Try the model / {study.demoLabel}</span>
                  <h3>Change the inputs. Inspect the conclusion.</h3>
                </div>
                <p>Local demonstration only. No network calls, accounts or real data are involved.</p>
              </div>
              {study.slug === 'financial-validation' ? <RuleProbe /> : null}
              {study.slug === 'saas-regression-testing' ? <ReleaseGate /> : null}
              {study.slug === 'api-data-validation' ? <ApiConsole /> : null}
            </div>

            {study.slug === 'financial-validation' && decisionBlock ? (
              <div className="technique-spotlight">
                <div className="technique-spotlight__head">
                  <div>
                    <span className="mono-label">Technique spotlight / decision table</span>
                    <h3>Independent conditions, explicit expected outcomes.</h3>
                  </div>
                  <Link to="/qa-artifacts?artifact=ART-04" className="text-link">
                    Open the artifact
                    <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                  </Link>
                </div>
                <DataTable
                  columns={decisionBlock.table.columns}
                  rows={decisionBlock.table.rows}
                  caption={decisionBlock.table.title ?? 'Monthly fee waiver decision table'}
                />
              </div>
            ) : null}

            {study.slug === 'api-data-validation' && sqlBlocks.length ? (
              <div className="sql-evidence">
                <div className="sql-evidence__head">
                  <div>
                    <span className="mono-label">Data evidence / read-only SQL</span>
                    <h3>What the response cannot tell you.</h3>
                  </div>
                  <Link to="/qa-artifacts?artifact=ART-07" className="text-link">
                    Full SQL sample
                    <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                  </Link>
                </div>
                <p>
                  These queries use a fictional <code>billing</code> schema. They connect a response correlation ID to
                  the financial and observability records beneath it.
                </p>
                {sqlBlocks.map((block) => (
                  <CodeBlock key={block.title} title={block.title} language={block.language} code={block.code} />
                ))}
              </div>
            ) : null}
          </Section>

          <Section id="environment" index="07" eyebrow="Environment" title="Know what the environment can and cannot prove.">
            <ol className="environment-list">
              {study.environments.map((item, index) => (
                <li key={item}>
                  <span className="mono-label">ENV-{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="coverage" index="08" eyebrow="Coverage map" title="Happy, negative and the moments between.">
            <div className="scenario-grid">
              {study.scenarioGroups.map((group) => (
                <article className={cx('scenario-card', `scenario-card--${group.type.toLowerCase()}`)} key={group.title}>
                  <header>
                    <span className="mono-label">{group.type}</span>
                    <span className="scenario-card__mark" aria-hidden="true" />
                  </header>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul>
                    {group.examples.map((example) => <li key={example}>{example}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section id="execution" index="09" eyebrow="Execution evidence" title="A status is only useful when the evidence is visible.">
            <ExecutionSummary tests={study.testCases} note="Illustrative statuses for this portfolio demonstration. They are not employer execution records." />
            <TestCaseTable tests={study.testCases} caption={`${study.shortTitle} sample test cases`} />
            <div className="execution-notes">
              <span className="mono-label">Execution notes</span>
              <ul>
                {study.executionNotes.map((note) => <li key={note}><span aria-hidden="true">↳</span>{note}</li>)}
              </ul>
            </div>
          </Section>

          <Section id="defects" index="10" eyebrow="Defects" title="Make the failure reproducible and its impact legible.">
            <div className="defect-intro">
              <CircleAlert size={17} strokeWidth={1.4} aria-hidden="true" />
              <p>
                Each record below is an illustrative defect written against a fictional build. Severity expresses
                impact; priority expresses urgency in this sample release.
              </p>
            </div>
            <div className="defect-list">
              {study.defects.map((defect) => <DefectReport key={defect.id} defect={defect} />)}
            </div>
            <div className="defect-attribution">
              <span className="mono-label">Evidence boundary</span>
              <p>
                These are original examples. They do not reproduce a defect from WalletHub, Codemen Solutions, SAIL AI
                or any real system.
              </p>
            </div>
          </Section>

          <Section id="regression" index="11" eyebrow="Regression & release" title="Scope regression by what can actually break.">
            <p className="section-lede">{study.regression.intro}</p>
            <div className="regression-grid">
              <div className="regression-checklist">
                <span className="mono-label">Change-impacted regression pack</span>
                <ul>
                  {study.regression.checklist.map((item) => (
                    <li key={item}><span aria-hidden="true">↳</span>{item}</li>
                  ))}
                </ul>
              </div>
              <aside className="release-decision">
                <div>
                  <ShieldCheck size={18} strokeWidth={1.4} aria-hidden="true" />
                  <span className="mono-label">Sample release position</span>
                </div>
                <p>{study.regression.releaseDecision}</p>
                <span className="release-decision__note">Fictional evidence set / not a real release decision</span>
              </aside>
            </div>
          </Section>

          <Section id="conclusion" index="12" eyebrow="Conclusion" title="What the evidence changed.">
            <div className="conclusion-copy">
              {study.conclusions.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="lessons">
              <span className="mono-label">What I took forward</span>
              <ul>
                {study.lessons.map((lesson) => (
                  <li key={lesson}><span aria-hidden="true">+</span>{lesson}</li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="related" index="13" eyebrow="Related material" title="Continue through the evidence.">
            <div className="related-artifacts">
              {relatedArtifacts.map((artifact) => (
                <Link to={`/qa-artifacts?artifact=${artifact.id}`} className="related-artifact" key={artifact.id}>
                  <span className="mono-label">{artifact.id} / {artifact.format}</span>
                  <h3>{artifact.title}</h3>
                  <p>{artifact.summary}</p>
                  <span className="related-artifact__action">
                    Inspect artifact
                    <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="dossier-next">
              <Link to={`/case-studies/${nextStudy.slug}`} className="dossier-next__link">
                <span>
                  <span className="mono-label">Next dossier / {nextStudy.number}</span>
                  <strong>{nextStudy.shortTitle}</strong>
                </span>
                <ChevronRight size={22} strokeWidth={1.4} aria-hidden="true" />
              </Link>
              <Link to="/case-studies" className="dossier-next__back">
                <ArrowLeft size={14} strokeWidth={1.6} aria-hidden="true" />
                All dossiers
              </Link>
            </div>
          </Section>
        </article>
      </div>

      <PageCTA
        eyebrow="Apply the method"
        title={<>Need this level of scrutiny<br /><em>on a real release?</em></>}
        copy="I’m happy to talk through test strategy, release risk or a specific quality problem. The demonstration data ends here; the conversation can be real."
      />
    </>
  );
}
