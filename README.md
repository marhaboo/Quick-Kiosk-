# 🍽️ ResNet — Restaurant Network Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?style=for-the-badge&logo=redux" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/ASP.NET_Core-8-512BD4?style=for-the-badge&logo=dotnet" alt="ASP.NET Core" />
  <img src="https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server" alt="SQL Server" />
</div>

<br />

**ResNet** — это современная веб-платформа, которая объединяет рестораны, кафе и бары Душанбе. Владельцы заведений могут легко добавлять свои рестораны, управлять меню и столиками, а пользователи — просматривать меню, фотографии и бронировать столики онлайн.

## ✨ Основные возможности

### 👥 Для пользователей
- 🔍 **Поиск ресторанов** — найдите идеальное место для ужина
- 📱 **Просмотр меню** — изучите блюда и цены перед посещением
- 🖼️ **Галерея фото** — посмотрите на атмосферу заведения
- 📅 **Бронирование столиков** — забронируйте стол на удобное время
- ⭐ **Отзывы и рейтинги** — читайте отзывы других посетителей
- 🗺️ **Карта заведений** — найдите ближайшие рестораны

### 🏪 Для владельцев ресторанов
- 🏢 **Управление рестораном** — добавьте информацию о своем заведении
- 🍽️ **Управление меню** — легко обновляйте блюда и цены
- 🪑 **Управление столиками** — контролируйте доступность столов
- 📊 **Аналитика бронирований** — отслеживайте популярность заведения
- 📸 **Загрузка фото** — покажите атмосферу вашего ресторана
- 💬 **Обратная связь** — отвечайте на отзывы клиентов

## 🚀 Стек технологий

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 3, shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend
- **Framework**: ASP.NET Core 8 Web API (C#)
- **Database**: SQL Server
- **ORM**: Entity Framework Core
- **Authentication**: JWT Bearer tokens
- **API Documentation**: Swagger
- **File Storage**: Memory Storage

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in bundler

## ⚙️ Установка и запуск

### Предварительные требования
- Node.js 18+ 
- npm или yarn
- Git

### 🖥️ Frontend Setup

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/marhaboo/Quick-Kiosk-.git
cd Quick-Kiosk-
```

2. **Установите зависимости:**
```bash
npm install
# или
yarn install
```

3. **Настройте переменные окружения:**
```bash
cp .env.example .env.local
```

Отредактируйте `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Запустите проект в режиме разработки:**
```bash
npm run dev
# или
yarn dev
```

Фронтенд будет доступен по адресу: 👉 **http://localhost:3000**

5. **Сборка для production:**
```bash
npm run build
npm run start
```

6. **Дополнительные команды:**
```bash
# Линтинг
npm run lint

# Проверка типов
npm run type-check

# Форматирование кода
npm run format
```

### 🔧 Backend Setup

1. **Перейдите в папку backend:**
```bash
cd backend
```

2. **Восстановите пакеты:**
```bash
dotnet restore
```

3. **Настройте строку подключения к базе данных в `appsettings.json`:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=ResNetDB;Trusted_Connection=true;"
  }
}
```

4. **Примените миграции:**
```bash
dotnet ef database update
```

5. **Запустите API:**
```bash
dotnet run
```

API будет доступно по адресу: 👉 **http://localhost:5000**
Swagger документация: 👉 **http://localhost:5000/swagger**

## 📂 Структура проекта

### Frontend
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Группа маршрутов для аутентификации
│   ├── dashboard/         # Панель управления
│   ├── restaurants/       # Страницы ресторанов
│   ├── menu/             # Управление меню
│   ├── reservations/     # Бронирования
│   ├── globals.css       # Глобальные стили
│   ├── layout.tsx        # Корневой layout
│   └── page.tsx          # Главная страница
├── components/            # Переиспользуемые UI компоненты
│   ├── ui/               # shadcn/ui компоненты
│   ├── forms/            # Формы
│   ├── modals/           # Модальные окна
│   └── layout/           # Layout компоненты
├── features/             # Бизнес-логика и Redux slices
│   ├── auth/             # Аутентификация
│   ├── restaurants/      # Рестораны
│   ├── menu/             # Меню
│   ├── reservations/     # Бронирования
│   └── users/            # Пользователи
├── shared/               # Общие утилиты и константы
│   ├── api/              # API клиент
│   ├── lib/              # Утилиты
│   ├── types/            # TypeScript типы
│   └── constants/        # Константы
├── store/                # Redux store конфигурация
└── hooks/                # Кастомные React hooks
```

### Backend
```
backend/
├── Controllers/          # API контроллеры
├── Models/              # Модели данных
├── Services/            # Бизнес-логика
├── Data/                # Entity Framework контекст
├── DTOs/                # Data Transfer Objects
├── Middleware/          # Middleware компоненты
├── Extensions/          # Расширения
└── Program.cs           # Точка входа приложения
```

## 🎨 UI/UX Features

- **🌙 Dark/Light Mode** — переключение темы оформления
- **📱 Responsive Design** — адаптивный дизайн для всех устройств
- **⚡ Fast Loading** — оптимизированная загрузка страниц
- **🎭 Smooth Animations** — плавные анимации с Framer Motion
- **♿ Accessibility** — поддержка accessibility стандартов
- **🔍 Advanced Search** — умный поиск с фильтрами
- **📊 Interactive Charts** — интерактивная аналитика

## 🔐 Аутентификация и авторизация

### Роли пользователей:
- **👤 Guest** — просмотр ресторанов и меню
- **🔐 User** — бронирование столиков, отзывы
- **🏪 Restaurant Owner** — управление рестораном и меню
- **👑 Admin** — полный доступ к системе

### Функции безопасности:
- JWT токены для аутентификации
- Защищенные маршруты
- Валидация данных на клиенте и сервере
- Rate limiting для API
- CORS настройки

## 📱 API Endpoints

### Рестораны
```
GET    /api/restaurants          # Получить все рестораны
GET    /api/restaurants/{id}     # Получить ресторан по ID
POST   /api/restaurants          # Создать ресторан
PUT    /api/restaurants/{id}     # Обновить ресторан
DELETE /api/restaurants/{id}     # Удалить ресторан
```

### Меню
```
GET    /api/restaurants/{id}/menu     # Получить меню ресторана
POST   /api/restaurants/{id}/menu     # Добавить блюдо в меню
PUT    /api/menu/{id}                 # Обновить блюдо
DELETE /api/menu/{id}                 # Удалить блюдо
```

### Бронирования
```
GET    /api/reservations              # Получить бронирования
POST   /api/reservations              # Создать бронирование
PUT    /api/reservations/{id}         # Обновить бронирование
DELETE /api/reservations/{id}         # Отменить бронирование
```

### Столики
```
GET    /api/restaurants/{id}/tables   # Получить столики ресторана
POST   /api/restaurants/{id}/tables   # Добавить столик
PUT    /api/tables/{id}               # Обновить столик
DELETE /api/tables/{id}               # Удалить столик
```

## 🧪 Тестирование

```bash
# Запуск unit тестов
npm run test

# Запуск тестов с покрытием
npm run test:coverage

# Запуск e2e тестов
npm run test:e2e
```

## 🚀 Деплой

### Frontend (Vercel)
1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой происходит автоматически при push в main

### Backend (Azure/AWS)
1. Настройте CI/CD pipeline
2. Настройте production базу данных
3. Настройте переменные окружения

## 🤝 Участие в разработке

1. **Fork** репозиторий
2. Создайте **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** изменения (`git commit -m 'Add amazing feature'`)
4. **Push** в branch (`git push origin feature/amazing-feature`)
5. Откройте **Pull Request**

### Правила разработки:
- Используйте TypeScript для всего кода
- Следуйте ESLint правилам
- Пишите тесты для новой функциональности
- Обновляйте документацию при необходимости

## 📝 Changelog

### v1.0.0 (2024-01-15)
- ✨ Первый релиз платформы
- 🏪 Система управления ресторанами
- 🍽️ Управление меню
- 📅 Система бронирования столиков
- 👤 Аутентификация пользователей

### v1.1.0 (2024-02-01)
- 🎨 Улучшенный UI/UX
- 📱 Мобильная адаптация
- 🔍 Расширенный поиск
- 📊 Аналитика для владельцев

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👨‍💻 Команда разработки

- **Frontend Developer**: [@marhaboo](https://github.com/marhaboo)
- **Backend Developer**: [Yusuf]


## 📞 Контакты

- **Email**: support@resnet.tj
- **Telegram**: [@resnet_support](https://t.me/resnet_support)
- **Website**: [https://quick-kiosk.vercel.app](https://quick-kiosk.vercel.app)

## 🙏 Благодарности

- [Next.js](https://nextjs.org/) за отличный фреймворк
- [shadcn/ui](https://ui.shadcn.com/) за красивые компоненты
- [Tailwind CSS](https://tailwindcss.com/) за удобную стилизацию
- [Framer Motion](https://www.framer.com/motion/) за плавные анимации

---

<div align="center">
  <p>Сделано с ❤️ для ресторанного бизнеса Душанбе</p>
  <p>© 2025 ResNet Platform. Все права защищены.</p>
</div>