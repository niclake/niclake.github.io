---
title: "MLB Daily Schedule Shortcut"
image: mlb-schedule-shortcut.png
projectInfo: "This shortcut will pull the daily MLB schedule from their public facing API, put it into a table, and send an email to the desired recipient. You can set it up as a daily automation to know the schedules for every day."
projectLink: https://www.icloud.com/shortcuts/a67a3888908d4ae0a37c54ce578f5995
permalink: /mlb-schedule-shortcut/index.html
date: 2023-01-19T15:00:00Z
tags: 
  - Project
  - Apple
  - Shortcuts
---

{% include 'image.njk',
  src: "mlb-schedule-shortcut.png",
  position: "banner",
  alt: "A screenshot of the email sent from my MLB Schedule shortcut"
%}

***[24 June 2024] Note: Apple made some changes to Shortcuts about a year ago that nuked the ability to send HTML emails. I've been hopeful that they'd fix this, but in the meantime, I went ahead and [created a new project](/daily-sports-email/) that can be configured & run from a GitHub Action.***

I work from home every day, and have a TV hooked up in my office. I also love watching baseball. On days with day games, this tends to be great for me... unless I don't realize that there are any day games being played (like today).

Enter: Apple Shortcuts.

I was attempting to figure out how I could pull down the schedule every day in a way that a) gave me the info automatically, instead of having to seek it out, 2) didn't clutter up my calendar, and III) wasn't costly to implement. Now that Heroku's free hosting has gone out the window, I wasn't exactly sure what the best method would be. And then, someone suggested Shortcuts.

I fully admit that I've never been a user of Shortcuts. I have 2 (one to automatically pull up directions to home, and one to generate a QR code for my guest WiFi network) that I have never used. But I thought, how hard could this be? (Answer: a lot more of a pain in the ass than I anticipated.)

If you are interested in installing the shortcut for yourself, [here is a link for you to download and install it][shortcut]. You will be prompted to put in your email address, and then you can run it to generate the games for the day. I then went ahead and set up a daily automation to generate the schedule at 7am and email it to myself.

Give it a try, and let me know if you run into any problems, or if you have any suggestions on how to improve it. I already have plans for a version 2 that'll include the up-to-date standings as well.

[shortcut]: https://www.icloud.com/shortcuts/a67a3888908d4ae0a37c54ce578f5995
