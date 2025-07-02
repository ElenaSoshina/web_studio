import React, { useState, useEffect } from 'react';
import styles from './GrowthChart.module.css';

interface CompanyGrowth {
  name: string;
  beforeValue: number;
  afterValue: number;
  metric: string;
  color: string;
  delay: number;
}

const GrowthChart: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Данные о росте компаний после работы с вами
  const companiesData: CompanyGrowth[] = [
    {
      name: "Celebrity Strike",
      beforeValue: 200,
      afterValue: 1200,
      metric: "пользователей",
      color: "#00ffff",
      delay: 0.5
    },
    {
      name: "Zagranpasport24",
      beforeValue: 150,
      afterValue: 850,
      metric: "заявок/день",
      color: "#ff00ff",
      delay: 1.0
    },
    {
      name: "Self Detail",
      beforeValue: 5,
      afterValue: 45,
      metric: "бронирований",
      color: "#ffff00",
      delay: 1.5
    },
    {
      name: "VisaLand",
      beforeValue: 80,
      afterValue: 320,
      metric: "обращений",
      color: "#00ff00",
      delay: 2.0
    }
  ];

  useEffect(() => {
    // Запускаем анимацию через секунду после загрузки
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateGrowthPercentage = (before: number, after: number): number => {
    return Math.round(((after - before) / before) * 100);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={styles.growthChart}>
      {/* Заголовок */}
      <div className={styles.chartHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.chartTitle}>
            <span className={styles.bracket}>{'<'}</span>
            Рост клиентов
            <span className={styles.bracket}>{'/>'}</span>
          </h3>
          <p className={styles.chartSubtitle}>
            Как мы помогаем бизнесу расти
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot}></span>
            <span className={styles.liveText}>LIVE</span>
          </div>
          <div className={styles.timeDisplay}>
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Главная метрика */}
      <div className={styles.mainMetric}>
        <div className={styles.metricValue}>
          <span className={styles.metricNumber}>500</span>
          <span className={styles.metricUnit}>%</span>
        </div>
        <div className={styles.metricLabel}>
          Средний рост клиентов
        </div>
        <div className={styles.metricDescription}>
          после запуска наших решений
        </div>
      </div>

      {/* График роста */}
      <div className={styles.chartContainer}>
        <div className={styles.chartBackground}>
          {/* Сетка */}
          <div className={styles.gridLines}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles.gridLine} style={{ bottom: `${i * 20}%` }}>
                <span className={styles.gridLabel}>{i * 25}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Столбцы роста */}
        <div className={styles.chartBars}>
          {companiesData.map((company, index) => {
            const growthPercent = calculateGrowthPercentage(company.beforeValue, company.afterValue);
            const barHeight = Math.min((growthPercent / 600) * 100, 90); // Максимум 90% высоты

            return (
              <div key={company.name} className={styles.barContainer}>
                <div className={styles.companyName}>{company.name}</div>
                
                {/* Столбец роста */}
                <div className={styles.barWrapper}>
                  {/* Базовая линия (до) */}
                  <div className={styles.baseLine}>
                    <span className={styles.baseValue}>{company.beforeValue}</span>
                  </div>
                  
                  {/* Анимированный столбец роста */}
                  <div 
                    className={`${styles.growthBar} ${isAnimating ? styles.animating : ''}`}
                    style={{
                      '--bar-height': `${barHeight}%`,
                      '--bar-color': company.color,
                      '--animation-delay': `${company.delay}s`
                    } as React.CSSProperties}
                  >
                    <div className={styles.barFill}></div>
                    <div className={styles.barGlow}></div>
                    
                    {/* Значение на вершине */}
                    <div className={styles.barValue}>
                      <span className={styles.afterValue}>{company.afterValue}</span>
                      <span className={styles.growthPercent}>+{growthPercent}%</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.metricType}>{company.metric}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Достижения */}
      <div className={styles.achievements}>
        <div className={styles.achievement}>
          <div className={styles.achievementIcon}>🚀</div>
          <div className={styles.achievementText}>
            <div className={styles.achievementValue}>4</div>
            <div className={styles.achievementLabel}>Успешных запуска</div>
          </div>
        </div>

        <div className={styles.achievement}>
          <div className={styles.achievementIcon}>📈</div>
          <div className={styles.achievementText}>
            <div className={styles.achievementValue}>100%</div>
            <div className={styles.achievementLabel}>Довольных клиентов</div>
          </div>
        </div>

        <div className={styles.achievement}>
          <div className={styles.achievementIcon}>⚡</div>
          <div className={styles.achievementText}>
            <div className={styles.achievementValue}>2-4</div>
            <div className={styles.achievementLabel}>Недели запуска</div>
          </div>
        </div>
      </div>

      {/* Анимированные частицы успеха */}
      <div className={styles.successParticles}>
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className={styles.particle}
            style={{ 
              '--delay': `${i * 0.3}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            } as React.CSSProperties}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthChart; 