---
title: "My Bookshelf via Hardcover"
permalink: /bookshelf-hardcover/index.html
date: 2025-12-17T08:04:11Z
description: Integrating my books read log into my website via Hardcover.
tags: 
  - Personal
---

I've long wanted to integrate my Goodreads or Storygraph data onto my website. Goodreads _used_ to have an API, but that was deprecated long ago when Amazon took them over. Storygraph is getting there, but progress is slow.

For ages, I've used a [Google spreadsheet][booksSheet] to keep track of my reading history. This has grown extremely unwieldy over the years, as I added more and more books to the backlog. I was never able to reliably keep up with a book's status, and found myself copying read dates and ratings from whatever service I was using to track my reading at the time.

Enter [Hardcover](https://hardcover.app), yet another book tracking app. BUT, this one was built with the API access at the core. I've been poking around at it for a bit now, and finally have everything set up and ready to go.

If it's working as it should, you should see what I'm currently reading here:

{% include 'current-book.njk' %}

I also have a brand new [Bookshelf page](/bookshelf/) that has what I'm currently reading, my favorite books, and all of the books that I've tracked dating back to 2016, along with my reading goals for each year.

It was a fun project - doing it this way was MUCH simpler than the previous iteration I was attempting, which was using a disgusting combination of Google Sheets APIs and [OpenLibrary](https://openlibrary.org/)'s comprehensive-but-not-very-elegant APIs. It was a horrible hack job, and I'm very glad to be free of that.

Now if I could just find a similar service for video games, I'd be all set...

[booksSheet]: https://docs.google.com/spreadsheets/d/1-1PcHF6xzFKTaTvxnfjm6bVgo4pd5yIr3nbxsbckoFo/edit?usp=sharing