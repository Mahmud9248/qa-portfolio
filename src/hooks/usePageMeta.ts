import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  socialDescription?: string;
  noIndex?: boolean;
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, value: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

function setLink(rel: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export function usePageMeta({ title, description, socialDescription = description, noIndex = false }: PageMeta): void {
  useEffect(() => {
    const fullTitle = title === 'Home' ? 'Abdullah Al Mahmud — Manual QA Engineer' : `${title} — Abdullah Al Mahmud`;
    const absoluteUrl = `${window.location.origin}${window.location.pathname}`;
    const socialImage = `${window.location.origin}/images/og-image.png`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', socialDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', absoluteUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', socialImage);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', socialDescription);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', socialImage);
    setMeta('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setLink('canonical', absoluteUrl);
  }, [title, description, socialDescription, noIndex]);
}
