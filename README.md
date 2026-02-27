# DevOnboard — Autonomous Developer Onboarding Agent (Frontend)

A modern React frontend for the AI-powered developer onboarding platform. Built with Vite, TailwindCSS v4, and Redux Toolkit.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🏗 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | TailwindCSS v4 (CSS-first config) |
| State | Redux Toolkit |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | DM Sans + DM Mono |

## 📁 Folder Structure

```
src/
├── assets/               # Static assets
├── components/
│   ├── chat/             # Chat interface components
│   ├── checklist/        # Checklist tracking components
│   ├── dashboard/        # HR analytics dashboard
│   ├── email/            # HR email generator
│   ├── layout/           # Sidebar and layout
│   └── ui/               # Reusable UI primitives
├── features/             # Redux slices (feature-based)
│   ├── chat/
│   ├── checklist/
│   ├── email/
│   ├── onboarding/
│   ├── persona/
│   └── theme/
├── hooks/                # Custom React hooks
├── pages/                # Top-level page components
├── store/                # Redux store setup
└── utils/                # Constants and mock data
```

## ✨ Features

- **Persona Detection** — Multi-step onboarding wizard to capture role, experience, and team
- **AI Chat Interface** — Simulated RAG-powered assistant with knowledge base responses
- **Dynamic Checklists** — Role + experience-based task lists with progress tracking
- **HR Email Generator** — Auto-generates structured completion emails with confidence scores
- **HR Dashboard** — Overview of all onboarding sessions with progress analytics
- **Light/Dark Mode** — System-aware theme with smooth transitions
- **Responsive Design** — Clean, minimal UI with DM Sans typography

## 🔌 Connecting to Backend

Replace the mock responses in `src/hooks/useAgentChat.js` and `src/utils/mockData.js` with real API calls:

```js
// src/hooks/useAgentChat.js
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: text, persona, sessionId }),
})
```

## 📦 Build

```bash
npm run build   # Production build
npm run preview # Preview production build
```

## 🎨 Theme Customization

CSS variables are defined in `src/index.css` under `:root` (light) and `.dark` (dark mode). Override any variable to customize the theme.
