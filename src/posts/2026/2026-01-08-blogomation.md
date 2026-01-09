---
title: "Blogomation"
permalink: /blogomation/index.html
date: 2026-01-09T013:52:16Z
description: This is a VERY nerdy post about some automation I've recently added to my blog. Read at your own risk.
tags: 
  - Personal
---

(This is a VERY nerdy post about some automation I've recently added to my blog. Read at your own risk.)

This site is built using [Eleventy](https://www.11ty.dev), a static site generator. It's intended to Just Be™, but there are times where I want just a little bit more out of the site. This past week, I've gotten 3 easy wins out of the way, and wanted to document those.

### Bookshelf Updating

I recently [blogged about how I integrated Hardcover into my site](/bookshelf-hardcover/), so that my [bookshelf page](/bookshelf/) would display all of my historical content. However, I had to manually trigger a fetch of the data every time I wanted to update that data, and push it to my GitHub repo, so that it could then be built and deployed.

Ultimately this was pretty simple. I already had a little `hardcover.js` script I could run to generate the data, so I just updated my `build.yml` to run that script right before my site builds for deployment:

```yml
- name: Install catalog dependencies
  run: cd catalog && ${{ steps.detect-package-manager.outputs.manager }} install
- name: Generate catalog data from Hardcover
  env:
    HARDCOVER_API_KEY: ${{ secrets.HARDCOVER_API_KEY }}
    HARDCOVER_USER_ID: ${{ secrets.HARDCOVER_USER_ID }}
  run: node catalog/hardcover.js
```

Now any time a build is triggered for my site, my bookshelf will update! Huzzah!

### Scheduled Builds

That said, I still have one small problem. I _also_ have my Currently Reading section, which is supposed to show books I'm reading now. And if the only time my site updates is on a build, that essentially means I need to make a blog post or some general update to the site for that data to update.

Enter: scheduled builds. Again, another very small and easy thing to update within my `build.yml`:

```yml
on:
  # Runs on pushes targeting the default branch
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

  # Schedule builds every 6 hours
  schedule:
    - cron: '0 */6 * * *'
```

The `schedule` section is the only new bit, and a quick jaunt over to [crontab.guru](https://crontab.guru) helped me figure out how to get my site to build 4x/day. This will force my bookshelf to get updated on a regular cadence, but it _also_ enables me to have scheduled posts dated in the future that will (somewhat) auto-post. Terrific!

(I think I'd eventually like to turn my Currently Reading section into a little JS script that will dynamically pull the content in real time, but for now, this will do.)

### Updating Post Datetimes with Git Pre-Commit Hooks

I have a bash script that I run every time I want to write a new blog post, which does the following:

- Takes a title input
- Plops that into the `title` section of this post
- Slugifies it for the URL (ex. "App Defaults for 2026" will become `app-defaults-for-2026`)
- Puts a bunch of other boilerplate front matter on my site; default categories, a `draft` flag, and spaces for the post description and the date

Previously, this date would be auto-generated right when I created the file, dated 30 minutes in the future. This was usually fine, but I frequently ran into instances where I'd have to step away from the post for an hour, a day, a week, whatever. The post would just sit there, and many times I'd forget to fix the date before posting it. Or, if I was able to write a post super fast, my site might build before the post's time, and it wouldn't publish.

Static site problems, amirite?

To fix this, I added a git `pre-commit` hook that will get the current date & time, find the placeholder text in my front matter, and replace it automatically. I usually don't commit my posts until I'm ready to publish, so now my only edge case is if I'm writing a draft or something I intentionally want to have post later. (You can see my pre-commit hook [here](https://github.com/niclake/niclake.github.io/blob/984ba4240b2b45b775c735d7a4862cf524eef91e/hooks/pre-commit#L1))

Also, because git hooks are set up on a per-machine basis, I also:

- saved the hook off in a directory within my site repo
- added an `install-hooks.sh` script that takes every hook in that directory, and clones it into that machine's `{repo}/.git/hooks` directory
- added a script to my `package.json` that runs the install script for me

Now any time I set up my blog's repo on a new device, I just need to run `npm run postinstall`, and my git hooks are in place. Kachow!

---

I told you this was nerdy.