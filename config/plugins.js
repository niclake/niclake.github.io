import navigation from '@11ty/eleventy-navigation'
import rss from '@11ty/eleventy-plugin-rss'
import syntaxhighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import lightningcss from '@11tyrocks/eleventy-plugin-sass-lightningcss'
import postgraph from '@rknightuk/eleventy-plugin-post-graph'
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

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
  // {
  //   name: eleventyImageTransformPlugin,
  //   options: {
  //     formats: ["auto"],
  //     extensions: "html,njk",
  //     outputDir: "./assets/images/",
  //     urlPath: '/assets/images/',
  //     cacheOptions: {
  //       duration: "*",
  //       directory: ".cache",
  //       removeUrlQueryParams: false,
  //     },
  //     widths: [200, 400, 600, 'auto'],
  //     htmlOptions: {
  //       imgAttributes: {
  //         alt: "",
  //         loading: "lazy",
  //         decoding: "async",
  //       },
  //       pictureAttributes: {},
  //       fallback: "largest"
  //     }
  //   }
  // }
]