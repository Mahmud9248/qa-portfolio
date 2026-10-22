import { ArrowUpRight, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { artifacts, artifactCategories } from '../../data/artifacts';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, StaggerGroup, StaggerItem } from '../ui/Reveal';

const previewIds = ['ART-01', 'ART-03', 'ART-05', 'ART-06'];
const preview = previewIds
  .map((id) => artifacts.find((artifact) => artifact.id === id))
  .filter((artifact): artifact is NonNullable<typeof artifact> => Boolean(artifact));

export function ArtifactPreview() {
  const categoryCounts = artifactCategories
    .filter((category) => category !== 'All')
    .map((category) => ({
      label: category,
      count: artifacts.filter((artifact) => artifact.category === category).length,
    }));

  return (
    <section className="artifacts-preview section" id="artifacts" aria-labelledby="artifacts-title">
      <div className="shell">
        <SectionHeading
          index="005"
          eyebrow="QA artifact archive"
          title={
            <>
              The work behind
              <br />
              the <em>result.</em>
            </>
          }
          id="artifacts-title"
          copy={
            <p>
              Test plans, decision tables, defect reports, API examples and data checks. Open a file, inspect its
              structure and download a sample to use as a starting point.
            </p>
          }
          action={{ label: 'Open artifact library', href: '/qa-artifacts' }}
        />

        <div className="artifact-preview">
          <Reveal className="artifact-index-card">
            <div className="artifact-index-card__top">
              <span className="mono-label">Archive index</span>
              <FolderOpen size={18} strokeWidth={1.3} aria-hidden="true" />
            </div>
            <p className="artifact-index-card__count">10<span> artifacts</span></p>
            <p className="artifact-index-card__copy">
              A fictional QA workspace built to show how test thinking is documented and handed over.
            </p>
            <div className="artifact-index-card__categories">
              {categoryCounts.map((category) => (
                <div key={category.label}>
                  <span>{category.label}</span>
                  <span>{String(category.count).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
            <Link to="/qa-artifacts" className="artifact-index-card__action">
              <span>Browse all files</span>
              <span className="artifact-index-card__action-line" aria-hidden="true" />
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <div className="artifact-index-card__file-tag">QA_LIBRARY / DEMO_DATA</div>
          </Reveal>

          <StaggerGroup className="artifact-preview__files" stagger={0.07}>
            {preview.map((artifact) => (
              <StaggerItem key={artifact.id}>
                <Link className="artifact-file" to={`/qa-artifacts?artifact=${artifact.id}`}>
                  <div className="artifact-file__top">
                    <span>{artifact.id}</span>
                    <span>{artifact.format}</span>
                  </div>
                  <div className="artifact-file__rule" aria-hidden="true" />
                  <h3>{artifact.title}</h3>
                  <p>{artifact.summary}</p>
                  <div className="artifact-file__bottom">
                    <span>{artifact.category}</span>
                    <span className="artifact-file__arrow">
                      <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
