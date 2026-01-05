import "dotenv/config";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __siteroot = __dirname.replace("/backlogs", "");
const __target = "/src/_data/catalog/";

async function run() {
  try {
    // Check if environment variables are set
    if (!process.env.HARDCOVER_API_KEY) {
      throw new Error("HARDCOVER_API_KEY environment variable is not set");
    }
    if (!process.env.HARDCOVER_USER_ID) {
      throw new Error("HARDCOVER_USER_ID environment variable is not set");
    }
    console.log("Environment variables check: API_KEY and USER_ID are set");

    await getGoals();
    await getCurrentlyReading();
    await getFavoriteBooks();
    await getAllReadBooks();
    console.log("All catalog data generated successfully");
  } catch (error) {
    console.error("Error generating catalog data:", error);
    process.exit(1);
  }
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

  let me = await queryHardcoverAPI(query);
  if (!me.goals) {
    console.warn("No goals found, saving empty array");
    saveFile("readingGoals.json", []);
    return;
  }
  let goals = me.goals.map((goal) => {
    return {
      description: goal.description.substring(0, 4),
      progress: goal.progress,
      goal: goal.goal,
    };
  });
  saveFile("readingGoals.json", goals);
  console.log("Reading goals saved");
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

  let me = await queryHardcoverAPI(query);
  if (!me.user_books) {
    console.warn("No currently reading books found, saving empty array");
    saveFile("currentlyReading.json", []);
    return;
  }
  let data = processBookData(me.user_books);
  saveFile("currentlyReading.json", data);
  console.log("Currently reading saved");
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

  let me = await queryHardcoverAPI(query);
  if (!me.lists || !Array.isArray(me.lists) || me.lists.length === 0) {
    console.warn("No favorites list found, saving empty array");
    saveFile("favoriteBooks.json", []);
    return;
  }
  if (!me.lists[0].list_books) {
    console.warn("No favorite books found, saving empty array");
    saveFile("favoriteBooks.json", []);
    return;
  }
  let data = processBookData(me.lists[0].list_books);
  saveFile("favoriteBooks.json", data);
  console.log("Favorite books saved");
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

  let me = await queryHardcoverAPI(query);
  if (!me.user_books) {
    console.warn("No read books found, saving empty array");
    saveFile("allReadBooks.json", []);
    return;
  }
  let data = processBookData(me.user_books, true);
  saveFile("allReadBooks.json", data);
  console.log("All read books saved");
}

async function queryHardcoverAPI(query) {
  const hardcoverEndpoint = "https://api.hardcover.app/v1/graphql";

  let results = await fetch(hardcoverEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.HARDCOVER_API_KEY}`,
    },
    body: JSON.stringify({ query }),
  });

  // Check HTTP response status
  if (!results.ok) {
    const errorText = await results.text();
    throw new Error(
      `HTTP error! status: ${results.status}, body: ${errorText}`
    );
  }

  let response = await results.json();

  // Check for GraphQL errors
  if (response.errors) {
    console.error("GraphQL errors:", JSON.stringify(response.errors, null, 2));
    throw new Error(`GraphQL errors: ${JSON.stringify(response.errors)}`);
  }

  // Check if data exists
  if (!response.data) {
    console.error("No data in response:", JSON.stringify(response, null, 2));
    throw new Error("No data in API response");
  }

  // Validate and extract me[0] from response
  if (
    !response.data.me ||
    !Array.isArray(response.data.me) ||
    response.data.me.length === 0
  ) {
    console.error(
      "Invalid response structure: me array is empty or missing",
      JSON.stringify(response.data, null, 2)
    );
    throw new Error("Invalid response structure: me array is empty or missing");
  }

  return response.data.me[0];
}

async function saveFile(filename, data) {
  fs.writeFile(
    __siteroot + __target + filename,
    JSON.stringify(data),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
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
    const hardcoverURLbase = "https://hardcover.app/books/";
    return {
      title: entry.book.title,
      authors: entry.book.contributions.map((a) => a.author.name).join(", "),
      url: `${hardcoverURLbase}${entry.book.slug}`,
      imageUrl: entry.book.image?.url || null,
      readCount: entry.user_book_reads_aggregate?.aggregate.count || 0,
      lastRead:
        entry.user_book_reads_aggregate?.aggregate.max.finished_at || null,
      rating: convert
        ? convertRatingToStars(
            entry.user_book_reads[0]?.user_book.rating || null
          )
        : null,
    };
  });

  return processedBooks;
}

function convertRatingToStars(rating) {
  if (rating === null || rating === undefined) {
    return "";
  }

  const fullStar = "★";
  const halfStar = "½";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return fullStar.repeat(fullStars) + (hasHalfStar ? halfStar : "");
}

run();
