---
title: "Useful Mac Defaults to Change"
permalink: /useful-mac-defaults-to-change/index.html
date: 2025-01-13T20:05:00Z
description: This is mostly for me to remember whenever I set up a new computer again.
tags: 
  - Personal
  - Mac
---

I picked up a new Mac mini last week, and it's been an absolute delight going through and setting everything up fresh again. I always get a ton of satisfaction with doing clean installs and adding things back as necessary; it's a good way to save space, examine what's been working for me, and identify things that I've just completely forgotten about.

Some of those things include various quality of life enhancements I make to my Macs that are done through the command line, overwriting some defaults Apple has set for various reasons. Some of these revert behavior to legacy, pre-OS X days, while others are just nice enhancements I've discovered over time.

I'm mostly documenting this in a central location so I can remember it for later, but I figured I'd share with you too. If you're curious about trying these, just launch the `Terminal` app, copy these, paste them in, and hit enter. Most of these have boolean `true/false` options in them; if you want to revert a change, just flip it and run the command again.

---

**Hold Key to Repeat** (vs. bringing up the accents window)[^1]: `defaults write -g ApplePressAndHoldEnabled -bool false`

[^1]: This is always discovered when I try to go type something like "lmaoooooooooo" and the accent window pops up.

**Show the App Switcher (⌘-Tab) on Every Display**: `defaults write com.apple.Dock appswitcher-all-displays -bool true; killall Dock`

**Add Spacers to your Dock**:

- Small spacer: `defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="small-spacer-tile";}'; killall Dock`
- Large spacer: `defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="spacer-tile";}'; killall Dock`

You can add as many spacers as you want - just run the command again. To can drag around to reposition, or drag off the dock to remove.

{% include 'image.njk',
  src: "dock-spacers.png",
  position: "banner",
  alt: "A screenshot of my Dock with spacers",
  caption: "This is an example of spacers in my dock - these are all small spacers."
%}

**Change the Location for Screenshots to be Saved**: `defaults write com.apple.screencapture location <path>` (ex: `~/Documents/Screenshots`)

This will likely be a living document, so expect to see updates to this list.
