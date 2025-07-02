import React from 'react';
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
  if (!isOpen || !post) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const categories = {
    website: { name: 'Веб-сайты', color: '#00ffff' },
    telegram: { name: 'Telegram', color: '#ff00ff' },
    business: { name: 'Бизнес', color: '#ffff00' },
    tech: { name: 'Технологии', color: '#00ff00' }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
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
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <p className={styles.articleIntro}>{post.content.intro}</p>

          <div className={styles.articleContent}>
            {post.content.sections.map((section, index) => (
              <div key={index} className={styles.articleSection}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <div 
                  className={styles.sectionContent}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>

          <div className={styles.articleConclusion}>
            <h2 className={styles.conclusionTitle}>Заключение</h2>
            <p className={styles.conclusionText}>{post.content.conclusion}</p>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.contactBtn} onClick={onClose}>
            <span>💬</span>
            Обсудить проект
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal; 