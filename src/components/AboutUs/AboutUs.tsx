import React, { useState } from 'react';
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
  const [activeService, setActiveService] = useState<string>('websites');

  const services: Service[] = [
    {
      id: 'websites',
      title: 'Веб-сайты',
      icon: '🌐',
      description: 'Создаем современные, быстрые и адаптивные веб-сайты для любых целей бизнеса',
      features: [
        'Адаптивный дизайн под все устройства',
        'Высокая скорость загрузки',
        'SEO-оптимизация',
        'Интеграция с аналитикой',
        'Система управления контентом',
        'Форма обратной связи',
        'Интеграция с социальными сетями',
        'SSL-сертификат и безопасность'
      ],
      process: [
        'Анализ требований и целей',
        'Создание дизайн-макета',
        'Разработка и программирование',
        'Тестирование на всех устройствах',
        'Запуск и настройка хостинга'
      ]
    },
    {
      id: 'telegram',
      title: 'Telegram WebApp + Бот',
      icon: '🤖',
      description: 'Разрабатываем полнофункциональные Telegram приложения с интегрированными ботами',
      features: [
        'Telegram Mini App интерфейс',
        'Автоматизированный бот-помощник',
        'Система уведомлений',
        'Интеграция с платежами',
        'База данных клиентов',
        'Администраторская панель',
        'Аналитика и отчеты',
        'API для внешних интеграций'
      ],
      process: [
        'Проектирование архитектуры',
        'Создание бота и WebApp',
        'Интеграция с внешними сервисами',
        'Тестирование функционала',
        'Публикация и мониторинг'
      ]
    },
    {
      id: 'services',
      title: 'Индивидуальные сервисы',
      icon: '⚙️',
      description: 'Создаем уникальные решения и автоматизируем бизнес-процессы под ваши задачи',
      features: [
        'Интеграция с внешними API',
        'Автоматизация рабочих процессов',
        'Системы управления данными',
        'Микросервисная архитектура',
        'Облачные решения',
        'Системы аналитики',
        'Интеграция с внешними системами',
        'Масштабируемая архитектура'
      ],
      process: [
        'Глубокий анализ бизнес-процессов',
        'Архитектурное проектирование',
        'Поэтапная разработка',
        'Интеграционное тестирование',
        'Развертывание и поддержка'
      ]
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
      title: 'Анализ и планирование',
      description: 'Изучаем ваш бизнес, анализируем требования и составляем техническое задание',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Проектирование',
      description: 'Создаем архитектуру решения, дизайн-макеты и план разработки',
      icon: '📐'
    },
    {
      step: '03',
      title: 'Разработка',
      description: 'Пишем код, интегрируем сервисы и создаем функциональный продукт',
      icon: '⌨️'
    },
    {
      step: '04',
      title: 'Тестирование',
      description: 'Тщательно тестируем все функции, проверяем безопасность и производительность',
      icon: '🧪'
    },
    {
      step: '05',
      title: 'Запуск и поддержка',
      description: 'Запускаем проект, обучаем команду и обеспечиваем техническую поддержку',
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
            <span className={styles.titleText}>НАШИ УСЛУГИ</span>
            <span className={styles.bracket}>{'/>'}</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Мы создаем цифровые решения, которые помогают бизнесу расти и развиваться
          </p>
        </div>

        {/* Наши услуги */}
        <div className={styles.servicesSection}>
          <h3 className={styles.subsectionTitle}>Что мы создаем</h3>
          
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
                      <h5>Возможности:</h5>
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
                      <h5>Этапы:</h5>
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
          <h3 className={styles.subsectionTitle}>Как мы работаем</h3>
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