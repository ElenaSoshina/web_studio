import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';
import { useTenantBranding } from '../../context/TenantBrandingContext';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const { branding } = useTenantBranding();
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
        {/* Логотип */}
        <Link to="/" className={styles.logo}>
          {branding?.logoUrl ? <img src={branding.logoUrl} alt="Tenant logo" className={styles.logoImage} /> : null}
          <span className={styles.bracket}>{'<'}</span>
          <span className={styles.logoText}>{branding?.name || 'WebAp.dev'}</span>
          <span className={styles.bracket}>{'/>'}</span>
        </Link>

        {/* Навигация для десктопа */}
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
          <Link className={styles.navLink} to="/create-site">
            {t('navigation.createSite')}
          </Link>
        </nav>

        {/* Контакты и CTA для десктопа */}
        <div className={styles.headerActions}>
          {/* Переключатель языка */}
          <LanguageSwitcher />
          
          <a 
            href="https://t.me/soshina_elena" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.telegramBtn}
          >
            <span>📱</span>
            {t('buttons.telegram')}
          </a>
          
          <button 
            className={styles.ctaBtn}
            onClick={() => scrollToSection('contacts')}
          >
            <span>🚀</span>
            {t('buttons.orderProject')}
          </button>
        </div>

        {/* Мобильные элементы справа */}
        <div className={styles.mobileHeaderRight}>
          {/* Переключатель языка для мобильной версии */}
          <div className={styles.mobileLangSwitcher}>
            <LanguageSwitcher />
          </div>
          
          {/* Мобильное меню */}
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

      {/* Мобильная навигация */}
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
          <a 
            href="https://t.me/soshina_elena" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.mobileTelegramBtn}
          >
            📱 {t('buttons.telegram')}
          </a>
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
