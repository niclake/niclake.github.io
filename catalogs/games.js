// Scrapes Nic's HowLongToBeat profile for his Playing / Backlog / Completed game
// lists and writes them to src/_data/catalog/games.json, downloading each game's
// box art from HLTB into src/assets/images/games/ as small WebP thumbnails
// (committed + cached so we only fetch covers for newly-added games).
//
// HLTB has no public API. The profile list pages are a client-rendered SPA, so we
// render them with headless Chrome (--dump-dom) to get the populated DOM, then
// parse the rows. Cover art lives on each server-rendered /game/<id> detail page.
//
// Deps: built-in fetch (Node 18+) + child_process for Chrome; sharp to downscale
// covers. No secrets required. Optional env: HLTB_USER (default "niclake"), CHROME_PATH.

import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __siteroot = __dirname.replace("/catalogs", "");
const __dataTarget = path.join(__siteroot, "src", "_data", "catalog");
const __imgDir = path.join(__siteroot, "src", "assets", "images", "games");
const __outputFile = path.join(__dataTarget, "games.json");

const IMG_WEB_PATH = "/assets/images/games";
const COVER_WIDTH = 300; // box art renders ~150px wide; 300 covers 2x displays
const COVER_QUALITY = 80;
const HLTB_USER = process.env.HLTB_USER || "niclake";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// HLTB list slug -> catalog status used by the templates. The backlog list is
// intentionally not scraped — the page only shows Now Playing / Favorites /
// Completed, so there's no need to fetch + store ~280 unused backlog covers.
const LISTS = [
  { slug: "playing", status: "Playing" },
  { slug: "completed", status: "Finished" },
];

const MONTHS = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  try {
    const chrome = resolveChrome();
    console.log(`Using Chrome: ${chrome}`);
    console.log(`Scraping HowLongToBeat user: ${HLTB_USER}`);
    fs.mkdirSync(__imgDir, { recursive: true });

    const prior = loadPrior();

    const games = [];
    for (const { slug, status } of LISTS) {
      let rows = [];
      try {
        const html = await renderList(chrome, slug);
        rows = parseRows(html, status);
      } catch (err) {
        console.warn(`Render failed for "${slug}": ${err.message}`);
      }
      if (rows.length === 0) {
        // Don't wipe a list on a transient HLTB/Chrome hiccup — reuse prior data.
        const reused = prior.filter((g) => g.status === status);
        console.warn(`No rows parsed for "${slug}"; reusing ${reused.length} prior entries`);
        games.push(...reused);
        continue;
      }
      console.log(`${slug}: ${rows.length} games`);
      games.push(...rows);
    }

    // Ensure each game has a small WebP cover (downloads only new ones).
    let fetched = 0;
    for (const g of games) {
      const { coverPath, downloaded } = await ensureCover(g.hltbId);
      g.coverPath = coverPath;
      if (downloaded) {
        fetched++;
        await sleep(250); // be polite when fetching new covers
      }
    }
    console.log(`Covers: ${fetched} newly downloaded`);

    pruneOrphanedCovers(games);

    fs.writeFileSync(__outputFile, JSON.stringify(games));
    console.log(`Games catalog data generated successfully (${games.length} games)`);
  } catch (error) {
    console.error("Error generating games catalog data:", error);
    process.exit(1);
  }
}

function resolveChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ].filter(Boolean);
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error(
    "No Chrome/Chromium binary found. Set CHROME_PATH to a Chrome executable."
  );
}

async function renderList(chrome, slug) {
  const url = `https://howlongtobeat.com/user/${HLTB_USER}/games/${slug}/1`;
  const { stdout } = await execFileAsync(
    chrome,
    [
      "--headless=old",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      `--user-agent=${UA}`,
      "--virtual-time-budget=25000",
      "--dump-dom",
      url,
    ],
    { maxBuffer: 64 * 1024 * 1024, timeout: 90000 }
  );
  return stdout;
}

function parseRows(html, status) {
  // Each game row begins with its title link: <a href="/game/<id>">Title</a>.
  // Splitting on that boundary gives one chunk per row containing that row's cells.
  const chunks = html.split(/(?=<a [^>]*href="\/game\/)/);
  const rows = [];
  for (const chunk of chunks) {
    const m = chunk.match(/href="\/game\/(\d+)"[^>]*>([^<]+)/);
    if (!m) continue;
    const hltbId = m[1];
    const title = decodeEntities(m[2]).trim();
    if (!title) continue;

    // Visible cell text for this row (title first, then platform + columns).
    const cells = chunk
      .replace(/<[^>]+>/g, "|")
      .split("|")
      .map((s) => decodeEntities(s).trim())
      .filter(Boolean);

    // cells[0] is the title; cells[1] is the platform (when present). HLTB shows
    // "--" (sometimes "-- /") when no platform is recorded — treat that as none.
    let platform = cells[1] && !isDate(cells[1]) && !isPercent(cells[1])
      ? cells[1]
      : null;
    if (platform && /^--/.test(platform.trim())) platform = null;

    const entry = {
      hltbId,
      title,
      status,
      platform,
      hltbUrl: `https://howlongtobeat.com/game/${hltbId}`,
      dateFinished: null,
      rating: null,
      coverPath: null,
    };

    if (status === "Finished") {
      const dateCell = cells.find(isDate);
      entry.dateFinished = dateCell ? parseHltbDate(dateCell) : null;
      // HLTB's review column is a percentage (e.g. "85%"); convert to an X/10
      // score. "NR" (not reviewed) yields no match and stays null/blank.
      const pctCell = cells.find(isPercent);
      entry.rating = pctCell ? parseInt(pctCell, 10) / 10 : null;
    }

    rows.push(entry);
  }
  return rows;
}

const isDate = (s) => /^[A-Za-z]{3}\w*\s+\d{1,2}\w*,\s+\d{4}$/.test(s);
const isPercent = (s) => /^\d{1,3}%$/.test(s);

function parseHltbDate(s) {
  // "Apr 4th, 2026" -> "2026-04-04"
  const m = s.match(/^([A-Za-z]{3})\w*\s+(\d{1,2})\w*,\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS[m[1]];
  if (!month) return null;
  return `${m[3]}-${String(month).padStart(2, "0")}-${String(m[2]).padStart(2, "0")}`;
}

const webpPath = (hltbId) => path.join(__imgDir, `${hltbId}.webp`);
const webpWebPath = (hltbId) => `${IMG_WEB_PATH}/${hltbId}.webp`;

// Returns { coverPath, downloaded }. Reuses an existing WebP, otherwise migrates
// a legacy full-size original (jpg/png) in place, otherwise downloads from HLTB.
// All paths end at a downscaled WebP thumbnail.
async function ensureCover(hltbId) {
  if (fs.existsSync(webpPath(hltbId))) {
    return { coverPath: webpWebPath(hltbId), downloaded: false };
  }

  // Migrate a previously-downloaded full-size cover without re-fetching it.
  for (const ext of [".jpg", ".jpeg", ".png"]) {
    const legacy = path.join(__imgDir, hltbId + ext);
    if (fs.existsSync(legacy)) {
      await toWebp(legacy, hltbId);
      fs.rmSync(legacy);
      return { coverPath: webpWebPath(hltbId), downloaded: false };
    }
  }

  const ok = await downloadCover(hltbId);
  return { coverPath: ok ? webpWebPath(hltbId) : null, downloaded: ok };
}

async function toWebp(input, hltbId) {
  await sharp(input)
    .resize({ width: COVER_WIDTH, withoutEnlargement: true })
    .webp({ quality: COVER_QUALITY })
    .toFile(webpPath(hltbId));
}

async function downloadCover(hltbId) {
  try {
    // The detail page server-renders the box-art filename in __NEXT_DATA__.
    const pageRes = await fetch(`https://howlongtobeat.com/game/${hltbId}`, {
      headers: { "User-Agent": UA },
    });
    if (!pageRes.ok) {
      console.warn(`  cover: detail page ${hltbId} -> HTTP ${pageRes.status}`);
      return false;
    }
    const pageHtml = await pageRes.text();
    const m = pageHtml.match(/"game_image":"([^"]+)"/);
    if (!m) {
      console.warn(`  cover: no game_image for ${hltbId}`);
      return false;
    }
    // game_image is a JSON string value, so unescape sequences like & (&).
    let remoteFile = m[1];
    try {
      remoteFile = JSON.parse(`"${remoteFile}"`);
    } catch {
      /* keep raw if it isn't valid JSON-escaped */
    }
    const imgRes = await fetch(`https://howlongtobeat.com/games/${remoteFile}`, {
      headers: { "User-Agent": UA },
    });
    if (!imgRes.ok) {
      console.warn(`  cover: image ${remoteFile} -> HTTP ${imgRes.status}`);
      return false;
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    await toWebp(buf, hltbId);
    return true;
  } catch (err) {
    console.warn(`  cover: failed for ${hltbId}: ${err.message}`);
    return false;
  }
}

// Delete cover files for games no longer in any scraped list (e.g. backlog
// covers after that list was dropped, or games removed from HLTB).
function pruneOrphanedCovers(games) {
  const keep = new Set(games.map((g) => `${g.hltbId}.webp`));
  let removed = 0;
  for (const file of fs.readdirSync(__imgDir)) {
    if (file.endsWith(".webp") && !keep.has(file)) {
      fs.rmSync(path.join(__imgDir, file));
      removed++;
    }
  }
  if (removed > 0) console.log(`Pruned ${removed} orphaned cover(s)`);
}

function loadPrior() {
  if (!fs.existsSync(__outputFile)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(__outputFile, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

run();
