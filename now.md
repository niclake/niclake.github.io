---
layout: page
title: Now
permalink: /now
---

{% for post in site.categories.Now limit:1 %}
  <p><em>Last updated: {{ post.date | date: "%e %B %Y" }}</em> - <a href="https://niclake.me/categories/#Now">see previous entries here</a></p>
  <div>{{ post.content }}</div>
{% endfor %}

### Projects

- [See all my released projects here](/projects)

### Currently Reading

- _Legends & Lattes_ by Travis Baldree
- _Warbreaker_ and _Mistborn_ by Brandon Sanderson
- _Gardens of the Moon_ by Steven Erikson
- See my [full book backlog here][books], and tell me any books you think I should add/prioritize

### Currently Playing

- **Celeste** (Steam Deck)
- **Pokémon LeafGreen** (GameBoy Advance)
- See my [full game backlog here][games], and tell me any games you think I should play next

[now]: https://niclake.me/now-for-april-2024/
[books]: https://docs.google.com/spreadsheets/d/1-1PcHF6xzFKTaTvxnfjm6bVgo4pd5yIr3nbxsbckoFo/edit?usp=sharing
[games]: https://docs.google.com/spreadsheets/d/1zg-SOYI8DlH-ibSNslfPtq0xJB4sEMb_7OHKbq2qclk/edit?usp=sharing
