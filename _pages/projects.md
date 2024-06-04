---
layout: page
permalink: /projects
title: Projects
---

Below is a list of the various projects that I have worked on and released over the years. These include music, various code projects, writings, and more.

If you enjoy any of these, and would like to support my work, you can [buy me a coffee](https://ko-fi.com/niclake){:target="_blank"}. If you'd like to hire me, [please reach out](/hello).

<div class="container">
  <div class="row">
    {% for post in site.categories.Project %}
      {% assign remainder = forloop.index | modulo: 3 %}
      <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch">
        <div class="card" href="{{ site.baseurl }}{{ post.url }}">
          <div>
            <h3>{{post.title}}</h3>
            {% if post.image %}
              <img src="{{ post.image }}" />
            {% endif %}
            <p>{{post.projectInfo}}</p>
          </div>
          <div class="mt-auto text-end">
            {% if post.projectLink %}
              <a href="{{ post.projectLink }}">Project Link</a> | 
            {% endif %}
            <a href = "{{ post.url }}">Blog Post</a>
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
</div>
