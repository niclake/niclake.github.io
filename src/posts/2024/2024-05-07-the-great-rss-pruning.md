---
title: "The Great RSS Pruning"
permalink: /the-great-rss-pruning
date: 2024-05-07T15:00:00Z
tags: 
  - Personal
  - WeblogPoMo 2024
---

A few weeks ago, I decided to completely redo how I consumed written content from the web. I _intended_ to cut down on how much I was seeing on a regular basis… task failed successfully.

I had been using [NetNewsWire][nnw] for a long, long time, basically since Google killed Reader (RIP). It’s a fantastic app, it’s free, it’s great. If you want to get started consuming RSS feeds, you can’t go wrong using it.

That said, a ton of people have extolled the greatness of [Reeder][reeder] for years, and I’ve always been hesitant to take the plunge because (_gasp_) it wasn’t free like NNW. I decided to give it a shot, and I totally get it; Reeder is a beautiful reading experience. There is clearly a lot of care taken with making it a terrific experience to consume content.

{% include 'image.njk',
  src: "rss/rss1.jpeg",
  position: "banner",
  alt: "The entry browser of NetNewsWire and Reeder",
  caption: "The entry browser of NetNewsWire and Reeder"
%}

NNW is no slouch either; while the UI might not be as elegant, I love how customizable you can make the UI, and there are a couple of decisions the app makes that I still wish I could do within Reeder. (Honestly, re-downloading NNW to write this post has made me go “hmm…”)

{% include 'image.njk',
  src: "rss/rss2.jpeg",
  position: "banner",
  alt: "The entry viewer of NetNewsWire and Reeder",
  caption: "The entry viewer of NetNewsWire and Reeder"
%}

The other tool I implemented into my reading setup was a [Feedbin][feedbin] account. “But Nic, isn’t paying for a service to consolidate your feeds pointless?” Don’t worry, I asked myself the same question, and thankfully Feedbin gives you a free trial to test things out… which is smart, because once you use the features, you’ll be hooked.

The winning feature is that Feedbin will give your account its own unique email address with which you can use to sign up for email newsletters. Want to have a cleaner email inbox? This is the best way to do it. That, plus the app’s built in reader modes, make even the clunkiest newsletter a breeze to read through.

At the suggestion of others who have ventured down this road, I also created a new Gmail address specifically for feeds; if you do something like `nic.feeds+NEWSLETTERNAME@gmail.com` whenever you sign up for a newsletter, you can keep track of who sells your data to third parties. You can then forward all of the email from this Gmail account to your Feedbin email, protecting your RSS feeds from potential spam. I moved _all_ of my newsletters to this new Gmail address, and it worked like a charm.

The final thing I did was move all my feeds over to Feedbin; however, instead of using OPML to export/import, I moved each feed by hand, because:

- I wanted to trim out dead feeds that didn’t work anymore (and, in some cases, find their replacements)
- I wanted to get rid of the loud/noisy feeds. [My good friend Patrick](https://www.patrickrhone.net) has long talked about the value of signal vs. noise, and I tried to take that to heart with this exercise
- I wanted to ensure I actually wanted to read the feeds, so I could do a quick audit of what was posted, and
- I wanted to re-sort my feeds. Previously, I had 5 huge buckets; now, I have 12 smaller ones

When I started the process, I had 83 feeds on NNW. After migrating, moving all of my newsletters over, and giving it a little bit to shake out, I now have <checks notes> **282 feeds**.

Ah jeez.

Honestly, though, I think I’ve landed on a really good spot. I have already knocked out a few noisy feeds that I added (I was subscribed to a lot of news feeds from places like BBC and The Guardian, but using summary newsletters like [The Morning News](https://themorningnews.org) and [NextDraft](https://nextdraft.com) have been more that sufficient), and I still have a few more subjects I need to hunt down good feeds for. I feel like I’m able to keep up with topics easily, without wallowing in the negative that Apple News or Twitter like to shove in front of my face.

RSS is not dead. Thank goodness.

[nnw]: https://netnewswire.com
[reeder]: https://reederapp.com
[feedbin]: https://feedbin.com
