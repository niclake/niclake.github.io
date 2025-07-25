import navigation from '@11ty/eleventy-navigation'
import rss from '@11ty/eleventy-plugin-rss'
import syntaxhighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import lightningcss from '@11tyrocks/eleventy-plugin-sass-lightningcss'
import postgraph from '@rknightuk/eleventy-plugin-post-graph'

export default [
  {
    name: navigation
  },
  {
    name: rss
  },
  {
    name: syntaxhighlight
  },
  {
    name: lightningcss
  },
  {
    name: postgraph,
    options: {
      dayBoxTitle: true,
      dayBoxTitleFormat: 'MMMM D'
    }
  },
]