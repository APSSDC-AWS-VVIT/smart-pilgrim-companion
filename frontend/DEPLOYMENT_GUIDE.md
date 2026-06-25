# Deployment Guide

## Local Run

1. Install dependencies in `frontend/`.
2. Start the Vite dev server with `npm run dev`.
3. Ensure the backend is available at the URL in `VITE_API_URL` from `.env`.

## Render Backend

- Production API base: `https://smart-pilgrim-companion-api.onrender.com`
- The frontend reads this from `.env.production` via `VITE_API_URL`.
- API requests are routed through `frontend/src/services/api.js`.

## GitHub Pages Deploy

1. Install frontend dependencies.
2. Run `npm run deploy` from `frontend/`.
3. `predeploy` runs the production build automatically.
4. `gh-pages -d dist` publishes the generated site.

## Rollback

- Revert the most recent GitHub Pages publish by redeploying a previous commit.
- If needed, restore the prior `dist` output by rerunning `npm run build` from the target commit.

## Future AWS Deployment

- Keep `VITE_API_URL` pointed at the AWS-hosted backend when you move off Render.
- Adjust `VITE_BASE_PATH` to `/` if you deploy the frontend at a root domain instead of a GitHub Pages subpath.
- The app keeps local development separate from production through `.env` and `.env.production`.