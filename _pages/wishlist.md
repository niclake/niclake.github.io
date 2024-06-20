---
layout: page
title: Wishlist
permalink: /wishlist
---

Hello! If you're reading this, you've apparently tracked down the Lake Family Holiday Wishlist (somehow). This is a list of ideas to get Nic, his partner, or his daughter for the holiday seasons (or any time, if you're feeling generous)!

If you are wanting to get stuff for us, but are wondering where to send it, you can find my contact info on my [Hello page](/hello).

## V's List

- Things from [V's Amazon Wish List](https://www.amazon.com/hz/wishlist/ls/2J1F8GO0YW309/ref=nav_wishlist_lists_2)

---

## R's List

- Things from [R's Amazon Wish List](https://www.amazon.com/hz/wishlist/ls/1KI7GH0R68MTX?ref_=wl_share)

---

## Nic's List

<div class="accordion" id="wishlistAccordion">
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        Things & Stuff
      </button>
    </h3>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#wishlistAccordion">
      <div class="accordion-body">
        <ul>
          {% for thing in site.data.wishlist.things %}
            <li>
              {% if thing.url %}<a href="{{ thing.url }}">{% endif %}
              {{ thing.name }}{% if thing.notes %}&nbsp;({{ thing.notes }}){% endif %}
              {% if thing.url %}</a>{% endif %}
              {% if thing.options %}
                <ul>
                  {% for subthing in thing.options %}
                    <li>
                      {% if subthing.url %}<a href="{{ subthing.url }}">{% endif %}
                      {{ subthing.name }}{% if subthing.notes %}&nbsp;({{ subthing.notes }}){% endif %}
                      {% if subthing.url %}</a>{% endif %}
                    </li>
                  {% endfor %}
                </ul>
              {% endif %}
            </li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        T-Shirts from Cotton Bureau
      </button>
    </h3>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#wishlistAccordion">
      <div class="accordion-body">
        <h6>All sized large, please.</h6>
        <div class="container">
          <div class="row justify-content-center">
            {% for shirt in site.data.wishlist.shirts %}
              <div class="col-lg-3 col-md-6 col-sm-6 d-flex align-items-stretch">
                <div class="card wishlist">
                  <a href="{{ shirt.url }}">
                    <h6>{{ shirt.name }}</h6>
                    <img src="{{ shirt.img }}" alt="{{ shirt.name }}" />
                  </a>
                  <span>{{ shirt.color }}</span>
                </div>
              </div>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Hats
      </button>
    </h3>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#wishlistAccordion">
      <div class="accordion-body">
        <h6>All fitted hats size 7 1/2, please</h6>
        <div class="accordion" id="hatAccordion">
          {% for team in site.data.wishlist.hats %}
            <div class="accordion-item">
              <h4 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-{{team.name | replace: " ", "-" }}" aria-expanded="false" aria-controls="collapse-{{team.name | replace: " ", "-" }}">
                  {{ team.name }}
                </button>
              </h4>
              <div id="collapse-{{team.name | replace: " ", "-" }}" class="accordion-collapse collapse" data-bs-parent="#hatAccordion">
                <div class="accordion-body">
                  <div class="container">
                    <div class="row justify-content-center">
                      {% for hat in team.hats %}
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex align-items-stretch">
                          <div class="card wishlist">
                            <a href="{{ hat.url }}">
                              <h6>{{ hat.name }}</h6>
                              <img src="{{ hat.img }}" alt="{{ team.name }} - {{ hat.name }}" />
                            </a>
                          </div>
                        </div>
                      {% endfor %}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        Jerseys
      </button>
    </h3>
    <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#wishlistAccordion">
      <div class="accordion-body">
        <h6>All size medium, please. <strong><em>Italics</em></strong> indicate priority. Some players have specific links.</h6>
        <div class="container">
          <div class="row justify-content-center">
            {% for team in site.data.wishlist.jerseys %}
              <div class="col-lg-4 col-md-6 col-sm-6 d-flex align-items-stretch">
                <div class="card wishlist">
                  <h5>{{ team.name }}</h5>
                  {% if team.colors %}<span class="mb-3">{% endif %}
                    {% for color in team.colors %}
                      <a href="{{ color.url }}">{{ color.name }}</a>
                      {% unless forloop.last %}&nbsp;|&nbsp;{% endunless %}
                    {% endfor %}
                  {% if team.colors %}</span>{% endif %}
                  <ul>
                    {% for player in team.players %}
                      <li>
                        {% if player.url %}<a href="{{ player.url }}">{% endif %}
                          {% if player.priority %}<strong><em>{% endif %}
                          {{ player.name }} - {{ player.number }}
                          {% if player.priority %}</em></strong>{% endif %}
                        {% if player.url %}</a>{% endif %}
                      </li>
                    {% endfor %}
                  </ul>
                </div>
              </div>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
        Vinyl
      </button>
    </h3>
    <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#wishlistAccordion">
      <div class="accordion-body">
        <div class="container">
          <div class="row justify-content-center">
            {% for artist in site.data.wishlist.vinyl %}
              <div class="col-lg-4 col-md-6 col-sm-6 d-flex align-items-stretch">
                <div class="card wishlist">
                  <h6>{{ artist.name }}</h6>
                  <ul>
                    {% for album in artist.albums %}
                      <li>{{ album }}</li>
                    {% endfor %}
                  </ul>
                </div>
              </div>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
        Cookbooks
      </button>
    </h3>
    <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#wishlistAccordion">
      <div class="accordion-body">
        <ul>
          {% for book in site.data.wishlist.cookbooks %}
            <li><a href="{{ book.url }}">{{ book.name }}</a></li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
        Gift Certificates
      </button>
    </h3>
    <div id="collapseSeven" class="accordion-collapse collapse" data-bs-parent="#wishlistAccordion">
      <div class="accordion-body">
        <ul>
          {% for gc in site.data.wishlist.gcs %}
            <li>
              {% if gc.url %}<a href="{{ gc.url }}">{% endif %}
              {{ gc.name }}
              {% if gc.url %}</a>{% endif %}
            </li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </div>
</div>
