import { SectionHeading } from '../ui/SectionHeading';
import { CompanyLogo } from '../ui/CompanyLogo';
import { ExperienceTimeline } from '../about/ExperienceTimeline';
import { Reveal } from '../ui/Reveal';

const facts = [
  { value: '4+', label: 'years in software quality' },
  { value: '02', label: 'companies' },
  { value: '04', label: 'QA roles held' },
];

export function ExperiencePreview() {
  return (
    <section className="experience-preview section" id="experience" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          index="007"
          eyebrow="Experience"
          title={
            <>
              A career built on
              <br />
              <em>looking closer.</em>
            </>
          }
          id="experience-title"
          copy={
            <p>
              From an SQA internship to release-focused manual QA for a U.S. fintech product. The thread is consistent:
              understand the workflow, test the edges and make the evidence useful to the team.
            </p>
          }
          action={{ label: 'Full experience & approach', href: '/about' }}
        />

        <div className="experience-preview__facts">
          {facts.map((fact, index) => (
            <Reveal className="experience-fact" key={fact.label} delay={index * 0.05}>
              <span>{fact.value}</span>
              <p>{fact.label}</p>
            </Reveal>
          ))}
          <Reveal className="experience-fact experience-fact--note" delay={0.15}>
            <div className="experience-fact__brands">
              <CompanyLogo brand="wallethub" />
              <span className="experience-fact__divider" aria-hidden="true">
                /
              </span>
              <CompanyLogo brand="codemen" />
            </div>
            <span className="mono-label">Most recent environments</span>
          </Reveal>
        </div>

        <ExperienceTimeline />
      </div>
    </section>
  );
}
