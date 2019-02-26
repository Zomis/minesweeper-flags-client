let branch = process.env.VUE_APP_GIT_BRANCH;
if (branch === "master") {
  branch = "";
}

module.exports = {
  publicPath: "/" + branch
};
