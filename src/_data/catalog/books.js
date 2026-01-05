import currentlyReading from './currentlyReading.json' with { 'type': 'json' }
import allBooks from'./allReadBooks.json' with { 'type': 'json' }
import favoriteBooks from'./favoriteBooks.json' with { 'type': 'json' }
import readingGoals from'./readingGoals.json' with { 'type': 'json' }

export default async function () {
	const currentBooks = currentlyReading
	const favorites = favoriteBooks
	const goals = readingGoals
	const datedBooks = allBooks
		.filter((book) => book.lastRead !== null)
		.sort((a, b) => {return a.lastRead > b.lastRead ? -1 : 1;});

	// generate an array of books with yearRead as 'undated'
	const undatedBooks = allBooks.filter(
		(book) => book.lastRead === null
	);

	// Extract unique years and format them
	const uniqueYears = [
		...new Set(datedBooks.map((book) => book.lastRead.split("-")[0]))
	]
		.map((year) => `y${year}`)
		.sort((a, b) => b.slice(1) - a.slice(1)); // Sort in descending order

	// Generate the result array
	const years = uniqueYears.map((year) => ({ year }));
	if (undatedBooks.length > 0) {
		years.push({ year: "undated" });
	}
	return {
		current: currentBooks,
		datedBooks: datedBooks,
		undatedBooks: undatedBooks,
		favoriteBooks: favorites,
		readingGoals: goals,
		years: years,
	}
}