import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site';
import { PageHero } from '../components/ui/PageHero';
import { CopyButton } from '../components/ui/CopyButton';
import { LinkedInMark } from '../components/ui/BrandIcons';
import { usePageMeta } from '../hooks/usePageMeta';

const conversationStarters = [
  'A manual QA role or product team that needs deliberate release validation.',
  'A complex workflow that needs clearer acceptance criteria and test conditions.',
  'An API, data or billing flow where the visible result and the stored truth may disagree.',
  'A QA process, artifact library or test strategy that needs a second perspective.',
];

const contactProtocol = [
  {
    index: '01',
    title: 'Name the product context',
    copy: 'A sentence about the product, platform or workflow is enough. It helps me understand the risk before the role title.',
  },
  {
    index: '02',
    title: 'Describe the problem or opportunity',
    copy: 'Hiring, a release concern, a QA process question or a specific edge case. Concrete beats broad.',
  },
  {
    index: '03',
    title: 'Use a direct channel',
    copy: 'Email is the most reliable route. LinkedIn works too. There is no form here collecting data in the background.',
  },
];

export function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description:
      'Contact Abdullah Al Mahmud, Manual QA Engineer in Dhaka, Bangladesh, by email or LinkedIn. Résumé available for download.',
  });

  return (
    <>
      <PageHero
        index="04"
        eyebrow="Contact / Open channel"
        title={
          <>
            A direct line.
            <br />
            No <em>queue.</em>
          </>
        }
        intro={
          <>
            <p>
              For QA roles, product teams or a conversation about release quality, write directly. Tell me what the
              product does, what is changing and where the uncertainty is.
            </p>
            <p className="small-note">No contact form, no tracking pixel, no auto-responder theatre.</p>
          </>
        }
        aside={
          <div className="contact-page__channels">
            <div className="contact-page__channels-head">
              <span className="mono-label">Direct channels</span>
              <span className="contact-page__state"><i aria-hidden="true" />Open</span>
            </div>
            <a href={`mailto:${siteConfig.email}`} className="contact-page__channel">
              <Mail size={16} strokeWidth={1.4} aria-hidden="true" />
              <span>
                <span className="mono-label">Email</span>
                <strong>{siteConfig.email}</strong>
              </span>
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="contact-page__channel"
            >
              <LinkedInMark />
              <span>
                <span className="mono-label">LinkedIn</span>
                <strong>{siteConfig.linkedinHandle}</strong>
              </span>
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <div className="contact-page__channel contact-page__channel--static">
              <MapPin size={16} strokeWidth={1.4} aria-hidden="true" />
              <span>
                <span className="mono-label">Location</span>
                <strong>{siteConfig.location}</strong>
              </span>
            </div>
          </div>
        }
      />

      <section className="contact-page section" aria-labelledby="contact-page-title">
        <div className="shell">
          <div className="contact-page__layout">
            <div className="contact-page__main">
              <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Start here</p>
              <h2 id="contact-page-title" className="display">
                Write about the thing
                <br />
                that needs <em>testing.</em>
              </h2>
              <p className="contact-page__lead">
                The best messages are specific: the product, the role or the quality question. I’ll reply from the same
                address you write to. No calendaring maze required.
              </p>

              <div className="contact-email-panel">
                <div className="contact-email-panel__top">
                  <span className="mono-label">Primary channel / email</span>
                  <CopyButton value={siteConfig.email} label="Copy email" copiedLabel="Email copied" />
                </div>
                <a href={`mailto:${siteConfig.email}`} className="contact-email-panel__address">
                  {siteConfig.email}
                  <ArrowUpRight size={24} strokeWidth={1.2} aria-hidden="true" />
                </a>
                <div className="contact-email-panel__actions">
                  <a className="btn btn--primary" href={`mailto:${siteConfig.email}`}>
                    <span className="btn__label">Open email client</span>
                    <span className="btn__icon" aria-hidden="true"><Mail size={16} strokeWidth={1.6} /></span>
                  </a>
                  <a
                    className="btn btn--secondary"
                    href={siteConfig.resumeUrl}
                    download={siteConfig.resumeFileName}
                  >
                    <span className="btn__label">Download résumé</span>
                    <span className="btn__icon" aria-hidden="true"><Download size={15} strokeWidth={1.6} /></span>
                  </a>
                </div>
              </div>

              <div className="contact-page__note">
                <span className="mono-label">Professional context</span>
                <p>
                  Manual QA engineer with 4+ years across SaaS, AI-driven and FinTech products. Currently based in
                  Dhaka, Bangladesh and experienced in distributed, English-speaking teams.
                </p>
                <Link to="/about" className="text-link">
                  Full experience & approach
                  <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="contact-page__side">
              <div className="contact-side-card">
                <div className="contact-side-card__head">
                  <span className="mono-label">Good reasons to write</span>
                  <span>01—04</span>
                </div>
                <ul>
                  {conversationStarters.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-side-card contact-side-card--protocol">
                <div className="contact-side-card__head">
                  <span className="mono-label">Contact protocol</span>
                  <span>03 steps</span>
                </div>
                <ol>
                  {contactProtocol.map((step) => (
                    <li key={step.index}>
                      <span className="mono-label">{step.index}</span>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="contact-side-details">
                <div>
                  <span className="mono-label">Location</span>
                  <span>{siteConfig.location}</span>
                </div>
                {siteConfig.phone.display ? (
                  <div>
                    <span className="mono-label">Phone</span>
                    <a href={`tel:${siteConfig.phone.value.replace(/\s/g, '')}`}>
                      <Phone size={13} strokeWidth={1.5} aria-hidden="true" />
                      {siteConfig.phone.value}
                    </a>
                  </div>
                ) : null}
                <div>
                  <span className="mono-label">Working language</span>
                  <span>English / Bengali</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-cta-slim">
        <div className="shell contact-cta-slim__inner">
          <div>
            <span className="mono-label">Prefer to inspect first?</span>
            <h2>The work is already public.</h2>
          </div>
          <div className="contact-cta-slim__links">
            <Link to="/case-studies">Case studies <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></Link>
            <Link to="/qa-artifacts">Artifact library <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></Link>
            <Link to="/about">Experience <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
