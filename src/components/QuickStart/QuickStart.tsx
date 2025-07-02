import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'packages' | 'process'>('packages');

  const packages: Package[] = [
    {
      id: 1,
      title: 'Быстрый старт',
      price: 'от 30 000 ₽',
      category: 'starter',
      features: [
        'Установка на хостинг',
        'Установка SSL сертификата',
        'Подключение аналитики',
        'Подключение чата',
        'Первичное наполнение контентом'
      ]
    },
    {
      id: 2,
      title: 'Telegram Bot + WebApp',
      price: 'от 75 000 ₽',
      category: 'business',
      highlighted: true,
      features: [
        'Разработка Telegram бота',
        'Интеграция с веб-приложением',
        'Система уведомлений',
        'Админ-панель',
        'Интеграция с базой данных',
        'Тестирование и запуск'
      ]
    }
  ];

  const clientTypes: ClientType[] = [
    {
      icon: '🚀',
      title: 'Начинающим',
      subtitle: 'Первый сайт',
      description: 'Если у вас нет опыта с сайтами, но нужен результат уже сегодня. Мы подберем оптимальное решение и сделаем все за вас.'
    },
    {
      icon: '📈',
      title: 'Развивающимся', 
      subtitle: 'Модернизация',
      description: 'Ваш сайт устарел? Нужен современный дизайн без долгого ожидания? Готовые решения помогут запуститься за неделю.'
    },
    {
      icon: '🏢',
      title: 'Растущим',
      subtitle: 'Масштабирование',
      description: 'Новые направления, региональные сайты, отдельные проекты? Подберем решение в день обращения.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Выбор решения',
      description: 'Выбираете готовый дизайн и функционал под ваши задачи',
      icon: '🎨'
    },
    {
      step: '02', 
      title: 'Настройка',
      description: 'Выбираем домен, хостинг и настраиваем техническую часть',
      icon: '⚙️'
    },
    {
      step: '03',
      title: 'Контент',
      description: 'Предоставляете тексты, изображения и описания',
      icon: '📝'
    },
    {
      step: '04',
      title: 'Запуск',
      description: 'Остальное делаем мы! Сайт готов и работает',
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
            <span className={styles.titleText}>ГОТОВЫЕ РЕШЕНИЯ</span>
            <span className={styles.bracket}>{'/>'}</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Доступные интернет-решения для быстрого старта Вашего бизнеса
          </p>
          <div className={styles.highlightBadge}>
            <span className={styles.badgeText}>Сайт работает через 7 дней</span>
            <span className={styles.badgePrice}>от 30 000₽</span>
          </div>
        </div>

        {/* Табы */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'packages' ? styles.active : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            💼 Готовые пакеты
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'process' ? styles.active : ''}`}
            onClick={() => setActiveTab('process')}
          >
            🔄 Процесс работы
          </button>
        </div>

        {/* Контент табов */}
        {activeTab === 'packages' && (
          <div className={styles.packagesContent}>
            {/* Типы клиентов */}
            <div className={styles.clientTypes}>
              <h3 className={styles.subsectionTitle}>Наши решения подойдут:</h3>
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
                      ⭐ Популярный
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
                    Заказать
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className={styles.processContent}>
            <h3 className={styles.subsectionTitle}>Что потребуется от вас?</h3>
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
                  <h4>Остальное сделаем мы!</h4>
                  <p>Техническая настройка, развертывание, тестирование и запуск</p>
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