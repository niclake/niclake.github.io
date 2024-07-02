---
title: "Mac Helper Apps, or Where The FUDGE Is This Triggered From?"
permalink: /mac-helper-apps
date: 2023-01-19T15:00:00Z
categories: 
  - Apple
---

![alt text][headerImg]

Over at the [Relay.FM member's Discord](https://www.relay.fm/membership), a lot of different conversations take place about a variety of topics. I spend a lot of time in our ***#apple*** channel, talking about everything Apple news related, along with discussions about hardware & software. One of the conversations that [Rosemary Orchard](https://rosemaryorchard.com) started in prepping for a future episode of the [Automators podcast](https://www.relay.fm/automators) actually gave me a great idea for 2 blog posts - this is the first one of those.

One of the best parts about using a Mac is the sheer abundence of apps and utilities to help you be productive. Clipboard managers, app launchers, ways to dump snippets of text on demand, controlling audio... that's just scratching the surface.

<!-- more -->

However, one of the issues arises from having a multitude of apps and utilities that have started to aggressively expand their feature set. I remember when BetterTouchTool first added app window management - it was a huge deal for me, as I'd not experienced that before. But then I went "oh, there's other apps that do this in a better, more powerful way. I should use that instead." Same thing with clipboard managers - I used the one built in to Keyboard Maestro for years, before switching over to Alfred's, now that I have the Powerpack, it seems like a no brainer to utilize it.

And therein lies the main point of this post - *do you know what all of your Mac Helper Apps are doing?* How much legacy content do you have just hanging around, not doing anything vital, and/or requiring you to spend money on it for a subscription?

---

Ok, time to audit. Let's check a combo of my menubar and my apps folder to see what apps I am using, and what they're being used for:

![A shot of my menu bar][menuBar]

*I'm just going to get ahead of this now: my menu bar is split thanks to Bartender. Top row left to right: iStat Menus (from weather thru the calendar icon), Bartender, & Control Center. Bottom row: Maestrel, Zoom, DisplayLink, 1Password, Music.app, Adobe CreativeCloud, Alfred, TextExpander, Rocket, Keyboard Maestro, MacMediaKeyForwarder, Spotlight, Karabiner-Elements, native Keyboard switcher, BetterTouchTool, Users, spacer, Magnet, Nightfall, Moom, Bluetooth, Wifi, spacer, Superpowered, Docker, Zscaler.*

- [Alfred](http://alfredapp.com) (app launcher, various workflows, clipboard manager)
- [BetterTouchTool](https://folivora.ai) (mouse & trackpad gestures)
- [Karabiner-Elements](https://karabiner-elements.pqrs.org) (custom key commands on my MacBook to match my mechanical keyboards)
- [Keyboard Maestro](https://www.keyboardmaestro.com/main/) (a very small set of keyboard commands to trigger actions)
- [Magnet](https://magnet.crowdcafe.com) (window snapping via drag/drop or key commands)
- [Moom](https://manytricks.com/moom/) (auto-set window placement when my laptop is hooked up to my external monitors)
- [Nightfall](https://github.com/r-thomson/Nightfall) (toggle light/dark mode)
- [TextExpander](https://textexpander.com) (expand snippets of text)

I'll start with the easy one. **Keyboard Maestro** is really only doing a very limited subset of things for me; controlling Apple Music (play/pause, prev/next song, vol up/down) or quitting all of my running apps.

![A shot of my existing Keyboard Maestro actions][keyboardMaestroImg]

It turns out that both of these are absurdly easy to reconfigure in Alfred. All of those Music.app features were available as Workflow presets, so I just combined them all into one workflow and called it a day.

![A shot of my new Alfred workflow][alfredMusicWorkflow]

Additionally, I (re)discovered that just typing *quit* into Alfred prompts me with the ability to quit all running apps. Boom, one app removed!

![A shot of my Alfred's quit action][alfredQuit]

*Edit: it turns out that Alfred also supports Music.app via **play**, **pause**, and similar commands. Their volume controls are a bit more limited, however, only offering max, half, or mute. This may be more your speed, but I'll stick with the new workflow for now.*

---

What about **Nightfall**? A neat app, sure, but do I *need* an app dedicated to just doing one thing maybe once a week?

It turns out, no, I do not. Another simple Alfred workflow, and now I can either type in *darkmode* or press ⌘⌥⌃ + \\, and boom, it switches!

![A shot of my Alfred workflow to toggle Dark Mode][alfredDark]

Behind the scenes, this is just running an AppleScript:

```applescript
tell application "System Events"
    tell appearance preferences
        set dark mode to not dark mode
    end tell
end tell
```

Also, unlike Nightfall, this implementation has the added bonus of not mucking with my appearence preferences - I have it set to *Auto*, so it switches to dark mode at sundown and light mode at sunrise, but Nightfall would override it and set it to whatever mode I put it in. This script method changes the appearence, but leaves it on Auto, so it will continue to flip like normal the next day. Win/win!

---

Text/snippet expansion? I've been a **TextExpander** user for a long time, but admittedly have never utilized it to its full potential. The extent of most of my snippets are quick pasting my phone number or email, or dropping in a 5 paragraph lorem ipsum. The biggest lift was a reply I'd send out to recruiters when they'd send me a job posting, where it would prompt me to put in their name before pasting the message.

![A shot of my old TextExpander snippet][textExpander]

Surprise surprise, Alfred comes to the rescue again with its Snippet feature. They don't work exactly the same - TextExpander would pop up a very legacy-looking window prompting me to fill in any dynamic content before pasting, whereas Alfred will paste the content in and then let you move the cursor to where you have to type. For my needs, though, this is perfect. (What the heck, Alfred's pretty powerful...)

![A shot of my Job Search snippet in Alfred][alfredSnippet]

---

I still want to play around with some of these apps and see if I can replace **Karabiner-Elements**, along with one of **Magnet** or **Moom**, but at this point, I feel like this was a *very* productive exercise. I'll be able to save some money not paying for a TextExpander subscription, clear a couple of apps off my computer, *and* I feel like this gives me cause to dive even further into Alfred's feature set to see what all is there. I encourage you to do an audit as well - who knows, maybe you'll unlock some pretty powerful features as well!

[headerImg]: https://imgur.com/8l7zERD.png
[menuBar]: https://imgur.com/KTQr6Ax.png
[keyboardMaestroImg]: https://imgur.com/3RKzI6K.png
[alfredMusicWorkflow]: https://imgur.com/asYf6As.png
[alfredQuit]: https://imgur.com/5h9hhBm.png
[alfredDark]: https://imgur.com/C4rhgGi.png
[textExpander]: https://imgur.com/AAisGDK.png
[alfredSnippet]: https://imgur.com/ICrFNJx.png
