import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { experience } from '../../data/experience';
import { cx } from '../../lib/cx';
import { CompanyLogo, type CompanyBrand } from '../ui/CompanyLogo';

const companyBrands: Record<string, CompanyBrand> = {
  WalletHub: 'wallethub',
  'Codemen Solutions Ltd.': 'codemen',
};

export function ExperienceTimeline({ detailed = false }: { detailed?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 78%', 'end 45%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  return (
    <div className={cx('timeline', detailed && 'timeline--detailed')} ref={trackRef}>
      <div className="timeline__axis" aria-hidden="true">
        <span className="timeline__axis-base" />
        <motion.span
          className="timeline__axis-fill"
          style={reduce ? { scaleY: 1 } : { scaleY: progress }}
        />
      </div>

      {experience.map((entry, entryIndex) => (
        <motion.article
          className="timeline-entry"
          key={entry.company}
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: entryIndex * 0.06 }}
        >
          <div className="timeline-entry__marker" aria-hidden="true">
            <span />
            <small>{String(entryIndex + 1).padStart(2, '0')}</small>
          </div>
          <div className="timeline-entry__top">
            <div className="timeline-entry__identity">
              <div className="timeline-entry__company">
                <h3>{entry.company}</h3>
                {companyBrands[entry.company] ? (
                  <CompanyLogo
                    brand={companyBrands[entry.company]}
                    className="timeline-entry__logo"
                    decorative
                  />
                ) : null}
              </div>
              {entry.parenthetical ? <span className="timeline-entry__parenthetical">{entry.parenthetical}</span> : null}
              <p>{entry.summary}</p>
            </div>
            <span className="timeline-entry__period">{entry.period}</span>
          </div>

          <div className="timeline-entry__roles">
            {entry.roles.map((role) => (
              <div className="timeline-role" key={`${entry.company}-${role.title}`}>
                <span className="timeline-role__bullet" aria-hidden="true" />
                <span className="timeline-role__title">{role.title}</span>
                <span className="timeline-role__period">{role.period}</span>
              </div>
            ))}
          </div>

          {detailed ? (
            <div className="timeline-entry__detail">
              <div>
                <span className="mono-label">Selected responsibilities</span>
                <ul className="timeline-entry__responsibilities">
                  {entry.responsibilities.map((responsibility) => (
                    <li key={responsibility}>
                      <span aria-hidden="true">↳</span>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="timeline-entry__meta">
                <span className="mono-label">Tools used</span>
                <ul className="tag-list">
                  {entry.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </motion.article>
      ))}
    </div>
  );
}
