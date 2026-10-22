import { lazy, Suspense, useEffect, useRef } from 'react';
import { MotionConfig } from 'motion/react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';

const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then((module) => ({ default: module.CaseStudiesPage })));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then((module) => ({ default: module.CaseStudyDetailPage })));
const ArtifactsPage = lazy(() => import('./pages/ArtifactsPage').then((module) => ({ default: module.ArtifactsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span className="mono-label">Loading record</span>
      <span className="route-fallback__rule" aria-hidden="true" />
    </div>
  );
}

function ScrollManager() {
  const location = useLocation();
  const initial = useRef(true);

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    if (initial.current) {
      initial.current = false;
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  }, [location.pathname, location.hash]);

  return null;
}

function AppShell() {
  const location = useLocation();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" className="site-main" tabIndex={-1} key={location.pathname}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/qa-artifacts" element={<ArtifactsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollManager />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AppShell />
      </MotionConfig>
    </BrowserRouter>
  );
}
