# My Seattle Guide

An interactive pastel map of Seattle — libraries, the Northeastern Seattle campus, and fun spots to wander. Built with Next.js + Leaflet, hosted on Netlify.

## Stack

- **Next.js 16** (pages router) + **React 19**
- **react-leaflet 5** + **Leaflet 1.9** with CartoDB Voyager pastel tiles
- **Netlify** hosting (Next plugin auto-injected at build)

## Local dev

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm run start
```

## Adding a place

Edit `data/places.js` and append an entry:

```js
{
  id: 'kebab-slug',
  name: 'Display name',
  category: 'libraries' | 'campus' | 'fun',
  coords: [lat, lng],
  address: 'Street, City, State ZIP',
  image: 'https://images.unsplash.com/photo-XXXX?w=600&auto=format&fit=crop&q=70',
  description: 'One or two sentences.',
  url: 'https://optional-homepage.example',
}
```

The sidebar, filters, and map pick it up automatically.

## Deploy

Push to the branch connected in Netlify — the site rebuilds on push. The Netlify Next.js plugin is auto-detected; `netlify.toml` only defines the build command and publish directory.

## Backup

The previous version of this project (a Valentine's Day cat quiz) lives on the `quiz-backup` branch.
