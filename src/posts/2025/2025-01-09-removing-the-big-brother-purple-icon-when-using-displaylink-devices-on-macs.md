---
title: "Removing the Screen Sharing Icon When Using DisplayLink Devices on Macs"
permalink: /mac-displaylink/index.html
image: displaylink/big-brother.jpg
date: 2025-01-09T11:31:04Z
description: If you, like me, are tired of that little purple icon in your menu bar.
tags: 
  - Mac
---

{% include 'image.njk',
  src: "displaylink/big-brother.jpg",
  position: "banner",
  alt: "Big Brother is always watching you"
%}

In 2024, Apple launched a new feature for Macs that show a lovely purple icon on your menu bar any time it believes your screen is being recorded. For example, if you start a screen share within Zoom, you'll see that icon pop up.

I used the word "believes" above, because for some situations, it's not *really* the case.

Take DisplayLink devices, for example. I have a dock for my laptop (the [TOTU USB-C Docking Station](https://amzn.to/4bSRgEn)) that allows me to support 3 external monitors. It does this using DisplayLink and some trickery, but it does work. However, Apple's APIs go "wait, you're recording the screen in order to make this happen!" So, every time I plug in my laptop, there's that little purple icon staring at me, letting me know that Big Brother is watching me.

Cue the biggest eye roll in existence.

I'd come to just accept/ignore this, but just today, [Rob Allen](https://akrabat.com/) pointed me to [a post he'd made last month](https://akrabat.com/running-displaylink-manager-on-mac-without-the-purple-icon/) where he ran into (and solved) this exact issue, thanks to [a GitHub comment on an issue for AltTab](https://github.com/lwouis/alt-tab-macos/issues/2606#issuecomment-2351026226).

If you're dealing with this issue, here are the steps to take:

- Within DisplayLink Manager, un-check `Launch automatically after login`

{% include 'image.njk',
  src: "displaylink/disable-login.png",
  position: "banner",
  alt: "Disable the auto-login"
%}

- Open `Terminal.app`, and type `cd /usr/local/bin/`.
- Type `touch displaylink.command` to create a new file
- Edit this file however you see fit[^1]
- Within the file, paste the following command:

```bash
screen -dmS displaylink arch -arm64 /Applications/DisplayLink\ Manager.app/Contents/MacOS/DisplayLinkUserAgent; killall Terminal
```

(For those curious, this is using `screen` to launch DisplayLink, then immediately closing the terminal window. Since Apple apparently allows its own applications to bypass the sharing icon, this will allow DisplayLink to run, but not nag you with the "hey your screen is being shared!" notice.)

- Save & close the file
- Within `Terminal.app`, type `chmod a+x /usr/local/bin/displaylink.command` to make this file executable

{% include 'image.njk',
  src: "displaylink/terminal.png",
  position: "banner",
  alt: "A view of my Terminal window after running all the commands",
  caption: "When you're all done, your Terminal window should look something like this."
%}

- Open `System Settings`, go to the `General` section, and select `Login Items & Extensions`
- Within the `Open at Login` section, hit the `+` button
- Navigate to `/usr/local/bin/` and choose the `displaylink.command` file. To do this easily, from the open file picker, press `⌘⇧G`, type `/usr/local/bin/`, and press Enter.

{% include 'image.njk',
  src: "displaylink/login-item.png",
  position: "banner",
  alt: "Added to the login items"
%}

- You should now see `Item: displaylink.command, Kind: Terminal shell script` within your login items.
- Restart your computer. When you log in, you may be prompted with a request for `screen` to record your computer; allow this.
- Ta da! No more purple icon in your menu bar!

Thanks again to Rob Allen and @nendonerd for pointing me to the answer. Hopefully this is useful for you as well.

[^1]: If you're unfamiliar with using the terminal or command line, you can type `open .` to open a Finder window to the `/usr/local/bin/` directory. Find your new `displaylink.command` file, right click, Open With..., and choose TextEdit or your editor of choice.
