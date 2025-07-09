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

В проекте настроены два workflow файла для автоматического деплоя:

1. **deploy_nginx.yml**: запускается вручную для первоначальной настройки Nginx и SSL
2. **deploy_app.yml**: запускается автоматически при push в main ветку или вручную

### Последовательность деплоя

1. **Настройка секретов репозитория:**
   - BACKEND_NETWORK - имя сети Docker
   - VIRTUAL_HOST - имя домена сайта
   - LETSENCRYPT_HOST - имя домена для сертификата
   - LETSENCRYPT_EMAIL - email для уведомлений Let's Encrypt
   - DOCKER_USERNAME, DOCKER_PASSWORD - учетные данные Docker Hub
   - SERVER_IP, SERVER_USER, SERVER_SSH_KEY - данные для доступа к серверу
   - EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY - настройки EmailJS

2. **Первоначальная настройка:**
   - Запустите workflow `Deploy Nginx and SSL` вручную через интерфейс GitHub Actions
   - Этот workflow создаст сеть Docker, настроит Nginx и ACME Companion

3. **Деплой приложения:**
   - Workflow `Deploy Frontend Container` запускается автоматически при push в main ветку
   - Или его можно запустить вручную через интерфейс GitHub Actions

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
