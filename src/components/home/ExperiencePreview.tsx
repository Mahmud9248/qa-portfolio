import { Link } from 'react-router-dom';
import { ArrowUpRight, Award } from 'lucide-react';
import { recognition } from '../../data/experience';
import { siteConfig, yearsTesting } from '../../data/site';
import { SectionHeading } from '../ui/SectionHeading';
import { CompanyLogo } from '../ui/CompanyLogo';
import { ExperienceTimeline } from '../about/ExperienceTimeline';
import { Reveal } from '../ui/Reveal';

const facts = [
  { value: `${yearsTesting()}+`, label: `years in software quality, since ${siteConfig.testingSince}` },
  { value: '02', label: 'companies' },
  { value: '04', label: 'QA titles, intern to engineer' },
];

export function ExperiencePreview() {
  return (
    <section className="experience-preview section" id="experience" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          index="002"
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
              From an SQA internship to release-focused QA for a U.S. fintech product. The thread is consistent:
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

        <Reveal className="award-note">
          <Award size={18} strokeWidth={1.3} aria-hidden="true" />
          <p>
            A platform I helped test, <strong>{recognition.context}</strong>, won {recognition.category} at the{' '}
            {recognition.award}.
          </p>
          <Link to="/about" className="text-link">
            Recognition & education
            <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
