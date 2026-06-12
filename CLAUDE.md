# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website and blog for Nic Lake, served at https://niclake.me. It's an [Eleventy (11ty) v3](https://www.11ty.dev/) static site (ESM, `"type": "module"`) deployed to GitHub Pages. The `master` branch auto-builds and deploys via `.github/workflows/build.yml` on push, on manual dispatch, and every 6 hours (the scheduled rebuild refreshes external catalog data).

## Commands

- `npm run fresh` — full local dev: clears `_site`, regenerates catalog data, then serves with live reload. **This requires `.env` secrets** (see below) since it runs the catalog scripts.
- `npm start` — serve with live reload **without** regenerating catalog data (`eleventy --serve --quiet`). Use this when you don't have catalog secrets or don't need fresh external data; existing `src/_data/catalog/*.json` is reused.
- `npm run build` / `npm run make` — production build (`make` also clears `_site` first).
- `npm run catalog` — only regenerate external catalog data (`catalogs/hardcover.js` + `catalogs/keyboards.js`).
- `npm run new-post "Post Title"` — scaffold a new draft from `src/posts/_PostTemplate.md` into `src/posts/<year>/<date>-<slug>.md` and open it in an editor.
- `DEBUG=Eleventy* npx eleventy` — verbose build debugging.

There is no test suite. `.markdownlint.json` configures markdown linting (many rules disabled).

## Drafts and scheduled posts

Post visibility is controlled by `config/drafts.js` (`shouldBuild`):
- A post is excluded from production builds if `draft: true` **or** its `date` is in the future (scheduled).
- During `--serve`/`--watch`, `.eleventy.js` sets `process.env.BUILD_DRAFTS = true`, so drafts and future-dated posts **are** visible locally but not in production.
- This is implemented via `eleventyComputed.permalink` (returns `false` to skip output) and `eleventyComputed.eleventyExcludeFromCollections` in `.eleventy.js`.

The `new-post.sh` template seeds `date: THEDATETTHETIMEZ` as a placeholder. The git **pre-commit hook** (`hooks/pre-commit`) replaces that placeholder with the current UTC timestamp on staged files in `src/posts/` at commit time. Install hooks with `./install-hooks.sh` (runs automatically as the npm `postinstall` script).

## Architecture

`.eleventy.js` is the entry point but stays thin — most configuration is modularized under `config/` and wired up by iterating exported objects/arrays:
- `config/plugins.js` — array of Eleventy plugins (navigation, RSS, syntax highlight, Sass→LightningCSS, post-graph). The image transform plugin is present but commented out.
- `config/collections.js` — custom collections (e.g. `postsForFeed`).
- `config/shortcodes.js` — shortcodes. `.eleventy.js` also adds an inline `svg` shortcode (inlines files from `src/assets/*.svg`) and a `markdown` paired shortcode.
- `config/filters/date.js` — date filters (registered via the `dateFilters` loop). `config/filters/posts.js` exists but its registration is commented out.
- Dates: timezone is hardcoded to `America/Chicago`; a custom `addDateParsing` handler in `.eleventy.js` normalizes YAML `Date` objects and ISO strings via Luxon. Note the codebase mixes **Luxon** and **moment** for date logic.

Eleventy dirs: input `src`, output `_site`, data `src/_data`. Templates use both Nunjucks (`.njk`) and Liquid (Liquid root is `src/_includes`).

Source layout:
- `src/posts/` — blog posts organized by year; `posts.json` applies `layout: post.njk` + `tags: post` to all.
- `src/old_posts/` — archived legacy posts.
- `src/pages/` — standalone pages (`now`, `then`, `uses`, `bookshelf`, `keyboards`, `wishlist`, etc.); `pages.json` applies `layout: page.njk`.
- `src/_includes/` — layouts and partials (`.njk`).
- `src/_data/` — global data (`site.json`, `navigation.json`, `colors.json`, `wishlist/*.json`) plus the generated `catalog/` data.
- `src/assets/` — CSS (Sass), JS, images; passed through to the build.

## External catalog data (`catalogs/`)

The `catalogs/` scripts fetch data from external services and **write JSON into `src/_data/catalog/`**, which Eleventy then consumes as global data. These run before every build (and on the 6-hour CI schedule).

- `catalogs/hardcover.js` — queries the Hardcover GraphQL API for reading goals, currently-reading, favorites, and all read books → `readingGoals.json`, `currentlyReading.json`, `favoriteBooks.json`, `allReadBooks.json`.
- `catalogs/keyboards.js` — reads a Google Sheet (via service account) → `keyboards.json`.
- `src/_data/catalog/books.js` — a data file that *imports and reshapes* the generated JSON (sorts dated books, groups by year, separates undated) for templates to use. Do not hand-edit the generated `*.json`; change the generator scripts instead.

`catalogs/` has its **own `package.json`** (separate dependencies like `node-fetch`, `google-spreadsheet`); CI runs `npm install` inside it before generating data.

### Required environment variables (`.env`, git-ignored)

Catalog generation fails fast if these are missing. In CI they come from GitHub secrets.
- `HARDCOVER_API_KEY`, `HARDCOVER_USER_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `KEEBS_SHEET_ID`

Without these, use `npm start` to develop against the committed catalog JSON rather than `npm run fresh`.
