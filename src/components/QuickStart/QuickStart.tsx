import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './QuickStart.module.css';

interface Package {
  id: number;
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  category: 'starter' | 'business';
}

interface ClientType {
  icon: string;
  title: string;
  description: string;
  subtitle: string;
}

const QuickStart: React.FC = () => {
  const { t } = useTranslation('quickstart');
  const [activeTab, setActiveTab] = useState<'packages' | 'process'>('packages');

  const packages: Package[] = [
    {
      id: 1,
      title: t('packages.quickStart.title'),
      price: t('packages.quickStart.price'),
      category: 'starter',
      features: t('packages.quickStart.features', { returnObjects: true }) as string[]
    },
    {
      id: 2,
      title: t('packages.telegramBot.title'),
      price: t('packages.telegramBot.price'),
      category: 'business',
      highlighted: true,
      features: t('packages.telegramBot.features', { returnObjects: true }) as string[]
    }
  ];

  const clientTypes: ClientType[] = [
    {
      icon: '🚀',
      title: t('clientTypes.beginner.title'),
      subtitle: t('clientTypes.beginner.subtitle'),
      description: t('clientTypes.beginner.description')
    },
    {
      icon: '📈',
      title: t('clientTypes.developing.title'), 
      subtitle: t('clientTypes.developing.subtitle'),
      description: t('clientTypes.developing.description')
    },
    {
      icon: '🏢',
      title: t('clientTypes.growing.title'),
      subtitle: t('clientTypes.growing.subtitle'),
      description: t('clientTypes.growing.description')
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: t('process.steps.0.title'),
      description: t('process.steps.0.description'),
      icon: '🎨'
    },
    {
      step: '02', 
      title: t('process.steps.1.title'),
      description: t('process.steps.1.description'),
      icon: '⚙️'
    },
    {
      step: '03',
      title: t('process.steps.2.title'),
      description: t('process.steps.2.description'),
      icon: '📝'
    },
    {
      step: '04',
      title: t('process.steps.3.title'),
      description: t('process.steps.3.description'),
      icon: '🚀'
    }
  ];

  return (
    <section className={styles.quickStartSection} id="quick-start">
      {/* Анимированный фон как в других секциях */}
      <div className={styles.futuristicBackground}>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Заголовок секции в едином стиле */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.bracket}>{'<'}</span>
            <span className={styles.titleText}>{t('title')}</span>
            <span className={styles.bracket}>{'/>'}</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            {t('subtitle')}
          </p>
          <div className={styles.highlightBadge}>
            <span className={styles.badgeText}>{t('badge.text')}</span>
            <span className={styles.badgePrice}>{t('badge.price')}</span>
          </div>
        </div>

        {/* Табы */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'packages' ? styles.active : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            {t('tabs.packages')}
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'process' ? styles.active : ''}`}
            onClick={() => setActiveTab('process')}
          >
            {t('tabs.process')}
          </button>
        </div>

        {/* Контент табов */}
        {activeTab === 'packages' && (
          <div className={styles.packagesContent}>
            {/* Типы клиентов */}
            <div className={styles.clientTypes}>
              <h3 className={styles.subsectionTitle}>{t('clientTypes.subtitle')}</h3>
              <div className={styles.clientGrid}>
                {clientTypes.map((client, index) => (
                  <div key={index} className={styles.clientCard}>
                    <div className={styles.clientIcon}>{client.icon}</div>
                    <div className={styles.clientContent}>
                      <h4 className={styles.clientTitle}>{client.title}</h4>
                      <div className={styles.clientSubtitle}>{client.subtitle}</div>
                      <p className={styles.clientDescription}>{client.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Пакеты услуг */}
            <div className={styles.packagesGrid}>
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`${styles.packageCard} ${pkg.highlighted ? styles.highlighted : ''}`}
                >
                  {pkg.highlighted && (
                    <div className={styles.popularBadge}>
                      {t('packages.popular')}
                    </div>
                  )}
                  
                  <div className={styles.packageHeader}>
                    <h3 className={styles.packageTitle}>{pkg.title}</h3>
                    <div className={styles.packagePrice}>{pkg.price}</div>
                  </div>
                  
                  <div className={styles.packageFeatures}>
                    {pkg.features.map((feature, index) => (
                      <div key={index} className={styles.feature}>
                        <span className={styles.featureIcon}>✅</span>
                        <span className={styles.featureText}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={styles.packageBtn}>
                    <span>🚀</span>
                    {t('packages.orderButton')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className={styles.processContent}>
            <h3 className={styles.subsectionTitle}>{t('process.subtitle')}</h3>
            <div className={styles.processSteps}>
              {processSteps.map((step, index) => (
                <div key={index} className={styles.processStep}>
                  <div className={styles.stepNumber}>{step.step}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className={styles.stepConnector}></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className={styles.processFooter}>
              <div className={styles.guaranteeBox}>
                <div className={styles.guaranteeIcon}>⚡</div>
                <div className={styles.guaranteeText}>
                  <h4>{t('process.guarantee.title')}</h4>
                  <p>{t('process.guarantee.description')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickStart; 