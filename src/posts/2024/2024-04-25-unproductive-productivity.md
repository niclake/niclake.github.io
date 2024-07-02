---
title: "Unproductive Productivity"
image: unproductive.png
permalink: /unproductive-productivity
date: 2024-04-25T15:00:00Z
categories: 
  - Personal
---

If you'd like an insight into my brain, here's the process flow I went through after V went down for the night:

- I sat down at my desk and flipped on the NBA games to watch them.
- I started going through a backlog of "to read later" sites in my browser, organizing them for later use.
- One of the sites was a blog that gave me an idea for a blog post.
- I opened VS Code[^1] to write a post[^2].
- In the process of creating the new file, I thought "man, this is a massive pain in the ass... could I make it better?" (This was at approximately 9:30pm.)
- I spent the next 20-30 minutes researching `sh` (which I've never really used, even as a professional developer) and figuring out the best way to write it to do what I wanted.
- I thought "hey, I love Alfred, why not make a workflow so I can execute this from anywhere?"
- I spent the next 5 minutes swearing, because my script wouldn't run from anywhere.
- Eventually we got there. Hooray!
- I'm now writing this blog post at 10:54pm.
- I haven't watched a minute of the NBA games, or sorted/gone through any more of the sites I wanted to.

{% include 'image.njk',
  src: "unproductive.png",
  position: "banner",
  alt: "The final Alfred workflow"
%}

This is just how my brain operates now, I guess.

Oh, and here's the script in all its glory, if you care:

```bash
title=$(echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
cp ~/github/niclake.github.io/_posts/_PostTemplate.md ~/github/niclake.github.io/_posts/$(date +%Y-%m-%d)-$title.md
```

[^1]: Yeah, I use VS Code to write my blog posts. The whole site is up on GitHub, and it's just easier for my brain to write it here vs. somewhere else. Maybe one day I'll go back to MarsEdit or something.
[^2]: It wasn't this one, I'll tell you that much.
