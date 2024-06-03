---
layout: page
title: Pages
permalink: /pages
---

<div class="container">
  <div class="row">
    {% for page in site.data.navigation %}
      {% unless page.pages == false %}
        {% assign remainder = forloop.index | modulo: 3 %}
        <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch">
          <div class="card">
            <div>
              <h4><a href="{{ site.baseurl }}{{ page.url }}">{{page.text}}</a></h4>
              <p>{{page.blurb}}</p>
            </div>
          </div>
        </div>
      {% endunless %}
    {% endfor %}
  </div>
</div>
