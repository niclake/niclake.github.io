const { DateTime } = require('luxon')

module.exports = {
  bookStatus: (books, status) => {books.filter(book => book.status === status)},
  bookSortDescending: (books) => books.filter(book => !isNaN(DateTime.fromISO(book.compDate).toMillis())).sort((a, b) => {
    const dateA = DateTime.fromISO(a.compDate)
    const dateB = DateTime.fromISO(b.compDate)
    return dateB - dateA
  }),
  bookFinishedYear: (books, year) => books.filter(book => {
    if (book.read === 'X' && book.compDate) return parseInt(book.compDate.split('/')[2] + 2000) === year
    return ''
  }),
  currentBookCount: (books) => {
    const year = DateTime.now().year
    return year
    return books.filter(book => {
      if (book.read === 'X' && book.compDate) return parseInt(book.compDate.split('/')[2] + 2000) === year
      return ''
    }).length
  },
}