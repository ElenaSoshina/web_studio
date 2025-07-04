import emailjs from '@emailjs/browser';

/**
 * Данные формы контактов для отправки email
 */
export interface ContactFormData {
  name: string;
  phone: string;
  telegram: string;
  message: string;
}

/**
 * Результат отправки email
 */
export interface EmailResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Конфигурация EmailJS
 * Эти значения нужно получить после регистрации на emailjs.com
 */
class EmailService {
  private readonly SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  private readonly TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  private readonly PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  /**
   * Инициализация EmailJS
   */
  public init(): void {
    if (!this.PUBLIC_KEY) {
      console.warn('EmailJS PUBLIC_KEY не настроен');
      return;
    }
    emailjs.init(this.PUBLIC_KEY);
  }

  /**
   * Проверяет, настроен ли EmailJS
   */
  public isConfigured(): boolean {
    return !!(this.SERVICE_ID && this.TEMPLATE_ID && this.PUBLIC_KEY);
  }

  /**
   * Отправляет email с данными формы контактов
   * @param formData данные формы
   * @returns результат отправки
   */
  public async sendContactForm(formData: ContactFormData): Promise<EmailResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        message: 'EmailJS не настроен',
        error: 'Отсутствуют переменные окружения для EmailJS'
      };
    }

    try {
      // Подготавливаем данные для шаблона
      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        from_telegram: formData.telegram || 'Не указан',
        message: formData.message,
        to_name: 'Команда WebVision', // Ваше имя/название компании
        reply_to: formData.phone, // На случай если нужен обратный контакт
        // Текущая дата и время
        date: new Date().toLocaleString('ru-RU', {
          timeZone: 'Europe/Moscow',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Заявка успешно отправлена!'
        };
      } else {
        throw new Error(`HTTP статус: ${response.status}`);
      }

    } catch (error) {
      console.error('Ошибка при отправке email:', error);
      
      let errorMessage = 'Произошла ошибка при отправке заявки';
      
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          errorMessage = 'Проблема с подключением к интернету';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Превышен лимит отправки. Попробуйте позже';
        } else if (error.message.includes('template')) {
          errorMessage = 'Ошибка конфигурации шаблона email';
        }
      }

      return {
        success: false,
        message: errorMessage,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      };
    }
  }

  /**
   * Валидирует данные формы перед отправкой
   * @param formData данные для валидации
   * @returns объект с результатом валидации
   */
  public validateFormData(formData: ContactFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push('Имя обязательно для заполнения');
    }

    if (!formData.phone.trim()) {
      errors.push('Телефон обязателен для заполнения');
    } else if (!/^[\+]?[0-9\(\)\-\s]{10,}$/.test(formData.phone.trim())) {
      errors.push('Некорректный формат телефона');
    }

    if (formData.telegram && !formData.telegram.startsWith('@')) {
      errors.push('Telegram должен начинаться с @');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Экспортируем синглтон
export const emailService = new EmailService(); 