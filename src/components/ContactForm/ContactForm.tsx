import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  phone: string;
  telegram: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation('contact');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    telegram: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // States для управления анимациями
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Refs для отслеживания видимости
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  // Intersection Observer для формы
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Здесь будет логика отправки формы
      await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация отправки
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        telegram: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section className={styles.contactSection} id="contacts">
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

        {/* Центрированная форма */}
        <div className={styles.formContainer}>
          <div 
            ref={formRef}
            className={`${styles.formCard} ${isFormVisible ? styles.formCardVisible : styles.formCardHidden}`}
          >
            <h3 className={`${styles.formTitle} ${isFormVisible ? styles.formTitleVisible : styles.formTitleHidden}`}>
              <span className={styles.formIcon}>🚀</span>
              {t('form.title')}
            </h3>
            
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={`${styles.formRow} ${isFormVisible ? styles.formRowVisible : styles.formRowHidden}`}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <span className={styles.labelIcon}>👤</span>
                    {t('form.fields.name.label')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder={t('form.fields.name.placeholder')}
                    required
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <span className={styles.labelIcon}>📱</span>
                    {t('form.fields.phone.label')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder={t('form.fields.phone.placeholder')}
                    required
                  />
                </div>
              </div>

              <div 
                className={`${styles.inputGroup} ${isFormVisible ? styles.inputGroupVisible : styles.inputGroupHidden}`}
                style={{
                  animationDelay: isFormVisible ? '0.9s' : '0s'
                }}
              >
                <label className={styles.inputLabel}>
                  <span className={styles.labelIcon}>💬</span>
                  {t('form.fields.telegram.label')}
                </label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder={t('form.fields.telegram.placeholder')}
                />
              </div>

              <div 
                className={`${styles.inputGroup} ${isFormVisible ? styles.inputGroupVisible : styles.inputGroupHidden}`}
                style={{
                  animationDelay: isFormVisible ? '1.1s' : '0s'
                }}
              >
                <label className={styles.inputLabel}>
                  <span className={styles.labelIcon}>💭</span>
                  {t('form.fields.message.label')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder={t('form.fields.message.placeholder')}
                  rows={5}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''} ${isFormVisible ? styles.submitBtnVisible : styles.submitBtnHidden}`}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    {t('form.submitting')}
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    {t('form.submit')}
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className={`${styles.successMessage} ${styles.messageVisible}`}>
                  <span>✅</span>
                  {t('form.messages.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={`${styles.errorMessage} ${styles.messageVisible}`}>
                  <span>❌</span>
                  {t('form.messages.error')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 