import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './CreateSiteSection.module.css';

const CreateSiteSection: React.FC = () => {
  const { t } = useTranslation('tenant');
  const navigate = useNavigate();
  const requirements = t('section.requirements', { returnObjects: true }) as string[];

  return (
    <section id="create-site" className={styles.createSiteSection}>
      <div className={styles.futuristicBackground}>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.bracket}>{'<'}</span>
            <span className={styles.titleText}>{t('section.heading')}</span>
            <span className={styles.bracket}>{'/>'}</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            {t('section.subtitle')}
          </p>
        </div>

        <div className={styles.onboardingCard}>
          <div className={styles.content}>
            <p className={styles.badge}>{t('section.badge')}</p>
            <h3 className={styles.title}>{t('section.cardTitle')}</h3>
            <ul className={styles.requirements}>
              {requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <p className={styles.actionsText}>{t('section.actionHint')}</p>
            <button className={styles.ctaButton} onClick={() => navigate('/create-site')}>
              {t('section.actionButton')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateSiteSection;
