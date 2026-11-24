import { motion, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import { siteConfig, yearsTesting } from '../../data/site';
import { LineReveal, Reveal } from '../ui/Reveal';
import { EASE_CINEMATIC } from '../../lib/motion';

const whatIDo = [
  'Functional, regression, smoke and exploratory testing on web and mobile',
  'REST API validation in Postman — auth, responses and data integrity',
  'Financial workflows, calculations and Stripe billing scenarios',
  'Release validation, including Blue-Green deployments',
  'Performance checks with JMeter',
  'Clear defect reports and triage in Jira',
];

const howIWork = [
  'Clarify the requirement before testing the screen.',
  'Test the riskiest paths first, then widen coverage.',
  'Report defects with steps, data, expected vs. actual.',
  'Say plainly what is blocked or untested before a release.',
  'Work async with distributed, English-speaking teams.',
];

const principles = [
  {
    index: '01',
    title: 'Requirements before screens',
    body: 'A passing screen is weak evidence if the expected behavior was never defined. I clarify ambiguous rules, surface missing decisions and turn them into testable conditions.',
  },
  {
    index: '02',
    title: 'Follow the data across layers',
    body: 'From the amount in the UI to the API payload and the stored record, I trace the same truth through every layer. A coherent screen can still conceal an incoherent transaction.',
  },
  {
    index: '03',
    title: 'Make risk visible',
    body: 'A reproducible defect, a blocked case and a reasoned release recommendation are more useful than a green dashboard built on incomplete checks. Calm releases come from clear evidence.',
  },
];

export function Manifesto() {
  const reduce = useReducedMotion();

  return (
    <section className="manifesto section" id="position" aria-labelledby="position-title">
      <div className="shell">
        <div className="section-head section-head--position">
          <Reveal className="section-head__meta">
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden="true" />
              001 / Position
            </p>
          </Reveal>
          <div className="section-head__main">
            <LineReveal>
              <h2 className="manifesto__title display" id="position-title">
                A release is a set of claims.
                <br />
                <em>My job is to test them.</em>
              </h2>
            </LineReveal>
          </div>
          <Reveal className="section-head__aside" delay={0.1}>
            <p>{siteConfig.intro}</p>
          </Reveal>
        </div>

        <div className="manifesto__content">
          <aside className="manifesto__portrait-note">
            <div className="manifesto__note-top">
              <span className="mono-label">Practice profile</span>
              <span className="manifesto__verified">
                <span className="signal-dot" aria-hidden="true" />
                Software quality
              </span>
            </div>
            <div className="manifesto__stat">
              <span className="manifesto__stat-value">{yearsTesting()}+</span>
              <span className="manifesto__stat-label">years in software quality, since {siteConfig.testingSince}</span>
            </div>
            <div className="manifesto__stat-rule" aria-hidden="true" />
            <dl className="manifesto__mini-list">
              <div>
                <dt>Domains</dt>
                <dd>SaaS / FinTech / AI</dd>
              </div>
              <div>
                <dt>Surfaces</dt>
                <dd>Web / mobile / REST APIs</dd>
              </div>
              <div>
                <dt>Method</dt>
                <dd>Risk-led, evidence-backed</dd>
              </div>
            </dl>
            <div className="manifesto__annotation">
              <Plus size={13} strokeWidth={1.4} aria-hidden="true" />
              <span>THE WORK IS IN THE EDGE CASES</span>
            </div>
          </aside>

          <div className="principles">
            <div className="principles__line" aria-hidden="true">
              <motion.span
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.25, ease: EASE_CINEMATIC }}
              />
            </div>
            {principles.map((principle, index) => (
              <Reveal key={principle.index} className="principle" delay={index * 0.05}>
                <span className="principle__index mono-label">{principle.index}</span>
                <div className="principle__body">
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
                <span className="principle__mark" aria-hidden="true">+</span>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="practice-split">
          <Reveal className="practice-split__col">
            <p className="mono-label">What I do</p>
            <ul>
              {whatIDo.map((item) => (
                <li key={item}>
                  <span className="practice-split__tick" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="practice-split__col" delay={0.08}>
            <p className="mono-label">How I work</p>
            <ol>
              {howIWork.map((item, index) => (
                <li key={item}>
                  <span className="practice-split__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
