const collections = require('./config/collections')
const plugins = require('./config/plugins')
const shortcodes = require('./config/shortcodes.js')
const dateFilters = require('./config/filters/date.js')
const postFilters = require('./config/filters/posts.js')
const fs = require('fs')

  
module.exports = function (eleventyConfig) {
  const markdownIt = require("markdown-it")
  const markdownItFootnote = require("markdown-it-footnote")
  const markdownItAttrs = require("markdown-it-attrs")
  const markdownItAnchor = require('markdown-it-anchor')

  const options = {
    html: true,
    breaks: true,
    linkify: true
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

  // Passthroughs
  ['src/assets', '{ "node_modules/littlefoot/dist/littlefoot.js": "assets/js/littlefoot.js" }'].forEach(path => {
    eleventyConfig.addPassthroughCopy(path, {
      filter: path => !path.endsWith('.scss') && !path.startsWith('_')
    })
  })

  // Plugins
  plugins.forEach(plugin => {
    eleventyConfig.addPlugin(require(plugin.name), { ...plugin.options })
  })

  // collections
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
    }
  }
};
