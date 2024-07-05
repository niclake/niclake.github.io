---
title: "My Blogging Workflow"
description: "Because I'm sure you just are DYING to know how I get my words out to you."
permalink: /my-blogging-workflow
date: 2024-05-18T15:00:00Z
tags: 
  - Personal
  - WeblogPoMo 2024
---

[A couple](https://rknight.me/blog/my-blogging-workflow/) [of different](https://bjhess.com/posts/my-blogging-workflow) [people](https://birming.com/posts/my-tedious-blogging-workflow) have written some posts this week about their particular blogging workflows. Some are simple (write post, publish). Some are tedious (speak in to notes, reformat by hand, pass through a grammar checker, pass in to an AI for editing[^1], publish). And I thought, hmm... mine is certainly unique. Maybe I should share.

[^1]: I'm not one to yuck someone else's yum... but *yuck*.

My site is built with [Jekyll](http://jekyllrb.com), and hosted on [GitHub Pages](https://pages.github.com). This works pretty well for me, a software developer, since my whole life is about writing code and pushing it out. However, it falls down *real quick* when I'm not at my computer, as I found out at the start of this month when I was blogging while on vacation. GitHub Mobile doesn't have any way of creating pull requests or allowing me to easily maintain the repo my blog sits in & builds from. Neat!

Anyway, here's my standard workflow + caveats for when I was on vacation.

1. I write the post in VS Code. Yes, VS Code. (On vacation, I wrote it in Apple Notes.)
2. Using the terminal built in to VS Code, I push the change to my GitHub repo. Posts like this, I've done the night before, so it gets a pull request. Other posts, written day-of, I just push straight to the `main` branch. (On vacation, I had to delete the GitHub app from my phone, then go to the GitHub website, create a manual pull request, add the content, and merge it all manually.)
3. That's it!

(Quick side note: if you're on Wordpress, or Pika, or whatever... PLEASE, for the love of Gaben, do not write your post in the WYSIWYG editor those services provide. PLEASE write it in a local application and move it to your platform manually. The day you lose a massive blog post when you try to submit because the network is down, you'll remember this advice and go "wow, Nic, I should've listened to you". Tools like MarsEdit or any text editor are great for this.)
