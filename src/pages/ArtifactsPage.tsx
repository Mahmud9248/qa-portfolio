import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { artifacts, artifactCategories } from '../data/artifacts';
import type { ArtifactCategory } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { ArtifactCard } from '../components/artifacts/ArtifactCard';
import { ArtifactDialog } from '../components/artifacts/ArtifactDialog';
import { usePageMeta } from '../hooks/usePageMeta';
import { cx } from '../lib/cx';
import { demoDisclaimer } from '../data/site';

type Filter = 'All' | ArtifactCategory;

const filters: readonly Filter[] = artifactCategories;

export function ArtifactsPage() {
  usePageMeta({
    title: 'QA Artifacts',
    description:
      'Explore a fictional manual QA artifact library: test plans, decision tables, defect reports, API examples and SQL reconciliation queries by Abdullah Al Mahmud.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<Filter>('All');
  const [search, setSearch] = useState('');
  const reduce = useReducedMotion();

  const openId = searchParams.get('artifact');
  const selectedArtifact = artifacts.find((artifact) => artifact.id === openId) ?? null;

  const counts = useMemo(() => {
    return Object.fromEntries(
      filters.map((category) => [
        category,
        category === 'All'
          ? artifacts.length
          : artifacts.filter((artifact) => artifact.category === category).length,
      ]),
    ) as Record<Filter, number>;
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return artifacts.filter((artifact) => {
      const matchesCategory = filter === 'All' || artifact.category === filter;
      const haystack = [
        artifact.id,
        artifact.title,
        artifact.summary,
        artifact.category,
        artifact.format,
        ...artifact.tags,
      ]
        .join(' ')
        .toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });
  }, [filter, search]);

  function setParam(id: string | null, replace = true) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (id) next.set('artifact', id);
        else next.delete('artifact');
        return next;
      },
      { replace },
    );
  }

  function clearFilters() {
    setFilter('All');
    setSearch('');
  }

  return (
    <>
      <PageHero
        index="02"
        eyebrow="QA artifact archive"
        title={
          <>
            A working archive,
            <br />
            not a <em>showcase shelf.</em>
          </>
        }
        intro={
          <>
            <p>
              Ten original sample artifacts from the QA lifecycle: plans, decision tables, test cases, defect reports,
              API evidence and SQL reconciliation. Open a file, read the reasoning and download a Markdown copy.
            </p>
            <p className="small-note">Every system, record and result in this library is fictional.</p>
          </>
        }
        aside={
          <div className="library-summary">
            <div>
              <span className="mono-label">Archive</span>
              <strong>10</strong>
              <span>artifacts</span>
            </div>
            <div>
              <span className="mono-label">Disciplines</span>
              <strong>05</strong>
              <span>categories</span>
            </div>
            <div>
              <span className="mono-label">Linked dossiers</span>
              <strong>03</strong>
              <span>case studies</span>
            </div>
          </div>
        }
      />

      <section className="library-section" aria-labelledby="library-title">
        <div className="shell">
          <div className="library-intro">
            <div>
              <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Library index</p>
              <h2 id="library-title">Browse by discipline or search the evidence.</h2>
            </div>
            <div className="library-intro__aside">
              <p>
                These are starting points, not universal templates. The useful part is the reasoning: what was in
                scope, which risk shaped the cases, and what evidence supported the result.
              </p>
              <Link to="/case-studies" className="text-link">
                Read the case studies
                <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="library-toolbar">
            <div className="library-filters">
              <span className="library-toolbar__label" id="artifact-filter-label">
                <SlidersHorizontal size={14} strokeWidth={1.5} aria-hidden="true" />
                Filter
              </span>
              <div className="library-filter-list" role="group" aria-labelledby="artifact-filter-label">
                {filters.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={cx('library-filter', filter === category && 'is-active')}
                    aria-pressed={filter === category}
                    onClick={() => setFilter(category)}
                  >
                    <span>{category}</span>
                    <span className="library-filter__count">{String(counts[category]).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="library-search">
              <label htmlFor="artifact-search" className="library-toolbar__label">Search</label>
              <div className="library-search__field">
                <Search size={15} strokeWidth={1.5} aria-hidden="true" />
                <input
                  id="artifact-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Title, tag, format…"
                  autoComplete="off"
                />
                {search ? (
                  <button type="button" onClick={() => setSearch('')} aria-label="Clear search">
                    <X size={14} strokeWidth={1.6} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="library-results-bar">
            <p aria-live="polite">
              <span className="mono-label">Results</span>
              {String(filtered.length).padStart(2, '0')} of {String(artifacts.length).padStart(2, '0')} artifacts
            </p>
            <span className="library-results-bar__rule" aria-hidden="true" />
            <span className="mono-label">QA_LIBRARY / DEMO_DATA</span>
          </div>

          {filtered.length ? (
            <motion.div layout className="artifact-grid">
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((artifact) => (
                  <motion.div
                    layout
                    key={artifact.id}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.985 }}
                    transition={{ duration: reduce ? 0 : 0.28 }}
                  >
                    <ArtifactCard artifact={artifact} onOpen={(id) => setParam(id, true)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="library-empty">
              <span className="mono-label">No matching records</span>
              <h3>No artifacts match that combination.</h3>
              <p>Try a broader term, or reset the discipline filter and search query.</p>
              <button type="button" className="btn btn--secondary" onClick={clearFilters}>
                <span className="btn__label">Clear search &amp; filters</span>
              </button>
            </div>
          )}

          <div className="library-disclaimer">
            <span className="mono-label">Attribution / method</span>
            <p>{demoDisclaimer}</p>
          </div>
        </div>
      </section>

      <section className="library-cta">
        <div className="shell library-cta__inner">
          <div>
            <p className="eyebrow"><span className="eyebrow__mark" aria-hidden="true" />Read the reasoning</p>
            <h2>The artifact is the output. The case study is the decision trail.</h2>
          </div>
          <Link to="/case-studies" className="btn btn--primary">
            <span className="btn__label">Open case studies</span>
            <span className="btn__icon btn__arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.6} /></span>
          </Link>
        </div>
      </section>

      <ArtifactDialog
        artifacts={artifacts}
        artifact={selectedArtifact}
        onClose={() => setParam(null, true)}
        onNavigate={(id) => setParam(id, true)}
      />
    </>
  );
}
