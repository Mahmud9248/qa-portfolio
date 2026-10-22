import {
  ArrowUpRight,
  Award,
  BookOpen,
  GraduationCap,
  Languages,
  MapPin,
  Radio,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site';
import { education, engagements, interests, languages, recognition, skills } from '../data/experience';
import { tools } from '../data/tools';
import { PageHero } from '../components/ui/PageHero';
import { PageCTA } from '../components/ui/PageCTA';
import { ToolLogo } from '../components/ui/ToolLogo';
import { ExperienceTimeline } from '../components/about/ExperienceTimeline';
import { usePageMeta } from '../hooks/usePageMeta';

const approach = [
  {
    index: '01',
    title: 'Read the requirement as a test object.',
    body: 'Ambiguity is not a detail to work around. It is a decision that has not been made yet. I clarify the rule, state the assumption and design the proof around it.',
  },
  {
    index: '02',
    title: 'Follow the same truth across layers.',
    body: 'A screen, an API response and a stored record can each look plausible while disagreeing with one another. I trace the value through every layer that matters.',
  },
  {
    index: '03',
    title: 'Make the evidence usable.',
    body: 'A defect report should let someone reproduce the problem without asking me what I meant. Steps, data, expected result, actual result and the smallest sufficient evidence.',
  },
  {
    index: '04',
    title: 'Stay honest about residual risk.',
    body: 'Blocked tests and unresolved questions belong in the release conversation. A clean-looking status count is not the same thing as confidence.',
  },
];

const engagementIcons = [Radio, Users, GraduationCap];

export function AboutPage() {
  usePageMeta({
    title: 'About & Experience',
    description:
      'About Abdullah Al Mahmud, a Manual QA Engineer in Dhaka with 4+ years of experience across SaaS, AI-driven and FinTech products, including WalletHub and Codemen Solutions.',
  });

  return (
    <>
      <PageHero
        index="03"
        eyebrow="About / Practice profile"
        title={
          <>
            Manual by discipline.
            <br />
            Curious by <em>default.</em>
          </>
        }
        intro={
          <>
            <p>
              I’m Abdullah Al Mahmud, a Manual QA Engineer based in Dhaka. For more than four years I’ve tested SaaS,
              AI-driven and FinTech products, with a focus on complex workflows, financial accuracy and release
              evidence.
            </p>
            <p>
              My work sits between the requirement and the release: asking what the product promised, finding the paths
              where that promise breaks, and leaving behind evidence the team can act on.
            </p>
          </>
        }
        aside={
          <figure className="about-portrait">
            <div className="about-portrait__frame">
              <div className="about-portrait__bar">
                <span className="mono-label">Practice profile / AAM</span>
                <span className="about-portrait__status"><i aria-hidden="true" />Dhaka, BD</span>
              </div>
              <picture>
                <source type="image/avif" srcSet="/images/profile-768.avif 768w" sizes="(max-width: 900px) 90vw, 34vw" />
                <source type="image/webp" srcSet="/images/profile-768.webp 768w" sizes="(max-width: 900px) 90vw, 34vw" />
                <img
                  src="/images/profile.jpg"
                  alt="Portrait of Abdullah Al Mahmud, Manual QA Engineer."
                  width={768}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="about-portrait__footer">
                <div>
                  <strong>Abdullah Al Mahmud</strong>
                  <span>Manual QA Engineer</span>
                </div>
                <span className="mono-label">04+ years</span>
              </div>
            </div>
            <figcaption>
              <span className="mono-label">Based in</span>
              <span>{siteConfig.location}</span>
            </figcaption>
          </figure>
        }
      />

      <section className="about-profile section" aria-labelledby="about-profile-title">
        <div className="shell">
          <div className="about-profile__layout">
            <div className="about-profile__statement">
              <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Profile</p>
              <h2 id="about-profile-title" className="display">
                The product is the promise.
                <br />
                <em>The test is the proof.</em>
              </h2>
              <div className="about-profile__copy">
                <p>{siteConfig.intro}</p>
                <p>
                  I started in QA as an intern at Codemen Solutions and progressed to Software Quality Assurance
                  Engineer, working across SaaS and AI-powered applications. Later, at WalletHub, I focused on manual QA
                  for a U.S. personal-finance product: financial workflows, calculations, REST APIs, subscription and
                  billing behavior, and release validation.
                </p>
                <p>
                  Across both environments, the same principle held: understand the workflow deeply enough to know where
                  it can fail, then produce evidence that makes the failure impossible to dismiss.
                </p>
              </div>
            </div>

            <aside className="about-profile__facts" aria-label="Professional facts">
              <div>
                <span className="mono-label">Experience</span>
                <strong>4+</strong>
                <span>years in software quality</span>
              </div>
              <div>
                <span className="mono-label">Domains</span>
                <strong>SaaS / FinTech / AI</strong>
                <span>web and mobile products</span>
              </div>
              <div>
                <span className="mono-label">Core focus</span>
                <strong>Manual QA</strong>
                <span>functional, regression, exploratory, API</span>
              </div>
              <div>
                <span className="mono-label">Working style</span>
                <strong>Risk-led</strong>
                <span>evidence over assumption</span>
              </div>
              <div className="about-profile__facts-foot">
                <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                <span>{siteConfig.location}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="about-approach section" aria-labelledby="approach-title">
        <div className="shell">
          <header className="about-section-head">
            <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Approach</p>
            <h2 id="approach-title" className="display">Four habits behind the test plan.</h2>
            <p>
              The tooling changes by team. The underlying questions do not. These are the habits I bring to a product,
              a release or an ambiguous requirement.
            </p>
          </header>
          <div className="approach-grid">
            {approach.map((item) => (
              <article className="approach-card" key={item.index}>
                <span className="mono-label">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="approach-card__mark" aria-hidden="true">+</span>
              </article>
            ))}
          </div>
          <div className="manual-note">
            <span className="mono-label">A clear boundary</span>
            <p>
              My professional experience is manual QA. I’m interested in test automation frameworks and cloud QA, but I
              don’t present automation engineering as a current specialty. The value here is test judgment, evidence
              quality and release risk.
            </p>
            <Link to="/case-studies" className="text-link">
              See the method in practice
              <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-skills section" id="skills" aria-labelledby="about-skills-title">
        <div className="shell">
          <header className="about-section-head about-section-head--inline">
            <div>
              <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Skills & tools</p>
              <h2 id="about-skills-title" className="display">A practical working vocabulary.</h2>
            </div>
            <p>
              These are the methods and tools used in the roles documented below. Tool names are not endorsements or
              certifications; they are part of the day-to-day QA workflow.
            </p>
          </header>

          <div className="skills-detail">
            {skills.map((group, index) => (
              <div className="skills-detail__group" key={group.title}>
                <div className="skills-detail__head">
                  <span className="mono-label">0{index + 1} / {group.title}</span>
                  <span className="skills-detail__count">{String(group.items.length).padStart(2, '0')}</span>
                </div>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="tools-detail">
            <div className="tools-detail__head">
              <span className="mono-label">Toolkit referenced in the résumé</span>
              <span className="mono-label">{String(tools.length).padStart(2, '0')} tools</span>
            </div>
            <ul>
              {tools.map((tool) => (
                <li key={tool.name}>
                  <ToolLogo tool={tool} />
                  <span>
                    <strong>{tool.name}</strong>
                    <small>{tool.descriptor}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-experience section" aria-labelledby="about-experience-title">
        <div className="shell">
          <header className="about-section-head about-section-head--inline">
            <div>
              <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Experience</p>
              <h2 id="about-experience-title" className="display">The roles, in sequence.</h2>
            </div>
            <p>
              Exact employment history from the supplied résumé. Responsibilities are shown as written there, grouped
              by the environments in which they were performed.
            </p>
          </header>
          <ExperienceTimeline detailed />
        </div>
      </section>

      <section className="about-recognition section" aria-labelledby="about-recognition-title">
        <div className="shell">
          <div className="recognition-grid">
            <article className="recognition-card">
              <div className="recognition-card__head">
                <span className="mono-label">Recognition / platform attribution</span>
                <Award size={21} strokeWidth={1.3} aria-hidden="true" />
              </div>
              <div className="recognition-card__year" aria-hidden="true">2023</div>
              <h2 id="about-recognition-title">{recognition.award}</h2>
              <p className="recognition-card__category">{recognition.category}</p>
              <p>
                Contributed to QA of the <strong>{recognition.context}</strong>, the platform recognised as the winner
                of the {recognition.award} in the {recognition.category} category.
              </p>
              <div className="recognition-card__attribution">
                <span className="mono-label">Attribution</span>
                <span>The award belongs to the SAIL AI platform. This portfolio does not claim an individual award.</span>
              </div>
            </article>

            <div className="about-foundation">
              <article className="foundation-card">
                <div className="foundation-card__head">
                  <GraduationCap size={18} strokeWidth={1.4} aria-hidden="true" />
                  <span className="mono-label">Education / {education.period}</span>
                </div>
                <h3>{education.degree}</h3>
                <p>{education.institution}</p>
                <div>
                  <span>{education.grade}</span>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </article>

              <article className="foundation-card">
                <div className="foundation-card__head">
                  <BookOpen size={18} strokeWidth={1.4} aria-hidden="true" />
                  <span className="mono-label">Ongoing learning interests</span>
                </div>
                <ul className="foundation-card__interests">
                  {interests.map((interest) => <li key={interest}>{interest}</li>)}
                </ul>
                <p className="small-note">Listed as interests from the résumé, not as claimed production experience.</p>
              </article>

              <article className="foundation-card foundation-card--languages">
                <div className="foundation-card__head">
                  <Languages size={18} strokeWidth={1.4} aria-hidden="true" />
                  <span className="mono-label">Languages</span>
                </div>
                <div className="language-list">
                  {languages.map((language) => (
                    <div key={language.name}>
                      <strong>{language.name}</strong>
                      <span>{language.level}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className="engagement-block">
            <div className="engagement-block__head">
              <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Beyond the test plan</p>
              <h3>Sharing the work is part of the work.</h3>
            </div>
            <ul>
              {engagements.map((engagement, index) => {
                const Icon = engagementIcons[index] ?? Radio;
                return (
                  <li key={engagement.title}>
                    <Icon size={16} strokeWidth={1.4} aria-hidden="true" />
                    <div>
                      <strong>{engagement.title}</strong>
                      <span>{engagement.description}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Connect the dots"
        title={<>A method is only useful<br /><em>when it meets a real product.</em></>}
        copy="If the experience and the evidence fit a role or a release you’re working on, I’d be glad to talk."
      />
    </>
  );
}
