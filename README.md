# NaiveBay

Web front end for NaiveBay, an online auction site. It talks to a Django REST API (the NaiveBayBack project, by the same authors), which is not published yet.

Built for the course Desarrollo de Aplicaciones y Servicios (Comillas ICAI, January to May 2025). The course documentation for the three sprints and the mockups are in `documentation/` (in Spanish).

## What it does

Pages, under `src/app`:

- `/` home page with two product rows (Trending, Ending Soon).
- `/login` and `/register`.
- `/auctions` auction list with search, category, price, rating and open or closed filters.
- `/detail/[id]` auction detail with bids, average rating, star rating and comments.
- `/edit/auction`, `/edit/[id]`, `/edit/bid`, `/edit/comment` forms to create or change auctions, bids and comments. Auctions accept an image URL or an uploaded image.
- `/myauctions`, `/mybids`, `/mycomments`, `/myratings` lists of the logged in user's own items.
- `/user` profile view and update, password change and logout.

The access token is kept in `localStorage` and sent as a Bearer token. When it has expired the user is sent back to the login page.

## Stack

Next.js 15 (App Router), React 19, Material UI 6, CSS modules. `servidor.py` and `test_servidor.py` are a small Python HTTP server and its tests from an earlier lab, run by the workflow in `.github/workflows/ci.yaml`.

## Run locally

Start the API from NaiveBayBack first, then:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the API, including `/api`. Defaults to `http://127.0.0.1:8000/api`. |

Set it in `.env.local` when the API runs somewhere else, for example `NEXT_PUBLIC_API_URL=https://example.com/api`.

## Authors

- Pablo Tuñón Laguna
- Sergio Jiménez Romero

## Licence

MIT, see `LICENSE`.
