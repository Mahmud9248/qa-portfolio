import { Hero } from '../components/home/Hero';
import { Manifesto } from '../components/home/Manifesto';
import { ExecutionLab } from '../components/home/ExecutionLab';
import { LifecycleSection } from '../components/home/LifecycleSection';
import { CaseStudiesPreview } from '../components/home/CaseStudiesPreview';
import { ArtifactPreview } from '../components/home/ArtifactPreview';
import { ToolsSection } from '../components/home/ToolsSection';
import { ExperiencePreview } from '../components/home/ExperiencePreview';
import { ProjectSection } from '../components/home/ProjectSection';
import { ContactCTA } from '../components/home/ContactCTA';
import { usePageMeta } from '../hooks/usePageMeta';
import { siteConfig } from '../data/site';

export function HomePage() {
  usePageMeta({
    title: 'Home',
    description: `${siteConfig.heroSupport} ${siteConfig.status.open ? `${siteConfig.status.label}.` : ''}`,
    socialDescription: 'Software QA across SaaS, AI-powered and FinTech products — open to QA roles.',
  });

  return (
    <>
      <Hero />
      <Manifesto />
      <ExperiencePreview />
      <ProjectSection />
      <CaseStudiesPreview />
      <ExecutionLab />
      <LifecycleSection />
      <ArtifactPreview />
      <ToolsSection />
      <ContactCTA />
    </>
  );
}
