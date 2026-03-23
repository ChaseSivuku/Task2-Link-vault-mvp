# Link Vault (MVP)

Link Vault is a small MVP web app for organizing and managing personal links.

## What it includes

- Landing, sign up, and sign in screens
- Session + user registration stored in `localStorage`
- Link CRUD (create, read, update, delete)
- Search/filter for links
- Per-user local backup of fetched links (`links_<userId>`)

## Tech stack

- React (TypeScript + JSX)
- Vite
- CSS Modules
- Local `localStorage` auth for the MVP
- REST API integration for link data

## Expected link API

The frontend calls the following endpoints:

- `GET http://localhost:5000/links`
- `POST http://localhost:5000/links`
- `PUT http://localhost:5000/links/:id`
- `DELETE http://localhost:5000/links/:id`

The UI accepts the response from `GET /links` as either:

- an array of links, or
- an object shaped like `{ links: [...] }`

## Getting started

1. Install dependencies:
   - `npm install`
2. Start the frontend dev server:
   - `npm run dev`
3. Open the URL shown in the terminal.

Notes:

- Vite defaults to port `5173`. If it is already in use, it will switch to another port automatically.
- Make sure you also have a backend running on `http://localhost:5000` that provides the `links` endpoints listed above.

## Build and lint

- Build:
  - `npm run build`
- Lint:
  - `npm run lint`

## Limitations (MVP)

- Passwords are stored in plaintext in `localStorage` (MVP-only behavior).
- The link API base URL is currently hard-coded to `http://localhost:5000/links` in the frontend.

## Quick file map

- `src/App.tsx`: top-level view routing (landing/login/register/app)
- `src/contexts/AuthContext.tsx`: auth provider (MVP local auth)
- `src/contexts/useAuth.ts`: hook for accessing auth state
- `src/Components/LinkVault/LinkVault.tsx`: link list + CRUD integration
