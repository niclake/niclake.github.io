import games from './games.json' with { 'type': 'json' }

export default async function () {
  const allGames = games

  const playing = allGames.filter((game) => game.status === "Playing")

  const finished = allGames.filter((game) => game.status === "Finished")

  // Favorites: every game rated 90%+ (rating is out of 10), alphabetized by title.
  const favorites = allGames
    .filter((game) => game.rating != null && game.rating >= 9)
    .sort((a, b) => a.title.localeCompare(b.title))

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
    datedFinished: datedFinished,
    undatedFinished: undatedFinished,
    years: years,
  }
}
