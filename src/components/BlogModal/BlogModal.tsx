import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './BlogModal.module.css';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: 'website' | 'telegram' | 'business' | 'tech';
  icon: string;
  slug: string;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
}

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, isOpen, onClose }) => {
  const { t } = useTranslation('blog');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Небольшая задержка для корректной анимации появления
      const showTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(showTimer);
    } else {
      setIsAnimating(false);
      // Ждем завершения анимации исчезновения перед удалением из DOM
      const hideTimer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(hideTimer);
    }
  }, [isOpen]);

  if (!shouldRender || !post) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const categories = {
    website: { name: t('categories.website'), color: '#00ffff' },
    telegram: { name: t('categories.telegram'), color: '#ff00ff' },
    business: { name: t('categories.business'), color: '#ffff00' },
    tech: { name: t('categories.tech'), color: '#00ff00' }
  };

  return (
    <div 
      className={`${styles.modalOverlay} ${isAnimating ? styles.overlayVisible : styles.overlayHidden}`} 
      onClick={handleOverlayClick}
    >
      <div className={`${styles.modalContent} ${isAnimating ? styles.contentVisible : styles.contentHidden}`}>
        <div className={styles.modalHeader}>
          <div className={styles.articleMeta}>
            <div className={styles.articleIcon}>{post.icon}</div>
            <span 
              className={styles.articleCategory}
              style={{ color: categories[post.category].color }}
            >
              {categories[post.category].name}
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <h1 className={`${styles.articleTitle} ${isAnimating ? styles.titleVisible : styles.titleHidden}`}>
            {post.title}
          </h1>
          <p className={`${styles.articleIntro} ${isAnimating ? styles.introVisible : styles.introHidden}`}>
            {post.content.intro}
          </p>

          <div className={styles.articleContent}>
            {post.content.sections.map((section, index) => (
              <div 
                key={index} 
                className={`${styles.articleSection} ${isAnimating ? styles.sectionVisible : styles.sectionHidden}`}
                style={{
                  animationDelay: isAnimating ? `${0.3 + index * 0.1}s` : '0s'
                }}
              >
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <div 
                  className={styles.sectionContent}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>

          <div className={`${styles.articleConclusion} ${isAnimating ? styles.conclusionVisible : styles.conclusionHidden}`}>
            <h2 className={styles.conclusionTitle}>{t('conclusion')}</h2>
            <p className={styles.conclusionText}>{post.content.conclusion}</p>
          </div>
        </div>

        <div className={`${styles.modalFooter} ${isAnimating ? styles.footerVisible : styles.footerHidden}`}>
          <button
            className={styles.contactBtn}
            onClick={() => {
              const el = document.getElementById('contacts');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
              onClose();
            }}
          >
            <span>💬</span>
            {t('discussProject')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal; 