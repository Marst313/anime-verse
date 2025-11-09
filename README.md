# 🎌 Animeverse – Anime Search App

A two-page anime search application built using **React**, **TypeScript**, **Vite**, **Redux Toolkit**, and **TanStack Query**, integrated with the **Jikan API** to explore anime data with instant search and detailed views.

---

## 🚀 Getting Started

### 🧩 Prerequisites

- Node.js **v18+**
- npm (**Yarn** and **pnpm** are _not supported_)

### ⚙️ Installation

```bash
npm install
npm run dev
```

---

## 📜 Scripts

| Command                     | Description                         |
| --------------------------- | ----------------------------------- |
| `npm install`               | Installs all dependencies           |
| `npm run dev` / `npm start` | Starts the dev server on port 4000  |
| `npm run build`             | Builds the app for production       |
| `npm run preview`           | Serves the production build locally |
| `npm run test`              | Runs tests using Vitest             |
| `npm run lint`              | Checks code quality with ESLint     |
| `npm run lint:fix`          | Fixes linting issues automatically  |
| `npm run format`            | Formats files using Prettier        |
| `npm run format:check`      | Checks formatting consistency       |
| `npm run type-check`        | Verifies TypeScript types           |

---

## 🧠 Tech Stack

| Layer                | Library / Tool                 |
| -------------------- | ------------------------------ |
| **Framework**        | React 19 + TypeScript          |
| **Bundler**          | Vite 6                         |
| **State Management** | Redux Toolkit                  |
| **Data Fetching**    | TanStack Query (React Query)   |
| **Routing**          | React Router v7                |
| **UI Library**       | Material UI (MUI)              |
| **Styling**          | Emotion                        |
| **Testing**          | Vitest + React Testing Library |
| **Linting**          | ESLint + Prettier              |

---

## 📖 Project Overview

This project demonstrates a modern **React** application with **typed state management**, **clean architecture**, and **responsive UI**.

### 🗺️ Pages

#### 1️⃣ Search Page

- Search for anime titles via the **Jikan API**
- Server-side pagination
- Instant search with **250ms debounce**
- Cancels in-flight API calls
- Displays anime cards with image, title, and score

#### 2️⃣ Anime Detail Page

- Displays detailed info (synopsis, score, genres, episodes)
- Accessed via `/anime/:id`

#### 3️⃣ Not Found Page

- Handles invalid routes gracefully with a **custom 404 layout**

---

## 🧩 Folder Structure

```
animeverse/
├── src/
│   ├── components/      # Reusable UI components
│   ├── utils/hooks/     # Custom hooks
│   ├── pages/           # Main pages
│   ├── store/           # Redux store and slices
│   ├── types/           # TypeScript types
│   ├── main.tsx         # React root render
│   └── index.css
├── public/
├── vite.config.ts
├── tsconfig.json
├── package.json
├── PROMPTS.md           # AI usage documentation
└── README.md
```

---

## 💎 Bonus Implementation

| Feature             | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| ✅ **Genre Filter** | Allows users to filter anime by selected genres dynamically   |
| ✅ **Pagination**   | Supports server-side pagination with page state synced to URL |

---

## 🧑‍💻 Author

**I Nyoman Karma Dharma Nalendra Wardana**  
🔗 [GitHub](https://github.com/Marst313) • [Portfolio](https://inyomandharma.vercel.app/) • [LinkedIn](https://www.linkedin.com/in/i-nyoman-karma-dharma-nalendra-wardana/)
