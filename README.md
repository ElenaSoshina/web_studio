# Web Studio

Это React-приложение с Docker-настройкой для развертывания в трех контейнерах: nginx, SSL-сертификат и фронтенд.

## Технологии

- React 19
- Vite
- i18next для интернационализации
- EmailJS для контактных форм
- Docker и Docker Compose для контейнеризации

## Архитектура Docker

Проект использует три контейнера:

1. **nginx-proxy**: обратный прокси для обработки запросов
2. **acme-companion**: автоматическое получение и обновление SSL-сертификатов
3. **webapp**: фронтенд-приложение на React

## Деплой через GitHub Actions

В проекте настроен автоматический деплой через GitHub Actions workflow `Deploy Web Studio`:

- Запускается автоматически при push в main ветку
- Или может быть запущен вручную через интерфейс GitHub Actions
- Разворачивает все три контейнера (nginx, SSL, webapp) последовательно

### Последовательность деплоя

1. **Настройка секретов репозитория:**
   - BACKEND_NETWORK - имя сети Docker
   - VIRTUAL_HOST - имя домена сайта
   - LETSENCRYPT_HOST - имя домена для сертификата
   - LETSENCRYPT_EMAIL - email для уведомлений Let's Encrypt
   - DOCKER_USERNAME, DOCKER_PASSWORD - учетные данные Docker Hub
   - SERVER_IP, SERVER_USER, SERVER_SSH_KEY - данные для доступа к серверу
   - EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY - настройки EmailJS

2. **Автоматический деплой:**
   - При пуше в main ветку запускается workflow `Deploy Web Studio`
   - Workflow сначала настраивает инфраструктуру (Nginx и SSL)
   - Затем собирает и разворачивает фронтенд-приложение

## Локальная разработка

Для локальной разработки:

```bash
npm install
npm run dev
```

## Сборка для продакшн

```bash
npm run build
```
