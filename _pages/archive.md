---
layout: page
permalink: /archive
title: Archive
---

<div id="archives">
  {% for post in site.posts %}
    {% if post.hidden != true %}
      {% assign currentdate = post.date | date: "%Y" %}
      {% if currentdate != date %}
        {% unless forloop.first %}</ul>{% endunless %}
        <h3 id="{{currentdate}}">{{ currentdate }}</h3>
        <ul class="no-list-style">
        {% assign date = currentdate %}
      {% endif %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a> 
          <span class="post-date">{{ post.date | date: "%e %B" }}</span>
        </li>
    {% endif %}
  {% endfor %}
