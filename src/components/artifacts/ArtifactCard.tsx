import { Braces, Bug, ClipboardCheck, Database, FileSpreadsheet, FileText } from 'lucide-react';
import type { Artifact } from '../../types';
import { cx } from '../../lib/cx';

const categoryIcons: Record<Artifact['category'], typeof FileText> = {
  Planning: ClipboardCheck,
  'Test design': FileSpreadsheet,
  Execution: ClipboardCheck,
  Defects: Bug,
  'API & data': Braces,
};

const categoryModifier: Record<Artifact['category'], string> = {
  Planning: 'planning',
  'Test design': 'design',
  Execution: 'execution',
  Defects: 'defects',
  'API & data': 'api',
};

const dataIcon = Database;

export function ArtifactCard({ artifact, onOpen }: { artifact: Artifact; onOpen: (id: string) => void }) {
  const Icon = artifact.category === 'API & data' ? dataIcon : categoryIcons[artifact.category];

  return (
    <article className={cx('artifact-card', `artifact-card--${categoryModifier[artifact.category]}`)}>
      <button
        type="button"
        className="artifact-card__trigger"
        onClick={() => onOpen(artifact.id)}
        aria-label={`Inspect artifact ${artifact.id}: ${artifact.title}`}
      />
      <div className="artifact-card__top">
        <span className="artifact-card__id">{artifact.id}</span>
        <span className="artifact-card__format">{artifact.format}</span>
        <Icon size={18} strokeWidth={1.2} aria-hidden="true" />
      </div>
      <div className="artifact-card__preview" aria-hidden="true">
        <span className="artifact-card__preview-line is-wide" />
        <span className="artifact-card__preview-line" />
        <span className="artifact-card__preview-line is-short" />
        <span className="artifact-card__preview-block" />
        <span className="artifact-card__preview-line is-medium" />
      </div>
      <div className="artifact-card__copy">
        <span className="mono-label">{artifact.category}</span>
        <h3>{artifact.title}</h3>
        <p>{artifact.summary}</p>
      </div>
      <div className="artifact-card__footer">
        <span className="artifact-card__tags">{artifact.tags.slice(0, 2).join(' / ')}</span>
        <span className="artifact-card__open">
          Inspect
          <span aria-hidden="true">↗</span>
        </span>
      </div>
    </article>
  );
}
