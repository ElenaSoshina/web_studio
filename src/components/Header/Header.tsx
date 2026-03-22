import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.bracket}>{'<'}</span>
          <span className={styles.logoText}>WebAp.dev</span>
          <span className={styles.bracket}>{'/>'}</span>
        </Link>

        <nav className={styles.nav}>
          <button
            className={styles.navLink}
            onClick={() => scrollToSection('portfolio')}
          >
            {t('navigation.portfolio')}
          </button>
          <button
            className={styles.navLink}
            onClick={() => scrollToSection('about')}
          >
            {t('navigation.about')}
          </button>
          <button
            className={styles.navLink}
            onClick={() => scrollToSection('blog')}
          >
            {t('navigation.blog')}
          </button>
          <button
            className={styles.navLink}
            onClick={() => scrollToSection('contacts')}
          >
            {t('navigation.contacts')}
          </button>
        </nav>

        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <button
            className={styles.ctaBtn}
            onClick={() => scrollToSection('contacts')}
          >
            <span>🚀</span>
            {t('buttons.orderProject')}
          </button>
        </div>

        <div className={styles.mobileHeaderRight}>
          <div className={styles.mobileLangSwitcher}>
            <LanguageSwitcher />
          </div>
          <button
            className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <button
          className={styles.mobileNavLink}
          onClick={() => scrollToSection('portfolio')}
        >
          💼 {t('navigation.portfolio')}
        </button>
        <button
          className={styles.mobileNavLink}
          onClick={() => scrollToSection('about')}
        >
          👥 {t('navigation.about')}
        </button>
        <button
          className={styles.mobileNavLink}
          onClick={() => scrollToSection('blog')}
        >
          📚 {t('navigation.blog')}
        </button>
        <button
          className={styles.mobileNavLink}
          onClick={() => scrollToSection('contacts')}
        >
          📞 {t('navigation.contacts')}
        </button>
        <div className={styles.mobileActions}>
          <button
            className={styles.mobileCtaBtn}
            onClick={() => scrollToSection('contacts')}
          >
            🚀 {t('buttons.orderProject')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
