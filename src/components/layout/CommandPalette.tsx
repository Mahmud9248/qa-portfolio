import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Copy, Download, FileText, FolderOpen, Hash, Search } from 'lucide-react';
import { navigation, siteConfig } from '../../data/site';
import { caseStudies } from '../../data/caseStudies';
import { artifacts } from '../../data/artifacts';
import { copyText } from '../../lib/downloads';

type Item = {
  id: string;
  group: 'Pages' | 'Case studies' | 'Artifacts' | 'Actions';
  label: string;
  hint?: string;
  icon: 'page' | 'case' | 'file' | 'copy' | 'download' | 'external';
  run: () => void;
};

const ICONS = {
  page: Hash,
  case: FolderOpen,
  file: FileText,
  copy: Copy,
  download: Download,
  external: ArrowUpRight,
};

/** ⌘K quick-jump: every page, case study and artifact, plus a few actions. Loaded lazily on first open. */
export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState('');

  const items = useMemo<Item[]>(() => {
    const go = (to: string) => () => {
      navigate(to);
      onClose();
    };
    return [
      ...navigation.map((n) => ({ id: `p-${n.href}`, group: 'Pages' as const, label: n.label, hint: n.index, icon: 'page' as const, run: go(n.href) })),
      ...caseStudies.map((c, i) => ({
        id: `c-${c.slug}`,
        group: 'Case studies' as const,
        label: c.shortTitle,
        hint: `Case ${String(i + 1).padStart(2, '0')} · ${c.domain}`,
        icon: 'case' as const,
        run: go(`/case-studies/${c.slug}`),
      })),
      ...artifacts.map((a) => ({
        id: `a-${a.id}`,
        group: 'Artifacts' as const,
        label: a.title,
        hint: `${a.id} · ${a.category}`,
        icon: 'file' as const,
        run: go(`/qa-artifacts?artifact=${a.id}`),
      })),
      {
        id: 'x-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: siteConfig.email,
        icon: 'copy',
        run: () => {
          void copyText(siteConfig.email).then((ok) => setNotice(ok ? 'Email copied' : 'Copy unavailable'));
        },
      },
      {
        id: 'x-resume',
        group: 'Actions',
        label: 'Download résumé',
        hint: 'PDF',
        icon: 'download',
        run: () => {
          const a = document.createElement('a');
          a.href = siteConfig.resumeUrl;
          a.download = siteConfig.resumeFileName;
          a.click();
          onClose();
        },
      },
      {
        id: 'x-linkedin',
        group: 'Actions',
        label: 'Open LinkedIn',
        hint: siteConfig.linkedinHandle,
        icon: 'external',
        run: () => {
          window.open(siteConfig.linkedin, '_blank', 'noopener');
          onClose();
        },
      },
      {
        id: 'x-studio',
        group: 'Actions',
        label: `Visit ${siteConfig.studio.name}`,
        hint: 'design & build studio',
        icon: 'external',
        run: () => {
          window.open(siteConfig.studio.url, '_blank', 'noopener');
          onClose();
        },
      },
    ];
  }, [navigate, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ''} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    inputRef.current?.focus();
  }, []);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    document.getElementById(`cmd-${filtered[active]?.id}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, filtered]);

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      filtered[active]?.run();
    }
  }

  let lastGroup = '';
  return (
    <dialog
      ref={dialogRef}
      className="cmdk"
      aria-label="Quick jump"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="cmdk__panel">
        <div className="cmdk__search">
          <Search size={16} strokeWidth={1.5} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a page, case study or artifact…"
            aria-label="Search pages, case studies and artifacts"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="cmdk__list" id="cmdk-list" role="listbox">
          {filtered.length === 0 ? <li className="cmdk__empty">No matching record. That’s a valid test result.</li> : null}
          {filtered.map((item, index) => {
            const Icon = ICONS[item.icon];
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.id} role="presentation">
                {header ? <p className="cmdk__group mono-label">{header}</p> : null}
                <button
                  type="button"
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={index === active}
                  className={index === active ? 'cmdk__item is-active' : 'cmdk__item'}
                  onMouseMove={() => setActive(index)}
                  onClick={item.run}
                >
                  <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
                  <span className="cmdk__label">{item.label}</span>
                  {item.hint ? <span className="cmdk__hint">{item.hint}</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="cmdk__foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>↵</kbd> open</span>
          <span className="cmdk__notice" aria-live="polite">{notice}</span>
        </div>
      </div>
    </dialog>
  );
}
