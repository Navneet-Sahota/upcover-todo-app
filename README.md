# ✅ Todo App

A minimal yet fully functional Todo app built with **React + TypeScript**, featuring drag-and-drop, responsive design, and local persistence. Built with a focus on clean code, modular structure, and smooth UX.

---

## 🚀 Features

### ✅ Task Management

- Create, edit, delete tasks
- Mark tasks as complete/incomplete
- Tasks move automatically between sections

### ✅ UX Enhancements

- Confirmation modal on delete
- Prevents duplicate task names
- Validates required fields
- Smooth error handling with animated feedback

### ✅ State & Persistence

- Global state managed via Zustand
- LocalStorage sync on every change

### ✅ Responsive UI

- Mobile-first layout using MUI v6.4.2
- Inline form on desktop, modal on mobile
- Side-by-side task lists on desktop, stacked on mobile

### ✅ Drag & Drop

- Reorder tasks within each section
- Built with `@hello-pangea/dnd` for smooth performance

### ✅ Error Handling

- Global `ErrorBoundary` to catch unexpected crashes

---

## 🧪 Tests (Coming Soon)

Unit tests with:

- `Jest` + `React Testing Library`
- Task creation & validation
- Zustand store mocking
- Coverage for form behavior

---

## 🧱 Tech Stack

- React + TypeScript
- Material UI v6.4.2
- Zustand for state management
- Framer Motion for animation
- React Hook Form + Yup for validation
- `@hello-pangea/dnd` for drag & drop

## ▶️ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```
