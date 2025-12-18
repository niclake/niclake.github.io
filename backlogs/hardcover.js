import 'dotenv/config'
import fetch from 'node-fetch';
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const __siteroot = __dirname.replace('/backlogs', '');
const __target = '/src/_data/catalog/'

async function run() {
  getGoals();
  getCurrentlyReading();
  getFavoriteBooks();
  getAllReadBooks();
}

async function getGoals() {
  const query = `{
    me {
      id
      goals(order_by: {start_date: desc}) {
        description
        progress
        goal
      }
    }
  }`;

  let response = await queryHardcoverAPI(query);
  let goals = response.data.me[0].goals.map((goal) => {
    return {
      description: goal.description.substring(0, 4),
      progress: goal.progress,
      goal: goal.goal
    };
  });
  saveFile('readingGoals.json', goals);
}

async function getCurrentlyReading() {
  const query = `{
    me {
      id
      user_books(
        where: {user_id: {_eq: ${process.env.HARDCOVER_USER_ID}}, user_book_status: {status: {_eq: "Currently Reading"}}}
      ) {
        book {
          title
          contributions(where: {contribution: {_is_null: true}}) {
            author {
              name
            }
          }
          image {
            url
          }
          slug
        }
      }
    }
  }`;

  let response = await queryHardcoverAPI(query);
  let data = processBookData(response.data.me[0].user_books);
  saveFile('currentlyReading.json', data);
}

async function getFavoriteBooks() {
  const query = `{
    me {
      id
      lists(where: {name: {_eq: "Favorites"}}) {
        books_count
        list_books(order_by: {position: asc}) {
          book {
            title
            contributions(where: {contribution: {_is_null: true}}) {
              author {
                name
              }
            }
            image {
              url
            }
            slug
          }
        }
      }
    }
  }`;

  let response = await queryHardcoverAPI(query);
  let data = processBookData(response.data.me[0].lists[0].list_books,);
  saveFile('favoriteBooks.json', data);
}

async function getAllReadBooks() {
  const query = `{
    me {
      id
      user_books(
        where: {user_id: {_eq: ${process.env.HARDCOVER_USER_ID}}, user_book_status: {status: {_eq: "Read"}}}
        order_by: {user_book_reads_aggregate: {max: {finished_at: desc_nulls_last}}}
      ) {
        book {
          title
          contributions(where: {contribution: {_is_null: true}}) {
            author {
              name
            }
          }
          image {
            url
          }
          slug
        }
        user_book_reads_aggregate {
          aggregate {
            count
            max {
              finished_at
            }
          }
        }
        user_book_reads {
          user_book {
            rating
          }
        }
      }
    }
  }`;

  let response = await queryHardcoverAPI(query);
  let data = processBookData(response.data.me[0].user_books, true);
  saveFile('allReadBooks.json', data);
}

async function queryHardcoverAPI(query) {
  const hardcoverEndpoint = 'https://api.hardcover.app/v1/graphql';
  let results = await fetch(hardcoverEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${process.env.HARDCOVER_API_KEY}`
    },
    body: JSON.stringify({ query } ),
  })
  let response = await results.json();
  return response;
}

async function saveFile(filename, data) {
  fs.writeFile(__siteroot + __target + filename, JSON.stringify(data), function(err) {
    if (err) {
      console.log(err)
    }
  })
}

function processBookData(books, convert = false) {
  // Example book data structure:
  // {
  //   "book": {
  //     "title": "Feedback",
  //     "contributions": [{ "author": { "name": "Mira Grant" } }],
  //     "image": {
  //       "url": "https://assets.hardcover.app/edition/30411841/content.jpeg"
  //     },
  //     "slug": "feedback-2016"
  //   },
  //   "user_book_reads_aggregate": {
  //     "aggregate": { "count": 1, "max": { "finished_at": "2023-10-19" } }
  //   }
  //   (FOR READ BOOKS ONLY)
  //   "user_book_reads": [
  //     {
  //       "user_book": { "rating": 4.5 }
  //     }
  //   ]
  // }
  const processedBooks = books.map((entry) => {
    const hardcoverURLbase = 'https://hardcover.app/books/';
    return {
      title: entry.book.title,
      authors: entry.book.contributions.map(a => a.author.name).join(', '),
      url: `${hardcoverURLbase}${entry.book.slug}`,
      imageUrl: entry.book.image?.url || null,
      readCount: entry.user_book_reads_aggregate?.aggregate.count || 0,
      lastRead: entry.user_book_reads_aggregate?.aggregate.max.finished_at || null,
      rating: convert ? convertRatingToStars(entry.user_book_reads[0]?.user_book.rating || null) : null
    };
  });

  return processedBooks;
}

function convertRatingToStars(rating) {
  if (rating === null || rating === undefined) {
    return '';
  }
  
  const fullStar = "★";
  const halfStar = "½";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return fullStar.repeat(fullStars) + (hasHalfStar ? halfStar : '');
}

run();