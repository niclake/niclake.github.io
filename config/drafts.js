const now = Date.now();
const isScheduled = function (data) {
  return new Date(data.date) > now;
}

const shouldBuild = function (data) {
  return !(data.draft || isScheduled(data)) || process.env.BUILD_DRAFTS;
}

export default {
  shouldBuild
}