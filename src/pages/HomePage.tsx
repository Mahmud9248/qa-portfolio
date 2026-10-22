import { Hero } from '../components/home/Hero';
import { Manifesto } from '../components/home/Manifesto';
import { ExecutionLab } from '../components/home/ExecutionLab';
import { LifecycleSection } from '../components/home/LifecycleSection';
import { CaseStudiesPreview } from '../components/home/CaseStudiesPreview';
import { ArtifactPreview } from '../components/home/ArtifactPreview';
import { ToolsSection } from '../components/home/ToolsSection';
import { ExperiencePreview } from '../components/home/ExperiencePreview';
import { AchievementSection } from '../components/home/AchievementSection';
import { ContactCTA } from '../components/home/ContactCTA';
import { usePageMeta } from '../hooks/usePageMeta';
import { siteConfig } from '../data/site';

export function HomePage() {
  usePageMeta({
    title: 'Home',
    description: `${siteConfig.heroSupport} Explore original QA case studies and a fictional artifact library.`,
  });

  return (
    <>
      <Hero />
      <Manifesto />
      <ExecutionLab />
      <LifecycleSection />
      <CaseStudiesPreview />
      <ArtifactPreview />
      <ToolsSection />
      <ExperiencePreview />
      <AchievementSection />
      <ContactCTA />
    </>
  );
}
