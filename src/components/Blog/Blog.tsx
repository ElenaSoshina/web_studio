import React, { useState } from 'react';
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

  // Получаем переводы статей
  const postsData = t('posts', { returnObjects: true }) as any[];

  const blogPosts: BlogPost[] = postsData.map((post: any, index: number) => ({
    id: index + 1,
    title: post.title,
    excerpt: post.excerpt,
    category: ['business', 'website', 'tech', 'tech', 'tech', 'tech'][index] as 'website' | 'telegram' | 'business' | 'tech',
    icon: ['⚖️', '🚀', '⚙️', '🛡️', '🧠', '⚡'][index],
    slug: `post-${index + 1}`,
    content: {
      intro: post.intro,
      sections: post.sections || [],
      conclusion: post.conclusion
    }
  }));

  const categories = {
    website: { name: t('categories.website'), color: '#00ffff' },
    telegram: { name: t('categories.telegram'), color: '#ff00ff' },
    business: { name: t('categories.business'), color: '#ffff00' },
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

          {/* Сетка статей */}
          <div className={styles.postsGrid}>
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className={styles.postCard}
                onClick={() => handlePostClick(post)}
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