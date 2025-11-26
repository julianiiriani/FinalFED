# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Project: Pinjam Dulu (Loan and Borrow digital announcement app)

This repository contains a small React + Vite application with Tailwind CSS for styling and JSON Server as a simple REST API backend (db.json). The app demonstrates full CRUD operations: GET, POST, PUT, DELETE.

### Local development

1. Install dependencies

```powershell
npm install
```

2. Start JSON Server (backend API)

```powershell
npm run server
```

3. Start the development server (Vite)

```powershell
npm run dev
```

Visit http://localhost:5173 (Vite) and ensure JSON Server runs on http://localhost:3000.

Alternatively, run both servers in a single terminal (dev + JSON server) using the `start` script:

```powershell
npm run start
```

### Features
- List items (GET)
- Add item (POST)
- Edit item (PUT)
- Delete item (DELETE)

### Notes
- The `db.json` file contains the sample data and is used by JSON Server.
- This project uses small, reusable React components and Tailwind CSS for styling.

