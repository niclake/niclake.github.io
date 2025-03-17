---
title: "appDefaults.local"
permalink: /iphone-default-apps/index.html
date: 2025-03-03T21:41:20Z
description: When the apps that I use / bring no joy, only blues / time to tinkerrrr...
tags: 
  - Personal
---


I like to fiddle. Change for the sake of change can (sometimes) be really good, and I try to not be precious about old habits as much as I can.

Case in point: I was an avid proponent of the [Monokai color scheme](https://monokai.pro) for ages, but at some point in the last year or so, I pivoted to using [Dracula](https://draculatheme.com) everywhere, including on this site.[^1]

[^1]: Let's not get in to the fact that the entire reason I changed is because I *also* changed IDEs right around that time, and VS Code didn't have great Ruby support for Monokai...

So, my latest "I should fiddle with this" endeavor - trying out the default apps that the iPhone provides. Specifically, I wanted to look into Podcasts, Mail, Calendar, and Reminders. One has already been done, and the others I'm preparing for when I have small windows of time.

---

## Overcast -> Podcasts

This is a weird one for me, because I don't have any reference for using the default app. I started listening to podcasts somewhere around 2017/18, when Overcast already existed, and I somehow was tapped in enough to just start using it from the jump. So this particular "go back to the default" is really "try out a new app".

This is also the particular app that has been giving me the most reasons to switch, because of the myriad of bugs that I've had cropping up within Overcast since it got a full rewrite late last year. For example:

* Some episodes immediately complete and delete when they become the current podcast. I've noticed this happening with added frequency when I complete the previous podcast by scrubbing to the very end of the ep; I'd expect it to complete, tick over to the new episode, and start, but the new episode will sometimes also complete, and it will go to the 3rd podcast.
* Auto play randomly doesn’t work; when an episode completes, sometimes the next one will highlight and become the current episode, but it just won't start.
* Swipe down doesn’t work with any consistency. Tap to dismiss won't always work either. Sometimes I just have to take a breath and count to 5, and then it'll sometimes work for me. This irritates the heck out of me.
* Some podcasts won't delete after completion. When this is the case, it's like they rewind themselves 10 to 20 seconds when the next podcast begins, almost like the deletion task and the "update podcast status" task are having a race condition or something.

So I started this whole "try default apps" endeavor with those 4 things in mind.

When I tell you that I lasted about 10 minutes on this app, that's not hyperbole. I got all my subscriptions migrated over (including the Memberful ones that required me to sign in and grab links for), got the current episodes queued up, and started up the first pod.

Within 5 minutes of playtime, I was reminded why I'm on Overcast.

* Smart Speed is just too dang good. I listen to a speed that's about 1.6x, but Smart Speed helps eliminate some of those gaps in talking. Podcasts' 1.5x or 1.75x both don't feel good to me, and they still leave in all that space.
* Voice Boost does slightly degrade the delivered audio quality a bit, BUT it helps bring up a lot of the quiet parts where someone is speaking softly or leaning away from their mic, and I'll take that trade-off any day of the week.
* The layout of Podcasts is centered around discovering new things to listen to, with "my current set of downloaded episodes" being something I have to dig to get at. That's so user hostile to me.
* Not being able to custom sort podcast episodes stinks. I have Overcast prioritize a handful of pods for me, and even then, I like being able to drag and sort the episodes so the queue can keep rolling. Strange that Podcasts doesn't let you do this.

So Podcasts got a big ***[Inferior Minus](https://www.relay.fm/connected/532)*** from me - I had intended on using this for a week or so, but I instantly switched back. I'll just stick with Overcast, and hope Marco can fix the bugs.

## Mimestream (Mac) + Gmail (iPhone) -> Mail

Both apps I use today are designed around Gmail's weird APIs, making them the ideal use for all of my email accounts. However, I don't love using different apps to do the same thing between different devices, and paying for an email app seems... weird? It feels like racketeering; I'm paying someone to make the mode of communication I hate the most slightly less bad.

I know that Mail has started using categories in the inbox. I turned that feature on last year in Gmail after multiple years of avoiding it, and it's honestly been great at making sure the only time I get a badge on my app is when I have an email I actually need to check.

I'll be really curious what my reaction to this switch is. I'm going to try and live with it for a while and see how my thoughts change.

## Fantastical -> Calendar

My main gripes here are:

* Fantastical is $57 a year, and I'm not sure if it's adding that much value
* iOS doesn't let you set a default calendar app, and enough things use Calendar that it drives me nuts
* The Modular watch face on the Apple Watch won't let you switch the Day/Date to a 3rd party app

I also have 2 important bits of context that make this relevant:

* When I switched over to Fantastical, I started using their built-in sports schedules for everything. This rules, but it means that none of those schedules are available to anything that calls the Calendar API.
* I am part of one absurdly noisy calendar that I don't want to see by default. With Fantastical, I can just remove it from my default Calendar set. With Calendars, it seems I have to exclude it from anything outside the app (widgets, primarily) that want to call it.

So, knowing that I'm gonna have a little bit of set-up, I'm going to dive in and give this a try.

## OmniFocus -> Reminders

I pivoted over to OmniFocus this winter as a place for me to store EVERYTHING that I need to do. Daily tasks, recurring events, project notes, work to-do items... if I need it, it's here. I do still make heavy use of *"Hey Siri, remind me..."*, and it's great that OmniFocus can just suck this data in automatically. The only thing Reminders gets used for at this point is my grocery list, because I can tell my watch *"Add potatoes to the grocery list"* and it works (and my wife can easily manage this list too).

I'm going into this exercise assuming that this is not going to be the solution for me; I have a very custom "Daily HUD" OmniFocus perspective that gets populated based on a weird subset of rules, and I just don't see Reminders getting there. That said, if Reminders is even somewhat close with a tiny bit of tweaking, being able to save $100+ a year is gonna make this decision pretty easy for me.
