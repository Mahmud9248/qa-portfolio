import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Menu, X, ArrowUpRight, Download, Mail } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigation, siteConfig } from '../../data/site';
import { Brand, BrandMark } from './Brand';
import { EASE_CINEMATIC } from '../../lib/motion';
import { cx } from '../../lib/cx';

function DesktopNav() {
  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navigation.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === '/'}
          className={({ isActive }) => cx('desktop-nav__link', isActive && 'is-active')}
        >
          {({ isActive }) => (
            <>
              <span className="desktop-nav__index" aria-hidden="true">{item.index}</span>
              <span>{item.label}</span>
              {isActive ? (
                <motion.span
                  layoutId="nav-active-line"
                  className="desktop-nav__active"
                  transition={{ duration: 0.35, ease: EASE_CINEMATIC }}
                  aria-hidden="true"
                />
              ) : null}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (open) return;
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }, [location.pathname, open]);

  return (
    <dialog
      ref={dialogRef}
      className="mobile-menu"
      aria-labelledby="mobile-menu-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="mobile-menu__inner">
        <div className="mobile-menu__top">
          <div className="mobile-menu__brand">
            <BrandMark className="brand__mark" />
            <div>
              <span className="mono-label">Navigation</span>
              <span id="mobile-menu-title" className="mobile-menu__name">{siteConfig.shortName}</span>
            </div>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close navigation menu">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {navigation.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE_CINEMATIC }}
            >
              <NavLink
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) => cx('mobile-menu__link', isActive && 'is-active')}
                onClick={onClose}
              >
                <span className="mobile-menu__link-index">{item.index}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={20} strokeWidth={1.4} aria-hidden="true" />
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="mobile-menu__footer">
          <p className="mono-label">Direct</p>
          <a className="mobile-menu__contact" href={`mailto:${siteConfig.email}`}>
            <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a className="mobile-menu__contact" href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
            <Download size={16} strokeWidth={1.5} aria-hidden="true" />
            Download résumé
          </a>
          <div className="mobile-menu__meta">
            <span>{siteConfig.location}</span>
            <span>Portfolio / {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      menuWasOpen.current = true;
      return;
    }
    if (!menuWasOpen.current) return;
    menuWasOpen.current = false;
    window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cx('site-header', scrolled && 'is-scrolled')}
        initial={reduce ? false : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.05 }}
      >
        <div className="site-header__inner">
          <Brand />
          <DesktopNav />
          <div className="site-header__actions">
            <span className="header-location">
              <span className="header-location__signal" aria-hidden="true" />
              Dhaka, BD
            </span>
            <a className="header-resume" href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
              <span>Résumé</span>
              <Download size={14} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-trigger"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen(true)}
            >
              <span>Menu</span>
              <Menu size={20} strokeWidth={1.4} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>
      <div id="mobile-navigation">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
