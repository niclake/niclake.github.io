---
title: "Daily Sports Schedules and Standings Email"
projectName: Daily Sports Email
projectInfo: A GitHub Action written in NodeJS that pulls in schedules & standings, and sends you an email on a schedule.
projectLink: https://github.com/niclake/daily-sports-email
image: mlb-example.jpg
permalink: /daily-sports-email/index.html
date: 2024-06-24T15:00:00Z
tags: 
  - Project
  - NodeJS
  - Sports
---

{% include 'image.njk',
  src: "mlb-example.jpg",
  url: "https://github.com/niclake/daily-sports-email",
  position: "banner",
  alt: "A GitHub Action written in NodeJS that pulls in schedules & standings, and sends you an email on a schedule.",
  caption: "A GitHub Action written in NodeJS that pulls in schedules & standings, and sends you an email on a schedule."
%}

I am the type of person that needs information put right in front of me if I want to guarantee that I'll see it. As a sports fan, this means that I'd like to know what the schedule of games is every day, especially for baseball games during the workday; I don't know what it is, but having baseball on as ambient noise is one of my favorite things.

[I had a Shortcut set up](/mlb-schedule-shortcut/) that would send me the MLB schedule every morning. However, about a year ago, Apple killed off the ability to send HTML formatted emails via Shortcuts, and they've made no move to fix it. So, rather than getting a bland, boring email every morning, I decided to try something new.

The end result: [my new Daily Sports Emails project](https://github.com/niclake/daily-sports-email). Written in NodeJS (which is new to me), and executed via a GitHub Action, this is a great solution for me to be able to get what I need.

## Current Features

- MLB, NBA, and NFL schedules & standings can be sent out each day
- For schedules, the grid shows start times, current team records, and (for baseball) the probable starters
- For standings, it shows each league/conference/division, along with current playoff standings where appropriate
- For the NFL, you get a weekly email on Wednesday showing every upcoming game. Also, each NFL email includes a direct link to 506Sports, so you can see what games are broadcast in your area
- You can flag any team(s) as "favorites", which highlights them in the schedules & standings to quickly pull your eyes to the important teams and games
- There are options to configure this to send from any service provider that allows for SMTP
- There are options to configure the game times based on your time zone, and display in 12 or 24 hour time

## Coming Soon

*(as of 21 Dec 2024)*

- If I can figure it out, it'd be cool to highlight the games local to the user based on their county, similar to how [506Sports](https://506sports.com) does with their maps
- A configuration tool to make setup easier
- An option to show schedules or standings individually per league
- An option to only display games involving your favorite teams
- An option to receive an email every Monday morning with that week's schedules for your favorite teams across all sports

If you have any thoughts about how I could improve this, feel free to [reach out](/hello/). If you enjoy this project, you can [buy me a coffee](https://ko-fi.com/niclake){:target="_blank"}.
