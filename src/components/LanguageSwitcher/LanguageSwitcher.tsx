import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ru', name: 'RU', flag: 'ru' },
    { code: 'en', name: 'EN', flag: 'en' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`${styles.langBtn} ${
            i18n.language === lang.code ? styles.active : ''
          }`}
          title={`Switch to ${lang.name}`}
        >
          <span className={styles.flag}>{lang.flag}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
