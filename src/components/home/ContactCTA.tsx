import { ArrowUpRight, Download, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { ActionLink } from '../ui/Action';
import { CopyButton } from '../ui/CopyButton';
import { LinkedInMark } from '../ui/BrandIcons';
import { LineReveal, Reveal } from '../ui/Reveal';

export function ContactCTA() {
  return (
    <section className="contact-cta section" id="contact" aria-labelledby="contact-title">
      <div className="contact-cta__ambient" aria-hidden="true" />
      <div className="shell">
        <div className="contact-cta__top">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden="true" />
              009 / Open channel
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="contact-cta__meta">QA roles · Product teams · Quality conversations</p>
          </Reveal>
        </div>

        <div className="contact-cta__layout">
          <div className="contact-cta__main">
            <LineReveal>
              <h2 className="contact-cta__title display" id="contact-title">
                Let’s make quality
                <br />
                <em>visible.</em>
              </h2>
            </LineReveal>
            <Reveal delay={0.1}>
              <p className="contact-cta__copy">
                If you need a manual QA engineer who reads the requirement, follows the data and leaves behind evidence
                the whole team can use, start a conversation.
              </p>
              <div className="contact-cta__actions">
                <ActionLink href={`mailto:${siteConfig.email}`} showArrow>
                  Email Abdullah
                </ActionLink>
                <ActionLink href={siteConfig.resumeUrl} download={siteConfig.resumeFileName} variant="secondary" icon={<Download size={15} strokeWidth={1.6} aria-hidden="true" />}>
                  Résumé / PDF
                </ActionLink>
              </div>
            </Reveal>
          </div>

          <Reveal className="contact-terminal" delay={0.14}>
            <div className="contact-terminal__bar">
              <span className="mono-label">Direct channels</span>
              <span className="contact-terminal__status">
                <span className="signal-dot" aria-hidden="true" />
                Open
              </span>
            </div>
            <div className="contact-terminal__email">
              <span className="mono-label">Primary / email</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <CopyButton value={siteConfig.email} label="Copy email" />
            </div>
            <div className="contact-terminal__rows">
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer noopener" className="contact-terminal__row">
                <span className="contact-terminal__row-label">
                  <LinkedInMark />
                  LinkedIn
                </span>
                <span className="contact-terminal__row-value">
                  {siteConfig.linkedinHandle}
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </a>
              <a href={siteConfig.resumeUrl} download={siteConfig.resumeFileName} className="contact-terminal__row">
                <span className="contact-terminal__row-label">
                  <Download size={14} strokeWidth={1.5} aria-hidden="true" />
                  Résumé
                </span>
                <span className="contact-terminal__row-value">
                  PDF / download
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </a>
              <div className="contact-terminal__row">
                <span className="contact-terminal__row-label">
                  <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                  Location
                </span>
                <span className="contact-terminal__row-value">{siteConfig.location}</span>
              </div>
            </div>
            <div className="contact-terminal__footer">
              <span>NO FORM. NO QUEUE.</span>
              <Link to="/contact">
                Contact details
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
