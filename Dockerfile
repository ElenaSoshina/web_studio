# Этап 1: Сборка приложения
FROM node:18-alpine AS builder

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

# Копируем собранное приложение из этапа builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80 (HTTP)
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

# Этап 3: Разработка
FROM node:18-alpine AS development

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
