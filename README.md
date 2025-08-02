# 🍽️ ResNet Frontend — Restaurant Network Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?style=for-the-badge&logo=redux" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Framer_Motion-10-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
</div>

<br />

**ResNet Frontend** — современный веб-интерфейс для платформы, объединяющей рестораны, кафе и бары Душанбе. Построен на Next.js 15 с использованием App Router, TypeScript и современных UI библиотек.

## ✨ Основные возможности

### 🎨 UI/UX Features
- **🌙 Dark/Light Mode** — переключение темы оформления
- **📱 Responsive Design** — адаптивный дизайн для всех устройств
- **⚡ Fast Loading** — оптимизированная загрузка с Next.js
- **🎭 Smooth Animations** — плавные анимации с Framer Motion


### 👥 Пользовательские функции
- **🔍 Поиск ресторанов** — найдите идеальное место для ужина
- **📱 Просмотр меню** — интерактивные карточки блюд с фото
- **🖼️ Галерея фото** — красивые галереи заведений
- **📅 Бронирование столиков** — интуитивная система бронирования
- **⭐ Отзывы и рейтинги** — система отзывов с рейтингами

### 🏪 Панель управления для владельцев
- **🏢 Управление рестораном** — полная информация о заведении
- **🍽️ Управление меню** — drag-and-drop редактор меню
- **🪑 Управление столиками** — визуальная схема столов
- **📊 Аналитика** — интерактивные графики и статистика
- **📸 Медиа менеджер** — загрузка и управление фотографиями
- **💬 Центр уведомлений** — real-time уведомления

## 🚀 Технологический стек

### Core Framework
- **Next.js 15** — React фреймворк с App Router
- **TypeScript 5** — статическая типизация
- **React 18** — с Server Components и Suspense

### Styling & UI
- **TailwindCSS 3** — utility-first CSS фреймворк
- **shadcn/ui** — высококачественные React компоненты
- **Framer Motion** — анимации и переходы
- **Lucide React** — современные SVG иконки
- **next-themes** — управление темами

### State Management
- **Redux Toolkit** — предсказуемое управление состоянием
- **React Hook Form** — производительные формы
- **Zod** — валидация схем TypeScript-first

### Development Tools
- **ESLint** — линтинг кода
- **Prettier** — форматирование кода
- **Husky** — Git hooks
- **lint-staged** — линтинг staged файлов

## ⚙️ Установка и запуск

### Предварительные требования
- **Node.js** 18.17 или выше
- **npm** 9.0 или выше (или yarn/pnpm)
- **Git**

### 🚀 Быстрый старт

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/marhaboo/Quick-Kiosk-.git
cd Quick-Kiosk-
```

2. **Установите зависимости:**
```bash
npm install
# или с yarn
yarn install
# или с pnpm
pnpm install
```

3. **Настройте переменные окружения:**
```bash
cp .env.example .env.local
```

Отредактируйте `.env.local`:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_API_VERSION=v1

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="ResNet"

# Features Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_GEOLOCATION=true

# Third-party Services (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

4. **Запустите проект в режиме разработки:**
```bash
npm run dev
```

Приложение будет доступно по адресу: 👉 **http://localhost:3000**

### 📦 Доступные скрипты

```bash
# Разработка
npm run dev          # Запуск dev сервера
npm run dev:turbo    # Запуск с Turbopack (экспериментально)

# Сборка
npm run build        # Production сборка
npm run start        # Запуск production сборки
npm run export       # Статический экспорт

# Качество кода
npm run lint         # ESLint проверка
npm run lint:fix     # Автоисправление ESLint ошибок
npm run type-check   # TypeScript проверка типов
npm run format       # Prettier форматирование

# Тестирование
npm run test         # Запуск тестов
npm run test:watch   # Тесты в watch режиме
npm run test:coverage # Тесты с покрытием кода
npm run test:e2e     # End-to-end тесты

# Анализ
npm run analyze      # Анализ размера бандла
npm run lighthouse   # Lighthouse аудит
```

## 📂 Архитектура проекта

### Структура папок
```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Route Groups
│   │   ├── login/               # Страница входа
│   │   ├── register/            # Страница регистрации
│   │   └── layout.tsx           # Layout для auth страниц
│   ├── (dashboard)/             # Панель управления
│   │   ├── analytics/           # Аналитика
│   │   ├── menu/               # Управление меню
│   │   ├── reservations/       # Бронирования
│   │   ├── restaurants/        # Управление рестораном
│   │   ├── tables/             # Управление столиками
│   │   └── layout.tsx          # Dashboard layout
│   ├── restaurants/            # Публичные страницы ресторанов
│   │   ├── [id]/              # Динамический маршрут
│   │   │   ├── menu/          # Меню ресторана
│   │   │   ├── gallery/       # Галерея фото
│   │   │   ├── reviews/       # Отзывы
│   │   │   └── page.tsx       # Главная страница ресторана
│   │   └── page.tsx           # Список ресторанов
│   ├── search/                # Поиск и фильтры
│   ├── profile/               # Профиль пользователя
│   ├── globals.css            # Глобальные стили
│   ├── layout.tsx             # Root layout
│   ├── loading.tsx            # Глобальный loading UI
│   ├── error.tsx              # Глобальный error UI
│   ├── not-found.tsx          # 404 страница
│   └── page.tsx               # Главная страница
├── components/                 # Переиспользуемые компоненты
│   ├── ui/                    # shadcn/ui базовые компоненты
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   └── ...
│   ├── forms/                 # Формы
│   │   ├── login-form.tsx
│   │   ├── restaurant-form.tsx
│   │   ├── booking-form.tsx
│   │   └── ...
│   ├── layout/                # Layout компоненты
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── navigation.tsx
│   ├── features/              # Feature-specific компоненты
│   │   ├── restaurant-card.tsx
│   │   ├── menu-item.tsx
│   │   ├── table-grid.tsx
│   │   ├── booking-modal.tsx
│   │   └── ...
│   └── common/                # Общие компоненты
│       ├── loading-spinner.tsx
│       ├── error-boundary.tsx
│       ├── search-bar.tsx
│       └── ...
├── store/                     # Redux store
│   ├── index.ts              # Store configuration
│   ├── middleware.ts         # Custom middleware
│   └── slices/               # Redux slices
│       ├── auth.ts
│       ├── restaurants.ts
│       ├── menu.ts
│       ├── reservations.ts
│       ├── tables.ts
│       └── ui.ts
├── hooks/                     # Custom React hooks
│   ├── use-auth.ts
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   ├── use-media-query.ts
│   └── ...
├── lib/                       # Утилиты и конфигурация
│   ├── api.ts                # API client configuration
│   ├── auth.ts               # Authentication utilities
│   ├── utils.ts              # Общие утилиты
│   ├── validations.ts        # Zod схемы валидации
│   ├── constants.ts          # Константы приложения
│   └── types.ts              # Глобальные TypeScript типы
├── styles/                    # Дополнительные стили
│   ├── components.css        # Стили компонентов
│   └── utilities.css         # Utility классы
└── public/                    # Статические файлы
    ├── images/
    ├── icons/
    ├── favicon.ico
    └── manifest.json
```

### Архитектурные принципы

#### 🏗️ Feature-Sliced Design
Проект следует принципам Feature-Sliced Design для лучшей масштабируемости:

- **Pages** — страницы приложения (Next.js App Router)
- **Features** — бизнес-функции (бронирование, меню, etc.)
- **Entities** — бизнес-сущности (ресторан, пользователь, etc.)
- **Shared** — переиспользуемые ресурсы

#### 🔄 State Management Pattern
```typescript
// Пример Redux slice
interface RestaurantState {
  restaurants: Restaurant[]
  currentRestaurant: Restaurant | null
  loading: boolean
  error: string | null
  filters: RestaurantFilters
}

// RTK Query для API calls
const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/restaurants',
  }),
  tagTypes: ['Restaurant'],
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], RestaurantFilters>({
      query: (filters) => ({ url: '', params: filters }),
      providesTags: ['Restaurant'],
    }),
  }),
})
```

## 🎨 UI/UX Guidelines

### Design System
- **Colors**: Tailwind CSS цветовая палитра с кастомными оттенками
- **Typography**: Inter шрифт для читаемости
- **Spacing**: 8px grid система
- **Border Radius**: Консистентные скругления (4px, 8px, 12px)
- **Shadows**: Тонкие тени для глубины

### Component Patterns
```typescript
// Пример компонента с правильной типизацией
interface RestaurantCardProps {
  restaurant: Restaurant
  variant?: 'default' | 'compact' | 'featured'
  onBookingClick?: (restaurantId: string) => void
  className?: string
}

export function RestaurantCard({ 
  restaurant, 
  variant = 'default',
  onBookingClick,
  className 
}: RestaurantCardProps) {
  // Component implementation
}
```

### Responsive Breakpoints
```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

## 🔧 Конфигурация

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['localhost', 'api.resnet.tj'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          500: '#f97316',
          900: '#9a3412',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

## 🧪 Тестирование

### Testing Stack
- **Jest** — unit тестирование
- **React Testing Library** — тестирование компонентов
- **Playwright** — E2E тестирование
- **MSW** — мокирование API

### Примеры тестов
```typescript
// Component test
import { render, screen } from '@testing-library/react'
import { RestaurantCard } from './restaurant-card'

describe('RestaurantCard', () => {
  it('renders restaurant information correctly', () => {
    const mockRestaurant = {
      id: '1',
      name: 'Test Restaurant',
      cuisine: 'Italian',
      rating: 4.5,
    }

    render(<RestaurantCard restaurant={mockRestaurant} />)
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument()
    expect(screen.getByText('Italian')).toBeInTheDocument()
  })
})
```

## 🚀 Деплой и CI/CD

### Vercel Deployment
```bash
# Автоматический деплой при push в main
git push origin main

# Ручной деплой
vercel --prod
```

### Environment Variables
```bash
# Production environment variables
NEXT_PUBLIC_API_URL=https://api.resnet.tj/api
NEXT_PUBLIC_APP_URL=https://resnet.tj
NEXT_PUBLIC_SENTRY_DSN=your_production_sentry_dsn
```

### Performance Optimization
- **Image Optimization** — Next.js Image component
- **Code Splitting** — автоматическое разделение кода
- **Bundle Analysis** — анализ размера бандла
- **Caching** — агрессивное кэширование статических ресурсов

## 📊 Мониторинг и аналитика

### Performance Monitoring
- **Core Web Vitals** — отслеживание метрик производительности
- **Sentry** — мониторинг ошибок
- **Google Analytics** — аналитика пользователей
- **Lighthouse CI** — автоматический аудит производительности

### Error Handling
```typescript
// Error boundary example
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary-500 text-white rounded-lg"
      >
        Try again
      </button>
    </div>
  )
}
```

## 🤝 Contributing

### Development Workflow
1. **Fork** репозиторий
2. Создайте **feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit** изменения: `git commit -m 'feat: add amazing feature'`
4. **Push** в branch: `git push origin feature/amazing-feature`
5. Создайте **Pull Request**

### Code Style Guidelines
- Используйте **TypeScript** для всего кода
- Следуйте **ESLint** и **Prettier** правилам
- Пишите **meaningful commit messages** (Conventional Commits)
- Добавляйте **JSDoc** комментарии для сложных функций
- Покрывайте новую функциональность **тестами**

### Commit Convention
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

## 📚 Полезные ресурсы

### Документация
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

### Инструменты разработки
- [VS Code Extensions](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools)

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👨‍💻 Команда

- **Lead Frontend Developer**: [@marhaboo](https://github.com/marhaboo)
- **UI/UX Designer**: [Designer Name]

## 📞 Поддержка

- **Issues**: [GitHub Issues](https://github.com/marhaboo/Quick-Kiosk-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/marhaboo/Quick-Kiosk-/discussions)
- **Email**: frontend@resnet.tj

---

<div align="center">
  <p>Построено с ❤️ используя Next.js, TypeScript и современные веб-технологии</p>
  <p>© 2025 ResNet Frontend. Все права защищены.</p>
</div>

