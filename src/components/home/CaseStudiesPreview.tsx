import { caseStudies } from '../../data/caseStudies';
import { SectionHeading } from '../ui/SectionHeading';
import { CaseStudyRow } from '../case-studies/CaseStudyRow';

export function CaseStudiesPreview() {
  return (
    <section className="case-preview section" id="case-studies" aria-labelledby="case-studies-title">
      <div className="shell">
        <SectionHeading
          index="004"
          eyebrow="Selected dossiers"
          title={
            <>
              Three ways a release
              <br />
              earns <em>trust.</em>
            </>
          }
          id="case-studies-title"
          copy={
            <p>
              Not screenshots of a previous employer. Three working demonstrations of how I frame risk, choose test
              data and turn observations into evidence.
            </p>
          }
          action={{ label: 'All case studies', href: '/case-studies' }}
        />

        <div className="case-preview__list">
          {caseStudies.map((study) => (
            <CaseStudyRow key={study.slug} study={study} />
          ))}
        </div>

        <div className="demo-note">
          <span className="demo-note__index">↳</span>
          <p>
            These scenarios are fictional portfolio demonstrations. They do not represent work performed for any
            employer or any real production system.
          </p>
        </div>
      </div>
    </section>
  );
}
