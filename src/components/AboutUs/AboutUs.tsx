import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AboutUs.module.css';

interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  process: string[];
}

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

const AboutUs: React.FC = () => {
  const { t } = useTranslation('about');
  const [activeService, setActiveService] = useState<string>('websites');

  const services: Service[] = [
    {
      id: 'websites',
      title: t('services.websites.title'),
      icon: '🌐',
      description: t('services.websites.description'),
      features: t('services.websites.features', { returnObjects: true }) as string[],
      process: t('services.websites.process', { returnObjects: true }) as string[]
    },
    {
      id: 'telegram',
      title: t('services.telegram.title'),
      icon: '🤖',
      description: t('services.telegram.description'),
      features: t('services.telegram.features', { returnObjects: true }) as string[],
      process: t('services.telegram.process', { returnObjects: true }) as string[]
    },
    {
      id: 'services',
      title: t('services.services.title'),
      icon: '⚙️',
      description: t('services.services.description'),
      features: t('services.services.features', { returnObjects: true }) as string[],
      process: t('services.services.process', { returnObjects: true }) as string[]
    }
  ];

  const advantages: Advantage[] = [
    {
      icon: '🎯',
      title: 'Фокус на результате',
      description: 'Создаем решения, которые реально работают на ваш бизнес и приносят измеримую пользу'
    },
    {
      icon: '⚡',
      title: 'Современные технологии',
      description: 'Используем только проверенные и актуальные технологии для максимальной производительности'
    },
    {
      icon: '🛡️',
      title: 'Надежность и качество',
      description: 'Все наши решения тщательно тестируются и готовы к стабильной работе'
    },
    {
      icon: '📞',
      title: 'Поддержка проектов',
      description: 'Обеспечиваем техническую поддержку и помощь в развитии проектов после запуска'
    }
  ];

  const workProcess = [
    {
      step: '01',
      title: t('workProcess.0.title'),
      description: t('workProcess.0.description'),
      icon: '🔍'
    },
    {
      step: '02',
      title: t('workProcess.1.title'),
      description: t('workProcess.1.description'),
      icon: '📐'
    },
    {
      step: '03',
      title: t('workProcess.2.title'),
      description: t('workProcess.2.description'),
      icon: '⌨️'
    },
    {
      step: '04',
      title: t('workProcess.3.title'),
      description: t('workProcess.3.description'),
      icon: '🧪'
    },
    {
      step: '05',
      title: t('workProcess.4.title'),
      description: t('workProcess.4.description'),
      icon: '🚀'
    }
  ];

  return (
    <section className={styles.aboutSection} id="about">
      {/* Анимированный фон */}
      <div className={styles.futuristicBackground}>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Заголовок секции */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.bracket}>{'<'}</span>
            <span className={styles.titleText}>{t('title')}</span>
            <span className={styles.bracket}>{'/>'}</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            {t('subtitle')}
          </p>
        </div>

        {/* Наши услуги */}
        <div className={styles.servicesSection}>
          <h3 className={styles.subsectionTitle}>{t('whatWeCreate')}</h3>
          
          {/* Табы услуг */}
          <div className={styles.serviceTabs}>
            {services.map((service) => (
              <button
                key={service.id}
                className={`${styles.serviceTab} ${activeService === service.id ? styles.active : ''}`}
                onClick={() => setActiveService(service.id)}
              >
                <span className={styles.tabIcon}>{service.icon}</span>
                {service.title}
              </button>
            ))}
          </div>

          {/* Контент активной услуги */}
          {services.map((service) => (
            activeService === service.id && (
              <div key={service.id} className={styles.serviceContent}>
                <div className={styles.serviceMain}>
                  <div className={styles.serviceInfo}>
                    <div className={styles.serviceDescription}>
                      <h4>{service.description}</h4>
                    </div>
                    
                    <div className={styles.serviceFeatures}>
                      <h5>{t('features')}</h5>
                      <div className={styles.featuresList}>
                        {service.features.map((feature, index) => (
                          <div key={index} className={styles.feature}>
                            <span className={styles.featureIcon}>✅</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.serviceProcess}>
                    <div className={styles.processSteps}>
                      <h5>{t('stages')}</h5>
                      <div className={styles.processList}>
                        {service.process.map((step, index) => (
                          <div key={index} className={styles.processStep}>
                            <span className={styles.stepNumber}>{index + 1}</span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Как мы работаем */}
        <div className={styles.processSection}>
          <h3 className={styles.subsectionTitle}>{t('howWeWork')}</h3>
          <div className={styles.processFlow}>
            {workProcess.map((step, index) => (
              <div key={index} className={styles.workStep}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{step.step}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                </div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 