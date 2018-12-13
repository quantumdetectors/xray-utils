module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "assets/**/*.{css,woff,png,jpg}",

    "index.html",

    "dist/vendor/requirejs/require.js",
    "dist/json.js",
    "dist/text.js",

    "dist/main.js",

    "dist/tables/*.json",
    "dist/tables/chantler/*.json",

    "js/worker.js",
  ],
  "swDest": "service-worker.js",
  "swSrc": "js/service-worker.js"
};
