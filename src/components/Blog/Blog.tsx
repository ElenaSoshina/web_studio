import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import BlogModal from '../BlogModal/BlogModal';
import styles from './Blog.module.css';

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

const Blog: React.FC = () => {
  const { t } = useTranslation('blog');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // States для управления анимациями
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);
  
  // Refs для отслеживания видимости
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Intersection Observer для заголовка секции
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  // Intersection Observer для сетки статей
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGridVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  // Получаем переводы статей
  const postsData = t('posts', { returnObjects: true }) as any[];

  const blogPosts: BlogPost[] = postsData.map((post: any, index: number) => ({
    id: index + 1,
    title: post.title,
    excerpt: post.excerpt,
    category: ['telegram', 'telegram', 'telegram', 'telegram', 'business', 'business'][index] as 'website' | 'telegram' | 'business' | 'tech',
    icon: ['🚀', '🛒', '📅', '🤖', '⚖️', '💼'][index],
    slug: `post-${index + 1}`,
    content: {
      intro: post.intro,
      sections: post.sections || [],
      conclusion: post.conclusion
    }
  }));

  const categories = {
    website: { name: t('categories.website'), color: '#00ffff' },
    telegram: { name: t('categories.telegram'), color: '#0088cc' },
    business: { name: t('categories.business'), color: '#ff6b35' },
    tech: { name: t('categories.tech'), color: '#00ff00' }
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <section className={styles.blogSection} id="blog">
        {/* Анимированный фон */}
        <div className={styles.futuristicBackground}>
          <div className={styles.gridPattern}></div>
        </div>

        <div className={styles.container}>
          {/* Заголовок секции */}
          <div 
            ref={headerRef}
            className={`${styles.sectionHeader} ${isHeaderVisible ? styles.headerVisible : styles.headerHidden}`}
          >
            <h2 className={styles.sectionTitle}>
              <span className={styles.bracket}>{'<'}</span>
              <span className={styles.titleText}>{t('title')}</span>
              <span className={styles.bracket}>{'/>'}</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              {t('subtitle')}
            </p>
          </div>

          {/* Сетка статей */}
          <div 
            ref={gridRef}
            className={`${styles.postsGrid} ${isGridVisible ? styles.gridVisible : styles.gridHidden}`}
          >
            {blogPosts.map((post, index) => (
              <article 
                key={post.id} 
                className={`${styles.postCard} ${isGridVisible ? styles.postCardVisible : styles.postCardHidden}`}
                onClick={() => handlePostClick(post)}
                style={{
                  animationDelay: isGridVisible ? `${0.1 + index * 0.1}s` : '0s'
                }}
              >
                <div className={styles.postHeader}>
                  <div className={styles.postIcon}>{post.icon}</div>
                  <div className={styles.postMeta}>
                    <span 
                      className={styles.postCategory}
                      style={{ color: categories[post.category].color }}
                    >
                      {categories[post.category].name}
                    </span>
                  </div>
                </div>

                <div className={styles.postContent}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>

                  <div className={styles.postFooter}>
                    <button className={styles.readMoreBtn}>
                      <span>📖</span>
                      {t('readMore')}
                      <span className={styles.arrow}>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BlogModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Blog; 