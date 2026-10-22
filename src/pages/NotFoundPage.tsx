import { ArrowLeft, ArrowUpRight, Compass, FileQuestion } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../data/site';
import { PageHero } from '../components/ui/PageHero';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFoundPage() {
  const location = useLocation();

  usePageMeta({
    title: 'Page Not Found',
    description: 'The requested page could not be found in Abdullah Al Mahmud’s QA portfolio.',
    noIndex: true,
  });

  return (
    <div className="not-found">
      <PageHero
        index="404"
        eyebrow="Record not found"
        title={
          <>
            No matching
            <br />
            <em>record.</em>
          </>
        }
        intro={
          <>
            <p>
              The requested route does not exist, or the evidence moved. That is a valid test result: the expected
              resource was not present.
            </p>
            <p className="small-note">Check the URL, or use one of the verified paths below.</p>
          </>
        }
        aside={
          <div className="not-found__terminal" role="status">
            <div className="not-found__terminal-head">
              <span className="mono-label">Request / response</span>
              <span className="status-code status-code--4xx">404</span>
            </div>
            <div className="not-found__terminal-code">
              <p><span>GET</span> {location.pathname}</p>
              <p className="is-response">← 404 Not Found</p>
              <p className="is-muted">content: no matching route</p>
            </div>
            <div className="not-found__terminal-foot">
              <FileQuestion size={14} strokeWidth={1.5} aria-hidden="true" />
              <span>No page component matched this path.</span>
            </div>
          </div>
        }
      />

      <section className="not-found__body">
        <div className="shell">
          <div className="not-found__layout">
            <div className="not-found__primary">
              <span className="mono-label">Verified routes</span>
              <nav aria-label="Helpful routes">
                {navigation.map((item) => (
                  <Link to={item.href} key={item.href}>
                    <span>{item.index}</span>
                    {item.label}
                    <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </div>
            <div className="not-found__secondary">
              <Compass size={20} strokeWidth={1.3} aria-hidden="true" />
              <p>
                Looking for a specific QA artifact? Open the library and use the search or category filters. Deep links
                use the format <code>/qa-artifacts?artifact=ART-01</code>.
              </p>
              <Link to="/qa-artifacts" className="text-link">
                Open artifact library
                <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <Link to="/" className="not-found__home">
            <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" />
            Return to the index
          </Link>
        </div>
      </section>
    </div>
  );
}
