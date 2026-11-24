import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, StaggerGroup, StaggerItem } from '../ui/Reveal';

const repoUrl = 'https://github.com/Mahmud9248/mpl-registration-qa';

const facts = [
  { value: '65', label: 'test cases' },
  { value: '121', label: 'automated checks' },
  { value: '08', label: 'real bugs found, 2 critical' },
];

// Every line is taken from the repository's README and docs; keep it that way.
const highlights = [
  {
    label: 'Concurrency',
    title: 'A registration race',
    copy: '7–8 of 10 simultaneous sign-ups failed with a 500. A threading barrier sends the requests together, so it reproduces every run.',
  },
  {
    label: 'Security',
    title: 'Stored XSS',
    copy: 'Script in the photo field ran on the public Players page and inside the admin console.',
  },
  {
    label: 'Test oracle',
    title: 'An independent scoring model',
    copy: 'The provisional tier is checked against a separate model of the rules, not against what the page shows.',
  },
  {
    label: 'Speed & stability',
    title: 'No sleeps',
    copy: 'A fake clock skips the 20-second assessment, and a recording mock backend injects 500s and network drops.',
  },
  {
    label: 'CI',
    title: 'Green until a bug is fixed',
    copy: 'GitHub Actions runs UI, API, end-to-end and accessibility layers in parallel, plus nightly Firefox and WebKit. Known bugs are strict xfails.',
  },
  {
    label: 'AI-assisted',
    title: 'Drafts, not oracles',
    copy: 'An LLM agent with Playwright MCP explores the app and drafts tests. I review every draft, and the repo records where the AI was wrong.',
  },
];

export function ProjectSection() {
  return (
    <section className="project-section section" id="automation" aria-labelledby="automation-title">
      <div className="shell">
        <SectionHeading
          index="003"
          eyebrow="Real project / automation"
          title={
            <>
              Automation that
              <br />
              <em>found real bugs.</em>
            </>
          }
          id="automation-title"
          copy={
            <p>
              Playwright and pytest automation for the player registration of a local cricket tournament site:
              UI, API, end-to-end and accessibility (axe-core). Unlike the case studies below, this is a real,
              public project.
            </p>
          }
        />

        <div className="experience-preview__facts">
          {facts.map((fact, index) => (
            <Reveal className="experience-fact" key={fact.label} delay={index * 0.05}>
              <span>{fact.value}</span>
              <p>{fact.label}</p>
            </Reveal>
          ))}
          <Reveal className="experience-fact experience-fact--note" delay={0.15}>
            <a className="project-section__repo" href={repoUrl} target="_blank" rel="noopener noreferrer">
              mpl-registration-qa
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <span className="mono-label">Python · pytest · Playwright · GitHub Actions</span>
          </Reveal>
        </div>

        <StaggerGroup className="project-highlights" stagger={0.06}>
          {highlights.map((item) => (
            <StaggerItem className="project-highlight" key={item.title}>
              <span className="mono-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
