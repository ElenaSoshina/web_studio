import React, { useState, useEffect } from 'react';
import { dashboardData, getStatusEmoji } from '../../data/dashboardData';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedMetrics, setAnimatedMetrics] = useState({
    projectsCount: 0,
    uptime: 0,
    supportHours: 0
  });

  // Обновление времени каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Анимация цифр при загрузке
  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000; // 2 секунды
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedMetrics({
          projectsCount: Math.floor(dashboardData.metrics.projectsCount * progress),
          uptime: parseFloat((dashboardData.metrics.uptime * progress).toFixed(1)),
          supportHours: Math.floor(dashboardData.metrics.supportHours * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedMetrics({
            projectsCount: dashboardData.metrics.projectsCount,
            uptime: dashboardData.metrics.uptime,
            supportHours: dashboardData.metrics.supportHours
          });
        }
      }, stepDuration);
    };

    // Запускаем анимацию через небольшую задержку
    const timeout = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timeout);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={styles.dashboard}>
      {/* Заголовок дашборда */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.dashboardTitle}>
            <span className={styles.bracket}>{'<'}</span>
            WebStudio.Analytics
            <span className={styles.bracket}>{'/>'}</span>
          </h3>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>LIVE</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.timeDisplay}>
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Главные метрики */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🚀</div>
          <div className={styles.metricValue}>
            <span className={styles.number}>{animatedMetrics.projectsCount}</span>
            <span className={styles.plus}>+</span>
          </div>
          <div className={styles.metricLabel}>Проектов запущено</div>
          <div className={styles.metricTrend}>
            <span className={styles.trendUp}>+{dashboardData.metrics.monthlyGrowth}%</span>
            <span className={styles.trendLabel}>этот месяц</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>⚡</div>
          <div className={styles.metricValue}>
            <span className={styles.number}>{animatedMetrics.uptime}</span>
            <span className={styles.percent}>%</span>
          </div>
          <div className={styles.metricLabel}>Uptime серверов</div>
          <div className={styles.metricChart}>
            <div className={styles.miniChart}></div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>👥</div>
          <div className={styles.metricValue}>
            <span className={styles.number}>{animatedMetrics.supportHours}</span>
            <span className={styles.unit}>h</span>
          </div>
          <div className={styles.metricLabel}>Поддержка 24/7</div>
          <div className={styles.responseTime}>
            <span className={styles.responseText}>~ {dashboardData.metrics.responseTime} мин</span>
          </div>
        </div>
      </div>

      {/* Активные проекты */}
      <div className={styles.activeProjects}>
        <div className={styles.sectionTitle}>
          <span className={styles.sectionLabel}>Активные проекты</span>
          <div className={styles.projectsCount}>{dashboardData.projects.length}</div>
        </div>
        
        <div className={styles.projectsList}>
          {dashboardData.projects.map((project, index) => (
            <div 
              key={project.name} 
              className={styles.projectItem}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.projectStatus}>
                {getStatusEmoji(project.status)}
              </div>
              <div className={styles.projectInfo}>
                <span className={styles.projectName}>{project.name}</span>
                <span className={styles.projectType}>{project.type}</span>
              </div>
              <div className={styles.projectMetric}>
                <span className={styles.metricValue}>{project.metric.value.toLocaleString()}</span>
                <span className={styles.metricLabel}>{project.metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Технологическая статистика */}
      <div className={styles.techStats}>
        <div className={styles.sectionTitle}>
          <span className={styles.sectionLabel}>Tech Stack Performance</span>
        </div>
        <div className={styles.techBars}>
          {dashboardData.techStack.map((tech, index) => (
            <div 
              key={tech.name} 
              className={styles.techBar}
              style={{ animationDelay: `${1 + index * 0.1}s` }}
            >
              <span className={styles.techName}>{tech.name}</span>
              <div className={styles.techProgress}>
                <div 
                  className={styles.progressBar}
                  style={{ 
                    width: `${tech.performance}%`,
                    background: `linear-gradient(90deg, ${tech.color}, ${tech.color}80)`
                  }}
                ></div>
              </div>
              <span className={styles.techPercent}>{tech.performance}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Анимированный сканирующий луч */}
      <div className={styles.scanline}></div>
    </div>
  );
};

export default Dashboard; 