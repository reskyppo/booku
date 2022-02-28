const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/fee-assessment-categories", {
      target: "https://asia-southeast2-sejutacita-app.cloudfunctions.net",
      secure: false,
      changeOrigin: true,
    })
  );
};
