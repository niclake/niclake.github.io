---
layout: home
---

# Hello! I'm Nic

I am a lead software engineer at [Stitch Fix](https://stitchfix.com), an online personal styling service based in San Francisco, CA. I also like to [make things for fun](/projects).

You can learn more about me on my [About page](/about), or find the best way to contact me on my [Hello page](/hello).

&nbsp;

---

## Latest Posts

<div class="row">
  {% for post in site.posts limit:6 %}
    {% if post.hidden != true %}
      {% assign remainder = forloop.index | modulo: 3 %}
      <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch">
        <div class="card w-100">
          <h6><a class="title" href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h6>
          <p>{{post.description}}</p>
          <span class="post-date text-end mt-auto">{{ post.date | date: "%e %B %Y" }}</span>
        </div>
      </div>
    {% endif %}
  {% endfor %}
</div>
<div class="w-100 mb-5">
  <p class="text-center"><a href="{{ site.baseurl }}/blog/">View all posts →</a></p>
</div>

---

## Latest Projects

<div class="row">
  {% for post in site.categories.Project limit:3 %}
    {% assign remainder = forloop.index | modulo: 3 %}
    <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch">
      <div class="card w-100">
        <h6><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h6>
        {% if post.image %}
          <img src="{{ site.baseurl}}/assets/images/{{ post.image }}" />
        {% elsif post.imageabs %}
          <img src="{{ post.imageabs }}" />
        {% endif %}
        <p>{{post.projectInfo}}</p>
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
<div class="w-100 mb-5">
  <p class="text-center"><a href="{{ site.baseurl }}/projects">View all projects →</a></p>
</div>
