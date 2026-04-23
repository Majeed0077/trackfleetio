# Track Fleetio

Track Fleetio is a Next.js App Router storefront for fleet tracking products, industries, and solution pages. The project was migrated from a static HTML prototype and now uses TypeScript, reusable React components, and Zustand for persisted client state.

## Stack

- Next.js App Router
- TypeScript
- Zustand
- Original prototype CSS

## Project Structure

```text
app/          Route files, layouts, and metadata
components/   Shared UI and page-level React components
data/         Static typed data sources
lib/          Helpers and metadata utilities
public/       Images and media assets
store/        Zustand state
styles/       Main global stylesheet
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Environment Variables

Create `.env.local` before running the app locally:

```bash
TRACKFLEETIO_AUTH_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

`TRACKFLEETIO_AUTH_SECRET` is mandatory and should be a long random value used to sign session cookies.

## Notes

- `src/` is intentionally not used. Next.js supports root-level `app/`, `components/`, `lib/`, `store/`, and `public/` without any issue.
- Product, industry, and solution pages are route-driven with the App Router.
- Cart, wishlist, checkout, and demo auth state persist through Zustand.
