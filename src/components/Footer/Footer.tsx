import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Веб-сайты', id: 'about' },
    { name: 'Telegram WebApp', id: 'about' },
    { name: 'Готовые решения', id: 'quick-start' },
    { name: 'Индивидуальные сервисы', id: 'about' }
  ];

  const navigation = [
    { name: 'Главная', id: 'home' },
    { name: 'Портфолио', id: 'portfolio' },
    { name: 'О нас', id: 'about' },
    { name: 'Блог', id: 'blog' },
    { name: 'Контакты', id: 'contacts' }
  ];

  const contacts = [
    { icon: '📱', label: 'Telegram', value: '@your_username', link: 'https://t.me/your_username' },
    { icon: '📧', label: 'Email', value: 'hello@webstudio.ru', link: 'mailto:hello@webstudio.ru' },
    { icon: '📞', label: 'Телефон', value: '+7 (999) 123-45-67', link: 'tel:+79991234567' }
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
              Создаем современные цифровые решения: веб-сайты, Telegram приложения и индивидуальные сервисы для развития вашего бизнеса.
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
              Услуги
            </h3>
            <ul className={styles.linksList}>
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    className={styles.footerLink}
                    onClick={() => scrollToSection(service.id)}
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Навигация */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>
              <span className={styles.titleIcon}>🧭</span>
              Навигация
            </h3>
            <ul className={styles.linksList}>
              {navigation.map((item, index) => (
                <li key={index}>
                  <button 
                    className={styles.footerLink}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>
              <span className={styles.titleIcon}>📞</span>
              Контакты
            </h3>
            <div className={styles.contactsList}>
              {contacts.map((contact, index) => (
                <div key={index} className={styles.contactItem}>
                  <span className={styles.contactIcon}>{contact.icon}</span>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactLabel}>{contact.label}</div>
                    <a 
                      href={contact.link} 
                      className={styles.contactValue}
                      target={contact.link.startsWith('http') ? '_blank' : undefined}
                      rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
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
            <span>© {currentYear} WebStudio.</span>
          </div>
          <div className={styles.bottomLinks}>
            <button className={styles.bottomLink} onClick={() => scrollToSection('contacts')}>
              Политика конфиденциальности
            </button>
            <button className={styles.bottomLink} onClick={() => scrollToSection('contacts')}>
              Пользовательское соглашение
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 