import games from './games.json' with { 'type': 'json' }

export default async function () {
  const allGames = games.map((g) => ({
    ...g,
    platformSlug: g.platform ? g.platform.toLowerCase().replace(/ /g, '-') : null,
  }))

  const playing = allGames.filter((game) => game.status === "Playing")

  const finished = allGames.filter((game) => game.status === "Finished")

  // Favorites: every game rated 90%+ (rating is out of 10), sorted by rating desc then title asc.
  const favorites = allGames
    .filter((game) => game.rating != null && game.rating >= 9)
    .sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title))

  // Favorites grouped by rating percentage for section dividers.
  const favoritesMap = {}
  for (const game of favorites) {
    const pct = Math.round(game.rating * 10)
    if (!favoritesMap[pct]) favoritesMap[pct] = []
    favoritesMap[pct].push(game)
  }
  const favoriteGroups = Object.entries(favoritesMap)
    .sort(([a], [b]) => b - a)
    .map(([pct, games]) => ({ pct: parseInt(pct), games }))

  // Finished games with a completion date, newest first.
  const datedFinished = finished
    .filter((game) => game.dateFinished)
    .sort((a, b) => (a.dateFinished > b.dateFinished ? -1 : 1))

  // Finished games without a completion date.
  const undatedFinished = finished.filter((game) => !game.dateFinished)

  // Unique years (descending) for the year-jump navigation, mirroring the bookshelf.
  const uniqueYears = [
    ...new Set(datedFinished.map((game) => game.dateFinished.split("-")[0]))
  ]
    .map((year) => `y${year}`)
    .sort((a, b) => b.slice(1) - a.slice(1))

  const years = uniqueYears.map((year) => ({ year }))
  if (undatedFinished.length > 0) {
    years.push({ year: "undated" })
  }

  return {
    allGames: allGames,
    playing: playing,
    favorites: favorites,
    favoriteGroups: favoriteGroups,
    datedFinished: datedFinished,
    undatedFinished: undatedFinished,
    years: years,
  }
}
