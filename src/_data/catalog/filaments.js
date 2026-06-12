import filaments from './filaments.json' with { 'type': 'json' }
import eleventyImage, { generateHTML } from '@11ty/eleventy-img'

const BAMBU_SEARCH = "https://us.store.bambulab.com/search?q=";

// Build an optimized <picture> (WebP + fallback, responsive widths) for a
// filament image. Done here rather than via a shortcode because async
// shortcodes don't render reliably inside a Nunjucks {% include %} loop.
async function filamentImageHtml(filename, alt, isBambu) {
  const metadata = await eleventyImage(`./src/assets/images/filament/${filename}`, {
    widths: [200, 400, "auto"],
    formats: ["webp", "auto"],
    outputDir: "./_site/assets/images/filament/",
    urlPath: "/assets/images/filament/",
    cacheOptions: { duration: "*" },
  });
  // Bambu product renders fill the full card width (cover); other brands'
  // spool photos vary in shape, so fit them within the max height (contain).
  const fit = isBambu ? "object-fit-cover" : "object-fit-contain";
  return generateHTML(metadata, {
    alt: alt || "",
    loading: "lazy",
    decoding: "async",
    class: `w-100 ${fit}`,
    style: "height: 160px;",
    sizes: "(min-width: 992px) 25vw, 50vw",
  });
}

// Preferred display order for base colors (used to sort cards within a type).
const COLOR_ORDER = [
  'red', 'orange', 'yellow', 'green', 'blue', 'purple',
  'pink', 'brown', 'tan', 'black', 'gray', 'white', 'multicolor'
];
const colorRank = (baseColor) => {
  const i = COLOR_ORDER.indexOf((baseColor || '').toLowerCase());
  return i === -1 ? COLOR_ORDER.length : i;
};
// Stable sort a list by base-color order (ties keep sheet order).
const byColor = (list) => [...list].sort((a, b) => colorRank(a.baseColor) - colorRank(b.baseColor));

export default async function () {
  const allFilaments = await Promise.all(filaments.map(async (filament) => {
    const isBambu = /bambu/i.test(filament.brand || "");
    let url = filament.link;
    if (!url && filament.identifier && isBambu) {
      url = BAMBU_SEARCH + encodeURIComponent(filament.identifier);
    }

    const grams = Number(filament.activeSpool) || 0;
    const spares = Number(filament.spareSpools) || 0;
    // Active spool is 0-1000g; express as a 0-100 percent for the fill bar.
    const spoolPct = Math.max(0, Math.min(100, Math.round(grams / 10)));
    // Bar color: red at/under 10%, yellow at/under 20%, otherwise green.
    const barColor = spoolPct <= 10 ? 'var(--red)' : (spoolPct <= 20 ? 'var(--yellow)' : 'var(--green)');

    // Bambu black/white staples (PLA Basic + PLA Matte) we always want a full roll of.
    const isBWStaple = isBambu
      && (filament.filament === 'PLA Basic' || filament.filament === 'PLA Matte')
      && (filament.baseColor === 'Black' || filament.baseColor === 'White');

    // Low stock: highlighted (<=20%) with no spare, or a B&W staple with less
    // than one full roll on hand (active spool + spares, each roll = 1000g).
    const lowStock = (spoolPct <= 20 && spares === 0)
      || (isBWStaple && (grams + spares * 1000) < 1000);

    const imageHtml = filament.picture
      ? await filamentImageHtml(filament.picture, `${filament.brand} ${filament.color}`, isBambu)
      : "";

    return { ...filament, url: url || "", spoolPct: spoolPct, barColor: barColor, isBambu: isBambu, lowStock: lowStock, imageHtml: imageHtml };
  }));

  // Filament types in sheet order (first appearance), cards within sorted by color.
  const materials = [...new Set(allFilaments.map((filament) => filament.filament).filter(Boolean))];
  const byMaterial = materials.map((material) => ({
    material: material,
    filaments: byColor(allFilaments.filter((filament) => filament.filament === material))
  }));

  const lowStock = byColor(allFilaments.filter((filament) => filament.lowStock));

  return {
    allFilaments: allFilaments,
    materials: materials,
    byMaterial: byMaterial,
    lowStock: lowStock
  }
}
