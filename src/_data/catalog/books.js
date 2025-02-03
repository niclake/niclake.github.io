const theBooks = require('./books.json')

module.exports = function() {
	const currentBook = theBooks.filter(book => book.status === 'In Progress')
	const datedBooks = theBooks
		.filter(
			(book) => book.read === true && book.compDate !== ""
		)
		.sort((a, b) => {
			return a.compDate > b.compDate ? -1 : 1;
		});

	// generate an array of books with yearRead as 'undated'
	const undatedBooks = theBooks.filter(
		(book) => book.read === true && book.compDate === ""
	);

	// Extract unique years and format them
	const uniqueYears = [
		...new Set(datedBooks.map((book) => book.compDate.split("/")[0])),
	]
		.map((year) => `y${year}`)
		.sort((a, b) => b.slice(1) - a.slice(1)); // Sort in descending order

	// Generate the result array
	const years = uniqueYears.map((year) => ({ year }));
	years.push({ year: "undated" });
	return {
		current: currentBook,
		datedBooks: datedBooks,
		undatedBooks: undatedBooks,
		years: years,
		count: theBooks.length,
	}
}