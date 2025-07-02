import React, { useState } from 'react';
import styles from './Portfolio.module.css';

interface Project {
  id: number;
  title: string;
  category: 'website' | 'telegram';
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  liveUrl?: string;
  codeUrl?: string;
  isDemo: boolean;
  videoDemo?: string; // Путь к видео-демонстрации
}

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'website' | 'telegram'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Celebrity Strike Shop',
      category: 'telegram',
      description: 'Telegram веб-приложение для продажи услуг в играх с системой подписок и подарочных карт',
      technologies: ['Java Spring Boot', 'Telegram WebApp', 'PostgreSQL', 'React'],
      image: '/group-3.png',
      demoUrl: 'https://frontend.celebrity-miniapp.duckdns.org/',
      liveUrl: 'https://t.me/CelebrityStrike_bot',
      isDemo: true
    },
    {
      id: 2,
      title: 'Self Detail Bot',
      category: 'telegram',
      description: 'Приложение для бронирования времени оборудованного бокса для детейлинга с интеграцией Google Calendar и оплатой',
      technologies: ['Java Spring', 'Telegram Bot API', 'Google Calendar API', 'Payment Gateway', 'PostgreSQL'],
      image: '/group-2-3.png',
      demoUrl: 'http://frontend.self-detailing.duckdns.org/',
      liveUrl: 'https://t.me/self_detail_bot',
      isDemo: true
    },

    {
      id: 4,
      title: 'Zagranpasport24.ru',
      category: 'website',
      description: 'Онлайн-сервис для срочного оформления загранпаспортов с автоматической отправкой заявок администратору в Telegram',
      technologies: ['Node.js', 'HTML5', 'CSS3', 'JavaScript', 'UI Components', 'Telegram Bot API'],
      image: '/group-1.png',
      demoUrl: 'https://zagranpasport24.ru',
      liveUrl: 'https://zagranpasport24.ru',
      isDemo: false
    },
    {
      id: 5,
      title: 'VisaLand.ru',
      category: 'website',
      description: 'Сервис оформления документов с интеграцией Telegram для мгновенного получения заявок администратором',
      technologies: ['Node.js', 'HTML5', 'CSS3', 'JavaScript', 'UI Components', 'Telegram Bot API'],
      image: '/group-1-2.png',
      demoUrl: 'https://visaland.ru',
      liveUrl: 'https://visaland.ru',
      isDemo: false
    }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const openDemo = (project: Project) => {
    setSelectedProject(project);
  };

  const closeDemo = () => {
    setSelectedProject(null);
  };

  return (
    <section className={styles.portfolioSection} id="portfolio">
      <div className={styles.container}>
        {/* Заголовок секции */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.bracket}>{'<'}</span>
            <span className={styles.titleText}>ПОРТФОЛИО</span>
            <span className={styles.bracket}>{'/>'}</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Наши проекты с возможностью демо просмотра
          </p>
        </div>

        {/* Фильтры */}
        <div className={styles.filters}>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Все проекты
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'website' ? styles.active : ''}`}
            onClick={() => setActiveFilter('website')}
          >
            Сайты
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'telegram' ? styles.active : ''}`}
            onClick={() => setActiveFilter('telegram')}
          >
            Telegram Apps
          </button>
        </div>

        {/* Сетка проектов */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.projectCard} data-category={project.category}>
              <div className={styles.projectImage}>
                <img src={project.image} alt={project.title} />
                <div className={styles.projectOverlay}>
                  <button 
                    className={styles.demoBtn}
                    onClick={() => openDemo(project)}
                  >
                    <span>🚀</span>
                    Демо
                  </button>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                      <span>{project.category === 'telegram' ? '📱' : '🌐'}</span>
                      {project.category === 'telegram' ? 'Открыть в Telegram' : 'Открыть сайт'}
                    </a>
                  )}
                </div>
              </div>
              
              <div className={styles.projectContent}>
                <div className={styles.projectCategory}>
                  {project.category === 'website' ? '🌐 Website' : '🤖 Telegram App'}
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.projectTech}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal для демо */}
      {selectedProject && (
        <div className={styles.modal} onClick={closeDemo}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{selectedProject.title} - Демо версия</h3>
              <button className={styles.closeBtn} onClick={closeDemo}>×</button>
            </div>
            
            <div className={styles.modalBody}>
              {selectedProject.category === 'telegram' ? (
                <div className={styles.telegramDemo}>
                  <div className={styles.phoneFrame}>
                    <div className={styles.phoneScreen}>
                      <iframe 
                        src={selectedProject.demoUrl} 
                        title={`${selectedProject.title} Demo`}
                        className={styles.demoFrame}
                      ></iframe>
                    </div>
                  </div>
                  <div className={styles.demoInfo}>
                    <h4>Как протестировать:</h4>
                    <ol>
                      <li>Откройте ссылку в Telegram</li>
                      <li>Начните диалог с ботом</li>
                      <li>Попробуйте основные функции</li>
                    </ol>
                    <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.openTelegramBtn}>
                      Открыть в Telegram
                    </a>
                  </div>
                </div>
              ) : (
                <div className={styles.websiteDemo}>
                  <iframe 
                    src={selectedProject.demoUrl} 
                    title={`${selectedProject.title} Demo`}
                    className={styles.websiteDemoFrame}
                  ></iframe>
                </div>
              )}
            </div>
            
            <div className={styles.modalFooter}>
              <div className={styles.projectLinks}>
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                    {selectedProject.category === 'telegram' ? '📱 Открыть в Telegram' : '🌐 Открыть сайт'}
                  </a>
                )}
                {selectedProject.codeUrl && (
                  <a href={selectedProject.codeUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                    📂 Исходный код
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio; 