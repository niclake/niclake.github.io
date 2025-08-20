import collections from './config/collections.js'
import plugins from './config/plugins.js'
import shortcodes from './config/shortcodes.js'
import drafts from './config/drafts.js'
import dateFilters from './config/filters/date.js'
import postFilters from './config/filters/posts.js'
import fs from 'fs'
import moment from "moment"
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it"
import markdownItFootnote from "markdown-it-footnote"
import markdownItAttrs from "markdown-it-attrs"
import markdownItAnchor from 'markdown-it-anchor'
  
export default function (eleventyConfig) {
  const options = {
    html: true, // HTML tags in source
    breaks: true, // Convert '\n' in paragraphs to <br>
    linkify: true // Auto-convert URL text to links
  }

  let markdownLib = markdownIt(options)
    .use(markdownItFootnote)
    .use(markdownItAttrs)
    .use(markdownItAnchor)

  eleventyConfig.setLibrary('md', markdownLib);

  // Liquid options
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true,
    root: ["src/_includes"],
    extname: ".html"
  });

  // Handle drafts and scheduled posts
  eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
    return (data) => {
      return drafts.shouldBuild(data) ? data.permalink : false;
    };
  });

  eleventyConfig.addGlobalData(
    "eleventyComputed.eleventyExcludeFromCollections",
    function () {
      return (data) => {
        return drafts.shouldBuild(data) ? data.eleventyExcludeFromCollections : true;
      };
    }
  );

  eleventyConfig.on("eleventy.before", ({ runMode }) => {
    if (runMode === "serve" || runMode === "watch") {
      process.env.BUILD_DRAFTS = true;
    }
  });

  // Passthroughs
  ['src/assets', '{ "node_modules/littlefoot/dist/littlefoot.js": "assets/js/littlefoot.js" }'].forEach(path => {
    eleventyConfig.addPassthroughCopy(path,
      {
        filter: path => !path.endsWith('.scss') && !path.startsWith('_')
      }
    )
  })

  // Plugins
  plugins.forEach(plugin => {
    eleventyConfig.addPlugin(plugin.name, { ...plugin.options })
  })

  // eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
	// 	extensions: "njk",
	// 	// formats: ["avif", "webp", "jpeg"],
	// 	// outputDir: "./assets/images/",
  //   // urlPath: '/assets/images/',
	// 	cacheOptions: {
	// 		duration: "*",
	// 		directory: ".cache",
	// 		removeUrlQueryParams: false,
	// 	},
	// 	widths: [300, 600, 900, 1200],
	// 	// widths: ['auto'],
  //   htmlOptions: {
  //     imgAttributes: {
  //       loading: "lazy",
  //       // sizes: "100vw",
  //       decoding: "async",
  //     },
  //     pictureAttributes: {}
  //   },
	// })

  // Collections
  Object.keys(collections).forEach(collectionName => {
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  })

  // Shortcodes
  Object.keys(shortcodes).forEach(shortcodeName => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  })

  // SVG
  let getSvgContent = function (file) {
    let relativeFilePath = `./src/assets/${file}.svg`;
    let data = fs.readFileSync(relativeFilePath, 
    function(err, contents) {
       if (err) return err
       return contents
    });

    return data.toString('utf8');
  }
  eleventyConfig.addShortcode("svg", getSvgContent)

  const md = new markdownIt({
    html: true
  });
  
  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content);
  });

  // Filters
  Object.keys(dateFilters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, dateFilters[filterName])
  })

  // Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts", "page"].indexOf(tag) === -1);
	});

  eleventyConfig.addFilter("afterDateForRss", function afterDateForRss(collection) {
    return collection.filter((p) => {
      return moment(p.date).isAfter(moment("2018-08-01"));
    });
  });

  // Object.keys(postFilters).forEach(filterName => {
  //   eleventyConfig.addFilter(filterName, dateFilters[filterName])
  // })
  
  // eleventyConfig.addPlugin(feedPlugin, {
	// 	type: "atom", // or "rss", "json"
	// 	outputPath: "/feed.xml",
	// 	collection: {
	// 		name: "post", // iterate over `collections.posts`
	// 		limit: 10,     // 0 means no limit
	// 	},
	// 	metadata: {
	// 		language: "en",
	// 		title: "Nic Lake",
	// 		subtitle: "Life, technology, family, and more.",
	// 		base: "https://niclake.me",
	// 		author: {
	// 			name: "Nic Lake",
	// 			email: "niclake13@gmail.com", // Optional
	// 		}
	// 	}
	// });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    }
  }
};
