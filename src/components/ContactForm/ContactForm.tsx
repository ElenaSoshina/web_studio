import React, { useState } from 'react';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  phone: string;
  telegram: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    telegram: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.bracket}>{'<'}</span>
            <span className={styles.titleText}>СВЯЗАТЬСЯ С НАМИ</span>
            <span className={styles.bracket}>{'/>'}</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Готовы обсудить ваш проект? Заполните форму и мы свяжемся с вами
          </p>
        </div>

        {/* Центрированная форма */}
        <div className={styles.formContainer}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>
              <span className={styles.formIcon}>🚀</span>
              Расскажите о вашем проекте
            </h3>
            
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <span className={styles.labelIcon}>👤</span>
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <span className={styles.labelIcon}>📱</span>
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  <span className={styles.labelIcon}>💬</span>
                  Telegram
                </label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="@your_username"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  <span className={styles.labelIcon}>💭</span>
                  Описание проекта
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Опишите ваши задачи, цели и пожелания..."
                  rows={5}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Отправляем...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Отправить заявку
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <span>✅</span>
                  Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  <span>❌</span>
                  Произошла ошибка. Попробуйте позже или свяжитесь другим способом.
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