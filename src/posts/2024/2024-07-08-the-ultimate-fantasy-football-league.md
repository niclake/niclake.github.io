---
title: "The Ultimate Fantasy Football Keeper League"
permalink: /fantasy-football/index.html
date: 2024-07-08T16:15:05Z
description: If your fantasy football leagues are becoming bland, boring, or just to 'the same every year', I have the solution for you. It involves punters.
tags: 
  - Personal
  - Sports
  - Fantasy Sports
---

Back in college, I came up with a concept for a fantasy football (FFB) keeper league that resonated with all of my friends. I ended up running 2 leagues using this ruleset from 2012 through 2018 before "retiring" from fantasy sports.

But this year? This year it's coming back. And it's time I shared the magic with you.

---

A quick aside for those unfamiliar with keeper leagues. The concept is relatively simple; every year, each team can keep a certain subset of their players. ESPN's rules used to be a maximum of 4 players. The dominant players always get kept; in my day, it was Tom Brady, Peyton Manning, Rob Gronkowski... all the studs, the high performers, the guys going in the first couple rounds.

To be frank, this sucks. It's bland, boring, and leads to one team loading up on 3 or 4 incredible players and dominating the league for years. Yawn.

---

## Rosters

Rosters are the easy part. Most FFB leagues default to 15 players on each team, but for our purposes, we need a nice even number that divides easily (more on this in a second), so I added a slot. Here's what the rosters look like:

- 1 QB (max 2 allowed on roster)
- 2 RB (5)
- 2 WR (5)
- 1 TE (2)
- 1 Flex (RB, WR, or TE)
- 1 Defense/Special Teams (2)
- 1 Kicker (2)
- 1 Punter (2)[^1]
- 6 bench slots

[^1]: Cue every single fantasy player going "wtf?!?"

That's right - punters. I could've added another Flex spot, or some people might advocate for a superflex (Flex + QB [which basically means "here, have another QB starting" for most teams]), but punters are a super unique option that adds a ton of suspense every week (more on this in a second too).

## Scoring

Scoring is easy - figure out what you like, and roll with it. Both leagues I ran in yesteryears were 1 point per reception (PPR) leagues (aka every time a RB/WR/TE makes a catch, they get 1 point, along with their yardage), 0.1 points per rushing/receiving yard, and 0.1 points per 2.5 passing yards[^2].

[^2]: You could just do 1 point per 10 / 25 yards, but I like to allow for partial points so that you feel like you're getting credit for stuff. A 9 yard rush netting you 0 points? Silly.

I also give out 5 bonus points for the following:

- A QB has a perfect rating
- A QB throws for 500+ yards passing
- A RB/WR/TE gets 300+ yards receiving OR rushing (not combined)
- A (kicker) makes a 60+ yard field goal

And finally, punters have their own unique scoring:

- Each punt is 1 point
- Each punt that is downed inside the opponent's 20 is +2 points (total of 3)
- Each punt that is downed inside the opponent's 10 is +3 points (total of 6)
- Each punt that goes for a touchback is -2 (-1 total)

So for example:

- A punt is downed on the 18. That's 3 points.
- A punt is caught on the 5 and returned to the 12. That's also 3 points.
- A punt is downed on the 2. That's 6 points.
- A punt goes into the end zone. That's -1 points.
- A punt is fielded anywhere and/or run out beyond the 20 yard line. That's 1 point.

The fun with this is that the "downed inside the 10" points are not computed live; everything else is, but the stat checkers go back and triple check those before finalizing the stats every night. There have been *numerous* instances in the leagues where you go to bed winning by 5, and you wake up the following morning losing because multiple punts were given +3 points for being downed inside the 10.

## Drafting, Free Agency, Trades, & Keepers

And now, we get to the true fun of this league - how to make this a keeper league, while keeping everything dynamic and fresh. (A TL;DR is at the bottom.)

### Year 1 Draft

Year 1 is simple. It's a snake draft. Pick your players like normal, don't go over position limits, and fill out your whole team in the draft. Done.

The added bit is this: **when you draft a player, they receive a *Pick Value (PV)*, which is `SET` to the round they are drafted**.

Here's the draft board from 2016:

{% include 'image.njk',
  src: "ffb/2016draft.png",
  position: "banner",
  alt: "A screenshot of the draft board from the 2016 draft"
  caption: "Snake draft for 2016; you can see that some people got crazy with pre-draft trades."
%}

So, if you check out my team (NME), Jamaal Charles and Dez Bryant were drafted in the 2nd round; they're both given PV of 2. Matt Jones had a PV of 10. Simple enough.

### Free Agency & Trades

PVs come in to play with free agency and trades like so:

- During the season, a player's *Pick Value (PV)* can change from being `SET` (acquired from free agency) or `CLEARED` (by being dropped to free agency)
- A player acquired from free agency has their PV `SET` to 16.
- If you trade a player, their PV does not change.
- When you drop a player from your roster, that player's PV is `CLEARED`.
  - If you drop a player, then add them back to your team before any other team adds them, their PV is `SET` to whatever their value was when you dropped them.
  - ex: From the above draft board, if I drop Matt Jones in week 2, then pick him back up in week 5, and nobody else has rostered him in that time, his PV would be `SET` to 10 once again.

Here's what the rosters looked like at the end of the 2016 season:

{% include 'image.njk',
  src: "ffb/2016season.png",
  position: "banner",
  alt: "A screenshot of the rosters after the 2016 season"
  caption: "All of the teams at the end of the 2016 season. Z-Money won. Some guy that went by NME did not. Let's not talk about that."
%}

We won't talk about me finishing last. But you can see a bunch of things happening here:

- Tons of picks have been traded. I sent my first round pick to Z-Money, who then traded it to B-Dog.
- B-Dog traded both their 1st and 16th round picks, but also acquired those same rounds from other people.
- A TON of players were dropped off of draft rosters (all the empty holes; my 4th/5th/6th rounds, for example).
- A TON of players were added via free agency (and they all currently sit with PVs of 16 for each team).

Additionally, you can trade current draft picks, plus draft picks for the following season. There are a few rules with that:

- If you acquire additional picks that would exceed a total of 16, you lose picks starting in the 15th round
  - Ex: you acquire an extra 1st and 7th round pick in a trade. You would forfeit your 15th and 14th round picks
- If you end up trading picks away and don't have 16 picks, you will make compensation picks after the 16th round
  - Ex: the team that traded away their 1st and 7th round picks would now make picks in the 17th and 18th rounds
  - These extra rounds follow the same order as the draft, but only those needing to fill roster slots make picks

### Year 2 - Locking In Keepers

Pre-draft year 2 is where the fun of this league really kicks in.

- In order to keep a player, you MUST have a pick that exactly matches that player's PV
- You may NOT use a better PV to keep a player
  - ex1: Up above, my team (NME) has Jamaal Charles and Dez Bryant with a PV of 2. If I wanted to keep both, I needed to acquire a 2nd round pick to go along with my own.
  - ex2: Matt Jones still has a PV of 10 on my team. I could NOT bump him up to a 9, 8, 7, etc. in order to keep him. If I don't have a 10th round pick, too bad.

If you look at A-Train's team above, you can see that he really only has 2 decisions to make:

- Which players that I drafted and retained do I keep? (because there's no overlap)
- Which player that I acquired in free agency do I keep? (he can only keep 1, since he only has 1 16th round pick)

So every team sends in their list of keepers, and it looks like this:

{% include 'image.njk',
  src: "ffb/2017predraft.png",
  position: "banner",
  alt: "A screenshot of the rosters after everyone locks in keepers"
  caption: "All of the teams at the end of the 2016 season. Z-Money won. Some guy that went by NME did not. Let's not talk about that."
%}

- You can see that I decided to *only* keep Dez Bryant in the 2nd round, and I also have an extra 2nd round pick (which is Z-Money's).
- I do NOT have my first round pick, which would've been the 1st overall pick; that went to Z-Money, who used it + his to keep both David Johnson and Julio Jones.
- Allllllllll those players below the red line were players that were not kept, and will be available in the draft.

From running this league over the years, I quickly found that 16th round picks were *almost* as valuable as 1st round picks, because if someone managed to hit on multiple free agency pickups, they'd be desperate to hold on to them. Why? Well, let's quickly go to the draft.

### Year 2 - Draft

So we had the keepers, they're locked in. We have declared "I am using {pick} to keep {player}". We then have all the remaining picks to go through and draft with.

At this point, every player still retains their PV from last year; for my team (NME), Dez Bryant is still a 2, and will remain a 2 until the conclusion of the draft.

*Quick note: year 1 is the only year where you do a snake draft. Years 2 and beyond are always done worst to best, just like the regular NFL draft is.*

Here's what the 2017 draft board looked like:

{% include 'image.njk',
  src: "ffb/2017draft.png",
  position: "banner",
  alt: "A screenshot of the draft board from the 2017 draft"
  caption: "Fixed order draft for 2017 and beyond."
%}

I specifically called out Dez Bryant above, because you can see that at some point during the draft, I traded him to DD, and he slots in at the 2nd round (because of the PV).

Now, for the important & final part of managing pick values. To this point, we've had `SET`ting (via draft or free agency) and `CLEAR`ing (via dropping) of PVs, but at the end of each draft year 2 & beyond, a player officially becomes kept, and their PV is `HALVED`, rounded down.

So, to follow Dez Bryant through the whole chain:

- Year 1: drafted in the 2nd round by NME. PV set to 2.
- End of year 1: remains on NME's roster going in to the offseason. PV still 2.
- Year 2 Pre-draft: declared as a keeper w/ NME's 2nd round pick. PV still 2.
- Year 2 during the draft: traded to DD. Retains value during trades. PV still 2.[^3]
- End of Year 2 draft: officially "kept". PV is halved to 1.

[^3]: Draft-day player trades are rare, but this is a great example to call out.

So now, as the 2017 season begins, Bryant has a PV of 1. Everyone knows that next season, DD (or any team trading for him) would have to use their 1st round pick to keep him.

Here's what the PV chart looks like:

| Pre-Draft PV | PV If Kept |
| :----------: | :--------: |
| 1 | 0 |
| 2 & 3 | 1 |
| 4 & 5 | 2 |
| 6 & 7 | 3 |
| 8 & 9 | 4 |
| 10 & 11 | 5 |
| 12 & 13 | 6 |
| 14 & 15 | 7 |
| 16 | 8 |

Why does this work? A few reasons:

- A player drafted in the first round could be kept maximum 1 time before being returned to the draft pool, as a player with a PV of 0 cannot be kept
- Players in higher slots end up merging together, requiring long term planning, tough choices, and/or instigating trades
  - ex: if I keep players with both my 2nd and 3rd round picks, they'll both become players with PV of 1
  - We round down when we `HALVE` the PV to keep 1st and 16th round picks isolated from nearby picks
- A player acquired in free agency could be on someone's team for 5+ years (picked up [16], and kept 5 times [8 -> 4 -> 2 -> 1 -> 0])

### Pick Value TL;DR

- A player's pick value (PV) is initially `SET` to the round they are drafted.
- You may only keep a player with a draft pick corresponding to their PV.
- Players who are kept will have their PVs `HALVED` (rounded down) immediately following the draft.
- Players retain their PV in trades.
- A player's PV is `CLEARED` if they are dropped to free agency.
  - The player's PV is re-`SET` if the team that dropped them reacquires them before another team does
- A player's PV is `SET` to 16 if they are added from free agency.
- If you choose not to keep a player on your team that has a PV of 1, but you draft them with your first round pick, it acts as if they were kept and their PV is `HALVED` to 0.

---

It's a lot! It seems weird! But in truth, once you do one crazy offseason, everything makes perfect sense.

If anyone would like to check out the spreadsheet I used to keep track of everything, [I made a public copy for y'all to look at](https://docs.google.com/spreadsheets/d/1T5STfrvdQeQNHok6ZfpzVMBim_hG9gdC9jvLsnlIj4U/edit?usp=sharing). If you have any questions, comments, or things I can help clarify, [feel free to reach out to me](/hello/).