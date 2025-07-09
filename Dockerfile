# Этап 1: Сборка приложения
FROM node:20-alpine AS builder

# Принимаем build argument
ARG BASE_PATH=/
# Принимаем переменные окружения для EmailJS
ARG EMAILJS_SERVICE_ID
ARG EMAILJS_TEMPLATE_ID
ARG EMAILJS_PUBLIC_KEY

# Устанавливаем переменную окружения для Vite сразу
ENV VITE_BASE_PATH=${BASE_PATH}
# Устанавливаем переменные окружения для EmailJS
ENV VITE_EMAILJS_SERVICE_ID=${EMAILJS_SERVICE_ID}
ENV VITE_EMAILJS_TEMPLATE_ID=${EMAILJS_TEMPLATE_ID}
ENV VITE_EMAILJS_PUBLIC_KEY=${EMAILJS_PUBLIC_KEY}

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только package.json и package-lock.json сначала
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Теперь копируем весь исходный код
COPY . .

# Собираем приложение для production
RUN npm run build

# Этап 2: Production сервер
FROM nginx:alpine AS production

# Удаляем стандартную конфигурацию nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем нашу конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

COPY nginx/webapp.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение из этапа builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80 (HTTP)
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

# Этап 3: Разработка
FROM node:20-alpine AS development

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая dev)
RUN npm install

# Копируем исходный код
COPY . .

# Открываем порт для Vite dev сервера
EXPOSE 5173

# Запускаем dev сервер с доступом извне
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
