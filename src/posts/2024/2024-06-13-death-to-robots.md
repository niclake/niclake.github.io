---
title: "Death to Robots"
description: "If your site running Jekyll & hosted on GitHub Pages, this post is for you."
permalink: /death-to-robots/index.html
date: 2024-06-13T15:00:00Z
tags: 
  - Technology
---

With all of the recent news coming out lately about Apple Intelligence crawling the web to build it's own LLM, a lot of people have woken up to the nightmare that is our data being used to train these models without our consent. All of these services are firmly in the *"Steal First, Never Ask For Forgiveness Later"* camp, which sucks!

Over on Mastodon, [Ethan Marcotte](https://follow.ethanmarcotte.com/@beep) posted a link to [his blog post](https://ethanmarcotte.com/wrote/blockin-bots/) detailing how he set up a way to generate his `.htaccess` file using Jekyll. When I went and looked into this, I realized GitHub Pages (who kindly hosts this site) doesn't allow me to edit my `.htaccess`. Shit!

So we have to rely on the next best thing - the good 'ol `robots.txt` file.

Similar to Ethan, I wanted to do this in a way that would leverage Jekyll's static site generator to my advantage, vs. having a massively long & hard to grok string of crawlers. So here's what I did:

**Created a `~/_data/robots.yml` file**:

```yml
- AdsBot-Google
- Amazonbot
- anthropic-ai
- Applebot
- Applebot-Extended
- AwarioRssBot
- AwarioSmartBot
- Bytespider
- CCBot
- ChatGPT
- ChatGPT-User
- Claude-Web
- ClaudeBot
- cohere-ai
- DataForSeoBot
- Diffbot
- FacebookBot
- Google-Extended
- GPTBot
- ImagesiftBot
- magpie-crawler
- omgili
- Omgilibot
- peer39_crawler
- PerplexityBot
- YouBot
```

**Created a `~/robots.txt` file** (note the empty front matter; this is required for Jekyll to compile the Liquid syntax appropriately):

```liquid
{% raw %}
---
# intentionally left blank
---

{% for bot in site.data.robots %}
  User-agent: {{ bot }}
  Disallow: /
  
{% endfor %}
{% endraw %}
```

And with that, you can look at [my `robots.txt` file](/robots.txt/), and see the desired output!
