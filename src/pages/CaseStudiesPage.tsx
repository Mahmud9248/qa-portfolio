import { ArrowDownRight, Check, FileSearch, ShieldCheck } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import { PageHero } from '../components/ui/PageHero';
import { PageCTA } from '../components/ui/PageCTA';
import { CaseStudyRow } from '../components/case-studies/CaseStudyRow';
import { usePageMeta } from '../hooks/usePageMeta';

const guide = [
  {
    icon: FileSearch,
    label: '01 / Frame',
    title: 'The risk comes first',
    copy: 'Each dossier opens with the requirement and the specific ways it could fail — not a list of every test that could ever be run.',
  },
  {
    icon: ShieldCheck,
    label: '02 / Prove',
    title: 'Evidence over appearance',
    copy: 'Test cases carry exact data and expected values. The response, the screen and the ledger all have to agree before the result counts.',
  },
  {
    icon: Check,
    label: '03 / Decide',
    title: 'A release position, not a green number',
    copy: 'Defects, blocked evidence and residual risk lead to an explicit recommendation. A pass count never makes that decision on its own.',
  },
];

export function CaseStudiesPage() {
  usePageMeta({
    title: 'Case Studies',
    description:
      'Three original manual QA case studies by Abdullah Al Mahmud: financial rules validation, SaaS release regression and API/data integrity. Fictional demonstrations.',
  });

  return (
    <>
      <PageHero
        index="01"
        eyebrow="Case study dossiers"
        title={
          <>
            Three dossiers.
            <br />
            One standard of <em>proof.</em>
          </>
        }
        intro={
          <>
            <p>
              A closer look at how I turn a requirement into test conditions, evidence and a release decision. The
              systems are fictional; the method is the work.
            </p>
            <p className="small-note">No employer project, production system or customer data appears here.</p>
          </>
        }
        aside={
          <div className="dossier-index">
            <div className="dossier-index__head">
              <span className="mono-label">Dossier index</span>
              <span className="dossier-index__stamp">AAM / QA</span>
            </div>
            <ol>
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <span>{study.number}</span>
                  <div>
                    <strong>{study.shortTitle}</strong>
                    <small>{study.domain}</small>
                  </div>
                  <ArrowDownRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </li>
              ))}
            </ol>
            <div className="dossier-index__foot">
              <span>03 / demonstrations</span>
              <span>Fictional data</span>
            </div>
          </div>
        }
      />

      <section className="case-index section" aria-labelledby="case-index-title">
        <div className="shell">
          <div className="case-index__intro">
            <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Reading guide</p>
            <h2 id="case-index-title" className="display">Every dossier follows the same evidence chain.</h2>
            <p>
              The domains differ, but the questions do not: what is the product promising, where can that promise
              break, what data proves it, and what should the team do next?
            </p>
          </div>

          <div className="reading-guide">
            {guide.map((item) => {
              const Icon = item.icon;
              return (
                <div className="reading-guide__item" key={item.label}>
                  <div className="reading-guide__head">
                    <Icon size={17} strokeWidth={1.4} aria-hidden="true" />
                    <span className="mono-label">{item.label}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              );
            })}
          </div>

          <div className="case-index__list-head">
            <span className="mono-label">Selected dossiers / 2026</span>
            <span className="mono-label">03 files</span>
          </div>
          <div className="case-index__list">
            {caseStudies.map((study) => (
              <CaseStudyRow key={study.slug} study={study} />
            ))}
          </div>

          <div className="case-index__note">
            <span className="mono-label">Important context</span>
            <p>
              These are original portfolio demonstrations, not paid-client work. Fictional company names, endpoints,
              records and results are used throughout so the reasoning can be inspected without exposing an employer.
              Employment history and platform recognition are documented separately on the About page.
            </p>
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Continue the conversation"
        title={<>Need this standard of proof<br /><em>on a real release?</em></>}
        copy="These dossiers show how I frame risk and build evidence. If a product or release of yours needs the same scrutiny, I’d be glad to talk through it."
      />
    </>
  );
}
