import filaments from './filaments.json' with { 'type': 'json' }

const BAMBU_SEARCH = "https://us.store.bambulab.com/search?q=";

export default async function () {
  // Resolve a product link for each filament: use the sheet's Link if present,
  // otherwise auto-fill Bambu's store search from the Identifier.
  const allFilaments = filaments.map((filament) => {
    let url = filament.link;
    if (!url && filament.identifier && /bambu/i.test(filament.brand || "")) {
      url = BAMBU_SEARCH + encodeURIComponent(filament.identifier);
    }
    // Active spool is 0-1000g; express as a 0-100 percent for the fill bar.
    const spoolPct = Math.max(0, Math.min(100, Math.round((Number(filament.activeSpool) || 0) / 10)));
    return { ...filament, url: url || "", spoolPct: spoolPct };
  });

  // Unique filament types (PLA Basic, PLA Matte, TPU, ...), sorted alphabetically
  const materials = [
    ...new Set(allFilaments.map((filament) => filament.filament).filter(Boolean))
  ].sort();

  // Group filaments under each type for the page sections
  const byMaterial = materials.map((material) => ({
    material: material,
    filaments: allFilaments.filter((filament) => filament.filament === material)
  }));

  return {
    allFilaments: allFilaments,
    materials: materials,
    byMaterial: byMaterial
  }
}
