import deskmats from './deskmats.json' with { 'type': 'json' }

export default async function () {
  const allDeskmats = deskmats
  const catalogDeskmats = allDeskmats.filter((deskmat) => deskmat.status !== "Wishlist")
  const wishlistDeskmats = allDeskmats.filter((deskmat) => deskmat.status === "Wishlist")

  return {
    allDeskmats: allDeskmats,
    catalogDeskmats: catalogDeskmats,
    wishlistDeskmats: wishlistDeskmats
  }
}
