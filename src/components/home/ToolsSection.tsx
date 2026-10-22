import { tools, toolGroups } from '../../data/tools';
import { skills } from '../../data/experience';
import { SectionHeading } from '../ui/SectionHeading';
import { ToolLogo } from '../ui/ToolLogo';
import { Reveal, StaggerGroup, StaggerItem } from '../ui/Reveal';

const groupIndex: Record<string, string> = {
  'Test management': 'A',
  'API & performance': 'B',
  'Data & observability': 'C',
};

export function ToolsSection() {
  return (
    <section className="tools-section section" id="toolkit" aria-labelledby="toolkit-title">
      <div className="shell">
        <SectionHeading
          index="006"
          eyebrow="Core toolkit"
          title={
            <>
              A deliberate stack,
              <br />
              not a logo <em>wall.</em>
            </>
          }
          id="toolkit-title"
          copy={
            <>
              <p>
                Every tool below is part of the manual QA practice described in the résumé: test management, API and
                performance validation, data checks and error monitoring.
              </p>
              <p className="small-note">Marks are shown in a unified monochrome treatment.</p>
            </>
          }
        />

        <div className="tool-groups">
          {toolGroups.map((group, index) => {
            const groupTools = tools.filter((tool) => tool.group === group);
            return (
              <Reveal className="tool-group" key={group}>
                <div className="tool-group__heading">
                  <span className="mono-label">0{index + 1} / {groupIndex[group]}</span>
                  <h3>{group}</h3>
                  <span className="tool-group__count">{String(groupTools.length).padStart(2, '0')} tools</span>
                </div>
                <StaggerGroup className="tool-grid" stagger={0.055}>
                  {groupTools.map((tool) => (
                    <StaggerItem key={tool.name}>
                      <div className="tool-tile">
                        <div className="tool-tile__top">
                          <ToolLogo tool={tool} />
                          <span className="tool-tile__signal" aria-hidden="true" />
                        </div>
                        <div className="tool-tile__copy">
                          <h4>{tool.name}</h4>
                          <p>{tool.descriptor}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </Reveal>
            );
          })}
        </div>

        <div className="skills-board">
          <Reveal className="skills-board__intro">
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden="true" />
              Capability map
            </p>
            <h3>How the tools turn into a test strategy.</h3>
            <p>
              Techniques are chosen from the risk in front of me: decision tables for rule-heavy logic, boundary data
              for thresholds, role matrices for permissions, and cross-layer checks for anything that moves money or
              state.
            </p>
            <div className="skills-board__footer">
              <span className="mono-label">Manual QA / continuous learning</span>
              <span className="skills-board__line" aria-hidden="true" />
            </div>
          </Reveal>
          <StaggerGroup className="skill-columns" stagger={0.08}>
            {skills.map((group) => (
              <StaggerItem className="skill-column" key={group.title}>
                <div className="skill-column__head">
                  <span className="mono-label">{group.title}</span>
                  <span className="skill-column__count">{String(group.items.length).padStart(2, '0')}</span>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
