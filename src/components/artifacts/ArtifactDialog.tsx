import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Info,
  X,
} from 'lucide-react';
import type { Artifact, ArtifactTab } from '../../types';
import { caseStudies } from '../../data/caseStudies';
import { artifactToMarkdown, copyText, downloadText } from '../../lib/downloads';
import { cx } from '../../lib/cx';
import { ArtifactBlocks } from './ArtifactBlocks';

interface ArtifactDialogProps {
  artifacts: Artifact[];
  artifact: Artifact | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const tabs: { id: ArtifactTab; label: string }[] = [
  { id: 'document', label: 'Document' },
  { id: 'context', label: 'Context & use' },
];

export function ArtifactDialog({ artifacts, artifact, onClose, onNavigate }: ArtifactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const copiedTimer = useRef<number | null>(null);
  const [tab, setTab] = useState<ArtifactTab>('document');
  const [copied, setCopied] = useState(false);

  const index = artifact ? artifacts.findIndex((item) => item.id === artifact.id) : -1;
  const previous = index > 0 ? artifacts[index - 1] : null;
  const next = index >= 0 && index < artifacts.length - 1 ? artifacts[index + 1] : null;
  const relatedCase = artifact ? caseStudies.find((study) => study.slug === artifact.relatedCase) : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (artifact && !dialog.open) {
      dialog.showModal();
    }
    if (!artifact && dialog.open) {
      dialog.close();
    }
  }, [artifact]);

  useEffect(() => {
    setTab('document');
    setCopied(false);
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [artifact?.id]);

  useEffect(() => () => {
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
  }, []);

  async function copyDocument() {
    if (!artifact) return;
    const didCopy = await copyText(artifactToMarkdown(artifact));
    if (!didCopy) return;
    setCopied(true);
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    setTab(tabs[nextIndex].id);
    window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  }

  if (!artifact) {
    return (
      <dialog
        ref={dialogRef}
        className="artifact-dialog"
        aria-label="QA artifact inspector"
        onClose={onClose}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      />
    );
  }

  return (
    <dialog
      ref={dialogRef}
      className="artifact-dialog"
      aria-labelledby="artifact-dialog-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
    >
      <div className="artifact-dialog__shell">
        <header className="artifact-dialog__header">
          <div className="artifact-dialog__label-row">
            <span className="artifact-dialog__id">{artifact.id}</span>
            <span className="artifact-dialog__demo"><i aria-hidden="true" />Fictional demonstration</span>
            <span className="artifact-dialog__format">{artifact.format}</span>
            <button type="button" className="icon-button artifact-dialog__close" onClick={close} aria-label="Close artifact inspector">
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <h2 id="artifact-dialog-title">{artifact.title}</h2>
          <p>{artifact.summary}</p>
          <div className="artifact-dialog__meta">
            <span><strong>Category</strong>{artifact.category}</span>
            <span><strong>Updated</strong>{artifact.updated}</span>
            <span><strong>Related file</strong>{artifact.relatedCase.replaceAll('-', ' ')}</span>
            <span><strong>Source</strong>Portfolio sample</span>
          </div>
        </header>

        <div className="artifact-dialog__toolbar">
          <div className="artifact-dialog__tabs" role="tablist" aria-label="Artifact content">
            {tabs.map((item, tabIndex) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[tabIndex] = node;
                }}
                type="button"
                role="tab"
                id={`artifact-tab-${item.id}`}
                aria-controls="artifact-panel"
                aria-selected={tab === item.id}
                tabIndex={tab === item.id ? 0 : -1}
                className={cx('artifact-dialog__tab', tab === item.id && 'is-active')}
                onClick={() => setTab(item.id)}
                onKeyDown={(event) => handleTabKeyDown(event, tabIndex)}
              >
                {item.id === 'document' ? <FileText size={14} strokeWidth={1.5} aria-hidden="true" /> : <Info size={14} strokeWidth={1.5} aria-hidden="true" />}
                {item.label}
              </button>
            ))}
          </div>
          <div className="artifact-dialog__actions">
            <button
              type="button"
              className="artifact-dialog__action"
              aria-label={copied ? 'Artifact Markdown copied' : 'Copy artifact as Markdown'}
              onClick={copyDocument}
            >
              {copied ? <Check size={14} strokeWidth={1.8} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.6} aria-hidden="true" />}
              <span>{copied ? 'Copied' : 'Copy .md'}</span>
            </button>
            <button
              type="button"
              className="artifact-dialog__action"
              aria-label="Download artifact as Markdown"
              onClick={() => downloadText(artifact.downloadName, artifactToMarkdown(artifact))}
            >
              <Download size={14} strokeWidth={1.6} aria-hidden="true" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="artifact-dialog__scroll"
          id="artifact-panel"
          role="tabpanel"
          aria-labelledby={`artifact-tab-${tab}`}
          tabIndex={0}
        >
          {tab === 'document' ? (
            <div className="artifact-dialog__document">
              <ArtifactBlocks blocks={artifact.blocks} />
            </div>
          ) : (
            <div className="artifact-dialog__context">
              <section>
                <span className="mono-label">Purpose</span>
                <p>{artifact.purpose}</p>
              </section>
              <section>
                <span className="mono-label">How I would use it</span>
                <ul>
                  {artifact.howToUse.map((item) => (
                    <li key={item}><span aria-hidden="true">↳</span>{item}</li>
                  ))}
                </ul>
              </section>
              <section className="artifact-dialog__tags">
                <span className="mono-label">Tags</span>
                <ul className="tag-list">
                  {artifact.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </section>
              {relatedCase ? (
                <Link
                  to={`/case-studies/${relatedCase.slug}`}
                  className="artifact-dialog__related"
                  onClick={close}
                >
                  <span>
                    <span className="mono-label">Related case study / {relatedCase.number}</span>
                    <strong>{relatedCase.shortTitle}</strong>
                  </span>
                  <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              ) : null}
              <p className="artifact-dialog__context-note">
                This artifact is an original portfolio sample. Adapt scope, terminology and acceptance criteria to the
                actual product before using it in a real release.
              </p>
            </div>
          )}
        </div>

        <footer className="artifact-dialog__footer">
          <div className="artifact-dialog__pager">
            <button
              type="button"
              onClick={() => previous && onNavigate(previous.id)}
              disabled={!previous}
              aria-label={previous ? `Previous artifact: ${previous.title}` : 'No previous artifact'}
            >
              <ArrowLeft size={14} strokeWidth={1.6} aria-hidden="true" />
              Previous
            </button>
            <span className="artifact-dialog__counter">
              {String(index + 1).padStart(2, '0')} / {String(artifacts.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => next && onNavigate(next.id)}
              disabled={!next}
              aria-label={next ? `Next artifact: ${next.title}` : 'No next artifact'}
            >
              Next
              <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
          <span className="artifact-dialog__footer-note">QA_LIBRARY / DEMO_DATA</span>
        </footer>
      </div>
    </dialog>
  );
}
