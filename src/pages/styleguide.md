---
title: Style Guide
permalink: /styleguide/index.html
---

This is a style guide for [NicLake.me](/).

<hr />

<p>This site's theme is build around the <a href="https://draculatheme.com">Dracula</a> color scheme, along with their Alucard light scheme as a new option as of July 2025.</p>

<p>The following are the colors used within the themes, and their usage on the site:</p>

{% include 'color-blocks.njk' %}

<hr />

Everything below will be rendered based on the current color scheme you have selected. You can swap between light & dark mode to see the differences.

# This is an example of a H1 header

## This is an example of a H2 header

### This is an example of a H3 header

#### This is an example of a H4 header

##### This is an example of a H5 header

###### This is an example of a H6 header

Here is some standard text.

*This is some emphasized text.*

**Here is some bold text.**

***Here is some bolded & emphasized text.***

Here is some text with a footnote[^1].

[^1]: Here is the content of the footnote.

Here is a large paragraph. Bacon ipsum dolor amet rump chicken venison, shankle kielbasa ball tip ham hock tri-tip. Burgdoggen tenderloin shankle sausage ham hock spare ribs. Meatball tenderloin picanha cow salami tongue andouille capicola corned beef boudin. Andouille pork tail jerky pancetta, ribeye ground round corned beef doner sirloin short ribs. Chicken strip steak bacon ball tip. Leberkas tongue kielbasa doner ground round alcatra. Prosciutto pork belly shankle tri-tip buffalo beef ribs turducken burgdoggen pancetta drumstick.

Here is another large paragraph. Bacon ipsum dolor amet corned beef drumstick pork loin spare ribs tenderloin pig t-bone picanha short loin meatball pork jowl bacon cupim chuck. Jowl hamburger pastrami bresaola sausage. Beef shank brisket flank porchetta, spare ribs pork loin corned beef tail pig tongue. Pork chop spare ribs corned beef, short loin picanha meatball porchetta prosciutto filet mignon pork belly swine pastrami. Chuck flank meatloaf chicken alcatra fatback turkey cupim bacon cow salami meatball filet mignon corned beef burgdoggen. Prosciutto shank pancetta pork sirloin ground round corned beef biltong frankfurter beef ribs brisket salami bacon. Shankle pastrami chuck prosciutto spare ribs.

Lists are done by appending with a symbol like `*` or `-` for unordered lists, or `1.` for numbered lists:

- Example of an unordered list.
- Another line.
- A third line w/ a different symbol

1. Example of an ordered list.
2. Another line.

You do not need to increment your numbered lists if you do not want to:

1. First element
1. Second element, even though it's a `1`

Below is a horizontal rule:

---

Here is [an example inline link](https://google.com), and here is [an example link w/ organized URLs][orglink].

[orglink]: https://yahoo.com

If you want to have some inline code, wrap in single backticks, like this: `google.com`.

If you want to use a code block, wrap everything in triple backticks:

```c
for (i=0, i<10, i++) { print i; }
```

You should follow the initial line of backticks with the appropriate language for syntax highlighting:

``` ruby
class CrazyPass < ApplicationRecord
  belongs_to :api_client
  belongs_to :auto_renewed_from, class_name: "CrazyPass", optional: true

  scope :active, -> {
    where(canceled_at: nil).where(auto_renewed_at: nil).where("expiration_date >= ?", Time.current.beginning_of_day)
  }

  AUTO_RENEWED = :auto_renewed
  RENEW = "renew".freeze

  validate :presence_of_auto_renew
  validate :client_can_only_have_one_crazy_pass
  validate :valid_absurd_transaction_request_state
  validates_presence_of :client_id
  after_create :generate_insanity_renewal

  def self.auto_renew_candidates
    CrazyPass.auto_renew_first_charge_candidates.or(CrazyPass.auto_renew_second_charge_candidates)
  end
end
```

Inline quotes look as follows:

> Apple Watch Series 9 is powered by custom Apple silicon in the all-new S9 SiP. Apple’s most powerful watch chip yet delivers systemwide improvements and brand-new features, including a new double tap gesture and on-device Siri with the ability to access and log health data privately and securely. Apple Watch Series 9 also has a new 4-core Neural Engine that can process machine learning tasks up to twice as fast, when compared with Apple Watch Series 8. The power efficiency of the S9 SiP allows Apple Watch Series 9 to maintain all-day 18-hour battery life.  

Multi-line quotes require 2 spaces after each line:

> Here we are  
> sitting on the couch  
> the cats are snoring  
> stink breath  

Table example:

| Standard align | Left Align | Center Align | Right Align |
|---|:--|:-:|--:|
| Sample of a standard align cell | Sample of a left align cell | Sample of a center align cell | Sample of a right align cell |

Images can be put in like this:

{% include 'image.njk',
  src: "hats/hats.jpg",
  alt: "The current collection of hats",
  caption: "From left to right: my non-sports related hats, my non-Red Sox sport hats, and all of my Red Sox hats, plus some beanies in the back."
%}

{% include 'image.njk',
  src: "hats/redsoxhat.png",
  position: "right"
%}

You can use `position` to place an image `left` or `right` of the content, or use `banner` for full width. Use a `caption` to add a text caption below the image. If being positioned left/right, you should place the image block before the content.

The full template for using `_include/image.html`:

{% raw %}

``` liquid
{% comment %}
  src: The local path to the image; assumes images/,
  srcabs: The external URL of the image (Imgur, etc.),
  url: The URL clicking the link will take you to,
  position: `left` or `right`,
  alt: "the alt text"
{% endcomment %}

{% include 'image.njk',
  src: "site/its-me-hi.png",
  position: "right",
  alt: "It's me, hi. I'm the blogger, it's me."
%}
```

{% endraw %}
