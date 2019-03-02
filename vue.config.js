let branch = process.env.VUE_APP_GIT_BRANCH;
if (branch === "master") {
  branch = "";
}
if (process.env.NODE_ENV === "development") {
  branch = "";
}

module.exports = {
  publicPath: "/" + branch
};
