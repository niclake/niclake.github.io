const moment = require("moment");

module.exports = {
  postsForFeed: (collectionApi) => {
    return collectionApi
      .getFilteredByGlob(makePath("blog"))
      .reverse()
      .filter((p) => {
        return moment(p.date).isAfter(moment("2018-08-01"));
      });
  },
};
