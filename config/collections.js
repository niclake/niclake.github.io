import moment from 'moment'

// const makePath = (type) => {
//   const year = new Date().getFullYear();
//   return `src/posts/${year}/**/*.md`;
// };

export default {
  postsForFeed: (collectionApi) => {
    const year = new Date().getFullYear();
    return collectionApi
      .getAllSorted()
      .reverse()
      .filter((p) => {
        return moment(p.date).isAfter(moment("2018-08-01"));
      });
  },
};
