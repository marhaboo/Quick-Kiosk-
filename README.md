  # 🍽️ ResNet — Restaurant Network Platform

  ResNet — это веб‑платформа, которая объединяет рестораны, кафе и бары Душанбе.  
  Владельцы заведений могут добавлять свои рестораны, а пользователи — просматривать меню, фото и бронировать столики.  

  ---

  ## 🚀 Стек технологий

  - **Frontend:** [Next.js](https://nextjs.org/) + TypeScript  
  - **UI:** TailwindCSS, shadcn/ui, Framer Motion  
  - **State Management:** Redux Toolkit  
  - **Backend:** ASP.NET Core Web API (C#)  
  - **Документация API:** [Swagger](http://45.153.68.77:5001/swagger/index.html)  
  - **База данных:** SQL Server 

  ---

  ## ⚙️ Установка и запуск фронтенда

  1. Клонируй репозиторий:

  ```bash
  git clone https://github.com/marhaboo/Quick-Kiosk-.git
  cd Quick-Kiosk-
## ⚙️ Установка и запуск фронтенда
  ```

  2. Установи зависимости:
```bash
npm install
```
  3. Запусти проект в режиме разработки:
```bash
npm run dev
```

Фронтенд будет доступен по адресу:
👉 http://localhost:3000

 4. Сборка и запуск production версии:
 ```bush
npm run build
npm run start
```

 5. Запуск линтинга (опционально):
 ```bush
npm run lint
```

 ## 📂 Структура проекта (Frontend)
 ```bush
 src/
 ├── app/              # Next.js App Router
 ├── components/       # UI компоненты
 ├── features/         # Redux slices / бизнес-логика
 ├── widgets/          # Виджеты (сборки компонентов)
 ├── shared/           # Общие UI элементы
 └── types/            # TypeScript типы
```



