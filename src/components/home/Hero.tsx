import type { PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { ActionLink } from '../ui/Action';
import { siteConfig } from '../../data/site';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { EASE_CINEMATIC } from '../../lib/motion';

const titleLines = ['Quality isn’t', 'an assumption.', 'It’s tested.'];

export function Hero() {
  const reduce = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.5 });
  const imageX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const imageY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const interactive = Boolean(canHover && !reduce);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!interactive) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__gridline" aria-hidden="true" />
      <div className="shell hero__inner">
        <div className="hero__copy">
          <motion.div
            className="hero__eyebrow"
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_CINEMATIC, delay: 0.1 }}
          >
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden="true" />
              Manual QA / 4+ years
            </p>
            <span className="hero__eyebrow-role">SaaS · FinTech · AI</span>
          </motion.div>

          <h1 className="hero__title display" id="hero-title">
            {titleLines.map((line, index) => (
              <span className={`hero__line-mask${index === 2 ? ' hero__line-mask--accent' : ''}`} key={line}>
                <motion.span
                  className="hero__line"
                  initial={reduce ? false : { y: '108%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.92, ease: EASE_CINEMATIC, delay: 0.16 + index * 0.09 }}
                >
                  {index === 1 ? (
                    <>
                      an <em>assumption.</em>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hero__body"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_CINEMATIC, delay: 0.55 }}
          >
            <p className="hero__support">{siteConfig.heroSupport}</p>
            <div className="hero__actions">
              <ActionLink to="/case-studies" showArrow>
                Explore case studies
              </ActionLink>
              <ActionLink
                href={siteConfig.resumeUrl}
                download={siteConfig.resumeFileName}
                variant="secondary"
                icon={<Download size={15} strokeWidth={1.6} aria-hidden="true" />}
              >
                Download résumé
              </ActionLink>
            </div>
            <a className="hero__contact-link" href={`mailto:${siteConfig.email}`}>
              <span>Have a release that needs another set of eyes?</span>
              <span className="hero__contact-action">
                Start a conversation
                <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </span>
            </a>
          </motion.div>

          <motion.dl
            className="hero__facts"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div>
              <dt>Based in</dt>
              <dd>Dhaka, BD</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Manual QA</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>Tested, not assumed</dd>
            </div>
          </motion.dl>
        </div>

        <div className="hero__visual" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
          <motion.div
            className="hero__visual-offset"
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="hero__offset-label">REF / AAM-01</span>
            <span className="hero__offset-line" />
          </motion.div>

          <motion.div
            className="portrait-frame"
            initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.35 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={{ duration: 1.08, ease: EASE_CINEMATIC, delay: 0.24 }}
          >
            <div className="portrait-frame__topbar">
              <span>
                <i className="signal-dot" aria-hidden="true" />
                SUBJECT / PORTRAIT
              </span>
              <span>MANUAL QA</span>
              <span>01—04</span>
            </div>

            <div className="portrait-media">
              <motion.div
                className="portrait-media__image"
                style={interactive ? { x: imageX, y: imageY } : undefined}
              >
                <picture>
                  <source
                    type="image/avif"
                    srcSet="/images/profile-480.avif 480w, /images/profile-768.avif 768w, /images/profile-1080.avif 1080w, /images/profile-1536.avif 1536w"
                    sizes="(max-width: 900px) 92vw, 42vw"
                  />
                  <source
                    type="image/webp"
                    srcSet="/images/profile-480.webp 480w, /images/profile-768.webp 768w, /images/profile-1080.webp 1080w, /images/profile-1536.webp 1536w"
                    sizes="(max-width: 900px) 92vw, 42vw"
                  />
                  <img
                    src="/images/profile.jpg"
                    alt="Portrait of Abdullah Al Mahmud, a Manual QA Engineer, wearing a dark button-up shirt."
                    width={1536}
                    height={2048}
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </motion.div>
              <div className="portrait-media__vignette" aria-hidden="true" />
              <div className="portrait-media__scan" aria-hidden="true" />
              <div className="portrait-media__corner portrait-media__corner--tl" aria-hidden="true" />
              <div className="portrait-media__corner portrait-media__corner--br" aria-hidden="true" />
              <div className="portrait-media__stamp">
                <span>PERSON /</span>
                <strong>A.A.M.</strong>
              </div>
            </div>

            <div className="portrait-frame__footer">
              <div>
                <span className="mono-label">Professional identity</span>
                <strong>Abdullah Al Mahmud</strong>
              </div>
              <div className="portrait-frame__status">
                <span className="signal-dot" aria-hidden="true" />
                <span>Evidence-driven</span>
              </div>
              <span className="portrait-frame__code">23.81°N / 90.41°E</span>
            </div>

            <motion.span
              className="portrait-frame__trace"
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: EASE_CINEMATIC, delay: 0.7 }}
            />
          </motion.div>

          <motion.div
            className="hero__annotation hero__annotation--top"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.05, ease: EASE_CINEMATIC }}
          >
            <span className="hero__annotation-mark" aria-hidden="true">+</span>
            <span>QC / EVIDENCE OVER ASSUMPTION</span>
          </motion.div>
          <motion.div
            className="hero__annotation hero__annotation--bottom"
            initial={reduce ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE_CINEMATIC }}
          >
            <span>INPUT / OBSERVE / VERIFY</span>
            <span className="hero__annotation-line" aria-hidden="true" />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#position"
        className="hero__scroll"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.6 }}
      >
        <span className="hero__scroll-label">Scroll to inspect</span>
        <span className="hero__scroll-line" aria-hidden="true" />
        <ArrowDown size={13} strokeWidth={1.5} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
