---
layout: page
permalink: /categories
title: Categories
---

<div id="categories">
  {% assign sorted_cats = site.categories | sort %}
  {% for category in sorted_cats %}
    {% assign sorted_posts = category[1] | sort: 'title' %}
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <h3 id="{{ category_name | slugize }}" class="category-head">{{ category_name | replace: "-", " " }}</h3>
    <ul class="no-list-style">
      {% for post in site.categories[category_name] %}
        <li>
          <a href="{{post.url}}">{{post.title}}</a>
          <span class="post-date">{{ post.date | date: "%e %B %Y" }}</span>
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>