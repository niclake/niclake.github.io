---
title: "Hello World (from 11ty)!"
permalink: /hello-world-11ty/index.html
date: 2024-07-07T13:38:13Z
description: Ah shit, here we go again dot gif
image: eleventy.png
tags: 
  - Personal
  - Technology
---

{% include 'image.njk',
  src: "eleventy.njk",
  position: "banner",
  alt: "The logo for Eleventy"
%}

Well, I did it. I created yet another blog.

(insert Neo "Déjà vu" and a black cat here)

`niclake.me` has been up and running since August 15 of 2018. I've been hosting using GitHub Pages since then, and they recommended using [Jekyll](http://jekyllrb.com), a little blogging engine written with Ruby. I went with it, it worked fine, and I've gone about my merry way.

This year, though, I've been wandering back in to [Mastodon]({{site.config.mastodonUrl}}) a bit more, and got a chance to participate in [WeblogPoMo](/blog/tags#weblogpomo-2024) (or Weblog Posting Month), and ran across a whole bunch of people that were using a service called [Eleventy](https://www.11ty.dev).

Eleventy is, at its core, the same thing as Jekyll. They are static site generators, which means they take every bit of data that I put in and render it all down as a single `.html` file per page. The top of this post looks like this:

```md
{% raw %}
---
title: "Hello World (from 11ty)!"
permalink: /hello-world-11ty/index.html
date: 2024-07-07T13:38:13Z
description: BLURB
image: eleventy.png
tags: 
  - Personal
---
{% }
{% include 'image.njk',
  src: "eleventy.njk",
  position: "banner",
  alt: "The logo for Eleventy"
%}

Well, I did it. I created yet another blog.
{% endraw %}
```

But instead, you see... well, this post! Neat!

Eleventy runs on `Node.js` instead of Ruby, which immediately opens the door to a ton more people having an understanding of how to work with or tweak the site in certain ways. I've been able to talk with [Robb Knight](http://rknight.me), along with the Eleventy Discord community, to get help as needed for making specific tweaks to my site. I've also come up with a *huge* backlog of enhancements that I'd like to make at some point in the future, so keep your eyes peeled for those.

Anyway, if you've subscribed to my RSS feed before... apologies for blasting you with 98 posts on Friday. (And if you're not subscribed, [why not](/feed.xml)?)
