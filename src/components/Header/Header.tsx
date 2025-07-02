import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
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
        <div 
          className={styles.logo}
          onClick={() => scrollToSection('home')}
          style={{ cursor: 'pointer' }}
        >
          <span className={styles.bracket}>{'<'}</span>
          <span className={styles.logoText}>WebStudio</span>
          <span className={styles.bracket}>{'/>'}</span>
        </div>

        {/* Навигация для десктопа */}
        <nav className={styles.nav}>
          <button 
            className={styles.navLink}
            onClick={() => scrollToSection('portfolio')}
          >
            Портфолио
          </button>
          <button 
            className={styles.navLink}
            onClick={() => scrollToSection('about')}
          >
            О нас
          </button>
          <button 
            className={styles.navLink}
            onClick={() => scrollToSection('blog')}
          >
            Блог
          </button>
          <button 
            className={styles.navLink}
            onClick={() => scrollToSection('contacts')}
          >
            Контакты
          </button>
        </nav>

        {/* Контакты и CTA */}
        <div className={styles.headerActions}>
          <a 
            href="https://t.me/your_username" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.telegramBtn}
          >
            <span>📱</span>
            Telegram
          </a>
          
          <button 
            className={styles.ctaBtn}
            onClick={() => scrollToSection('contacts')}
          >
            <span>🚀</span>
            Заказать проект
          </button>
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

      {/* Мобильная навигация */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <button 
          className={styles.mobileNavLink}
          onClick={() => scrollToSection('portfolio')}
        >
          💼 Портфолио
        </button>
        <button 
          className={styles.mobileNavLink}
          onClick={() => scrollToSection('about')}
        >
          👥 О нас
        </button>
        <button 
          className={styles.mobileNavLink}
          onClick={() => scrollToSection('blog')}
        >
          📚 Блог
        </button>
        <button 
          className={styles.mobileNavLink}
          onClick={() => scrollToSection('contacts')}
        >
          📞 Контакты
        </button>
        
        <div className={styles.mobileActions}>
          <a 
            href="https://t.me/your_username" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.mobileTelegramBtn}
          >
            📱 Telegram
          </a>
          <button 
            className={styles.mobileCtaBtn}
            onClick={() => scrollToSection('contacts')}
          >
            🚀 Заказать проект
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
