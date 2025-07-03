import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const { t } = useTranslation('footer');
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const services = t('sections.services.items', { returnObjects: true }) as string[];
  const navigation = t('sections.navigation.items', { returnObjects: true }) as string[];
  const contacts = t('sections.contacts.items', { returnObjects: true }) as Array<{label: string, value: string}>;

  const serviceIds = ['about', 'about', 'quick-start', 'about'];
  const navigationIds = ['home', 'portfolio', 'about', 'blog', 'contacts'];
  const contactLinks = [
    'https://t.me/your_username',
    'mailto:hello@webstudio.ru', 
    'tel:+79991234567'
  ];

  return (
    <footer className={styles.footer}>
      {/* Анимированный фон */}
      <div className={styles.futuristicBackground}>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Основное содержимое футера */}
        <div className={styles.footerContent}>
          {/* Информация о компании */}
          <div className={styles.companySection}>
            <div className={styles.logo}>
              <span className={styles.bracket}>{'<'}</span>
              <span className={styles.logoText}>WebStudio</span>
              <span className={styles.bracket}>{'/>'}</span>
            </div>
            <p className={styles.companyDescription}>
              {t('company.description')}
            </p>
            <div className={styles.socialLinks}>
              <a href="https://t.me/your_username" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>📱</span>
              </a>
              <a href="mailto:hello@webstudio.ru" className={styles.socialLink}>
                <span>📧</span>
              </a>
              <a href="https://github.com/your_username" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>💻</span>
              </a>
            </div>
          </div>

          {/* Услуги */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>
              <span className={styles.titleIcon}>⚙️</span>
              {t('sections.services.title')}
            </h3>
            <ul className={styles.linksList}>
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    className={styles.footerLink}
                    onClick={() => scrollToSection(serviceIds[index])}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Навигация */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>
              <span className={styles.titleIcon}>🧭</span>
              {t('sections.navigation.title')}
            </h3>
            <ul className={styles.linksList}>
              {navigation.map((item, index) => (
                <li key={index}>
                  <button 
                    className={styles.footerLink}
                    onClick={() => scrollToSection(navigationIds[index])}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>
              <span className={styles.titleIcon}>📞</span>
              {t('sections.contacts.title')}
            </h3>
            <div className={styles.contactsList}>
              {contacts.map((contact, index) => (
                <div key={index} className={styles.contactItem}>
                  <span className={styles.contactIcon}>
                    {index === 0 ? '📱' : index === 1 ? '📧' : '📞'}
                  </span>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactLabel}>{contact.label}</div>
                    <a 
                      href={contactLinks[index]} 
                      className={styles.contactValue}
                      target={contactLinks[index].startsWith('http') ? '_blank' : undefined}
                      rel={contactLinks[index].startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Разделительная линия */}
        <div className={styles.footerDivider}></div>

        {/* Нижняя часть футера */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <span>© {currentYear} {t('bottom.copyright')}</span>
          </div>
          <div className={styles.bottomLinks}>
            {(t('bottom.links', { returnObjects: true }) as string[]).map((link, index) => (
              <button 
                key={index}
                className={styles.bottomLink} 
                onClick={() => scrollToSection('contacts')}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 