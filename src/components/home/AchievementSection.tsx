import { Award, GraduationCap, Radio, Users } from 'lucide-react';
import { education, engagements, recognition } from '../../data/experience';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const engagementIcons = [Radio, Users, GraduationCap];

export function AchievementSection() {
  return (
    <section className="achievement-section section" id="recognition" aria-labelledby="recognition-title">
      <div className="shell">
        <SectionHeading
          index="008"
          eyebrow="Recognition & foundation"
          title={
            <>
              Built on curiosity.
              <br />
              <em>Connected to a platform award.</em>
            </>
          }
          id="recognition-title"
          copy={
            <p>
              A platform recognition connected to the QA work, an engineering education and a habit of sharing what I
              learn with the people around me.
            </p>
          }
        />

        <div className="achievement-grid">
          <Reveal className="award-panel">
            <div className="award-panel__top">
              <span className="mono-label">Platform recognition / 2023</span>
              <Award size={20} strokeWidth={1.2} aria-hidden="true" />
            </div>
            <div className="award-panel__year" aria-hidden="true">2023</div>
            <div className="award-panel__content">
              <p className="award-panel__context">Contributed to QA of the</p>
              <h3>{recognition.context}</h3>
              <p className="award-panel__award">
                {recognition.award} <span>/</span> {recognition.category}
              </p>
              <p className="award-panel__note">
                Recognition belongs to the SAIL AI platform. My contribution was part of its quality assurance.
              </p>
            </div>
            <div className="award-panel__grid" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="award-panel__footer">
              <span>ATTRIBUTION / PLATFORM</span>
              <span className="award-panel__footer-line" aria-hidden="true" />
              <span>QA CONTRIBUTION</span>
            </div>
          </Reveal>

          <div className="achievement-side">
            <Reveal className="education-panel" delay={0.06}>
              <div className="education-panel__top">
                <GraduationCap size={18} strokeWidth={1.4} aria-hidden="true" />
                <span className="mono-label">Education / {education.period}</span>
              </div>
              <h3>{education.degree}</h3>
              <p>{education.institution}</p>
              <div className="education-panel__meta">
                <span>{education.grade}</span>
                <span>Dhaka, Bangladesh</span>
              </div>
            </Reveal>

            <Reveal className="engagement-panel" delay={0.1}>
              <div className="engagement-panel__top">
                <span className="mono-label">Beyond the test plan</span>
                <span className="mono-label">Knowledge sharing</span>
              </div>
              <ul>
                {engagements.map((engagement, index) => {
                  const Icon = engagementIcons[index] ?? Radio;
                  return (
                    <li key={engagement.title}>
                      <Icon size={16} strokeWidth={1.4} aria-hidden="true" />
                      <div>
                        <h4>{engagement.title}</h4>
                        <p>{engagement.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
