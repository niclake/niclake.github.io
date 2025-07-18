---
title: "Let There Be Light"
permalink: /let-there-be-light/index.html
date: 2025-07-18T16:40:26Z
description: Let's get visual.
tags: 
  - Personal
---

I've been a fan of the [Dracula color scheme](https://draculatheme.com) for a while now; I used to use [Monokai](https://monokai.pro) in all of my code editors ever since I discovered [Sublime Text](https://www.sublimetext.com) way back in the day, but when I took the leap to using [VS Code](https://code.visualstudio.com) at my current job, I couldn't find a version of Monokai that I really loved. Things that once looked great within [RubyMine](https://www.jetbrains.com/ruby/) never fully lined up after the switch, and I could never get over that mental hump seeing constants or methods with the "wrong" colors.

After a ton of trial and error, plus repeatedly looking up "Best dark color scheme for vs code", I finally landed on Dracula. It just works for me; the colors are bold, the contrast is great, and it's always just seemed fun.

So of course, I used it for my personal website. Because why not?

Fast forward to last summer, when I was partaking in [Weblog Posting Month](/weblogpomo/), and I started hearing some feedback like "hey could you make a light mode?" Never before had I considered this; I liked my colors opinionated and bold[^1]. But, from an accessibility standpoint, it made sense - some people apparently get migraines when using dark modes or color schemes. Ick. I've been putting this off for ages. Too busy, lack of motivation, unhappy with how things look, etc.

[^1]: The creators of Dracula have often been asked *"Will you create a light theme?"*, and their answer was always: *"No. Dracula doesn't support light."*

Then, last week, I got an email from the Dracula creators[^2] - they were officially launching Dracula's light mode, aptly named Alucard. [They have an open pull request](https://github.com/dracula/draculatheme.com/pull/290/files#diff-f001bc3cca46914bd319f5505ed9694d15edb2f9bf3b32cd9fd736cc3f1fca67) that contains the whole spec for both classic & light, so practically all my work was done for me... I just had to update some CSS!

[^2]: Yes, I subscribe to a newletter for a color scheme.

Readers - "some" CSS is really me just updating 23 files and creating 5 more, creating a ton of variables, learning that my JavaScript can, in fact, read a CSS variable (which is super handy), and meticulously going over every page on my site to ensure that things look how they're supposed to.

But at long last... it's complete!

{% include 'image.njk',
  src: "alucard.png",
  position: "banner",
  alt: "LET THERE BE LIGHT!",
  caption: "The original dark Dracula on the left, and the bright & shiny Alucard on the right"
%}

I will continue to be a bit opinionated - by default, when you arrive on the site, it'll be set to dark mode. You can opt out of this, however, and set dark/light/auto based on your preference.

There are still some very minor tweaks that I have left to do, but I'm really happy with how this is turning out. Here's the full pallete of colors I'm using on the site (which you can also see on [my site's style guide](/styleguide/)).

{% include 'color-blocks.njk' %}

Please do let me know if you see any weirdness with the site, as I'm guessing I missed at least one thing. Otherwise, enjoy!
