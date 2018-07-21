importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "assets/css/stylesheets/main.css",
    "revision": "5fa3cb7031cddb16cb9c18a30b704e2f"
  },
  {
    "url": "assets/fonts/DroidSans-Bold.woff",
    "revision": "4140e9133bc48bcf9f7990047158208d"
  },
  {
    "url": "assets/fonts/DroidSans.woff",
    "revision": "b9280c3d6d832a0ef201332089c83f42"
  },
  {
    "url": "assets/fonts/DroidSerif-Italic.woff",
    "revision": "389b802fe97acbc482b086d2b4c006b9"
  },
  {
    "url": "assets/fonts/MavenProRegular.woff",
    "revision": "dc499448756cf4dd07b0005530ee3280"
  },
  {
    "url": "assets/fonts/NavIcons.woff",
    "revision": "a261f21ad32df82b6c310d89a0aa0110"
  },
  {
    "url": "assets/images/icons/qd-120.png",
    "revision": "afa394bb585f9b5916bb67d1582a899e"
  },
  {
    "url": "assets/images/icons/qd-152.png",
    "revision": "c49475fb404ad2578ba50b6fcc1edc94"
  },
  {
    "url": "assets/images/icons/qd-167.png",
    "revision": "b38a542409ef6c318e39e1107c4d9ec1"
  },
  {
    "url": "assets/images/icons/qd-180.png",
    "revision": "80f566bb9bc2b7c437b3e933e6257dae"
  },
  {
    "url": "assets/images/ios/home.png",
    "revision": "ade791f3126abdfd33aa331c2add108d"
  },
  {
    "url": "assets/images/ios/share.png",
    "revision": "80c1ea06ed077fc0d13721d1794a78c6"
  },
  {
    "url": "assets/images/logo.png",
    "revision": "bf25f8be159cff3f21e9398d49be2927"
  },
  {
    "url": "assets/images/qd.png",
    "revision": "179602e000e84306ce4652e8e4e1e10d"
  },
  {
    "url": "assets/images/splash/splash-640x1136.png",
    "revision": "cbcf6d6b3e893792152a876feee48eda"
  },
  {
    "url": "index.html",
    "revision": "4fdcd5ccb30707522ca55dc48b39cff6"
  },
  {
    "url": "dist/vendor/requirejs/require.js",
    "revision": "475247aab6faba793626df02b947e9cb"
  },
  {
    "url": "dist/json.js",
    "revision": "64acdddd329f963b7ceaf968b92f2c65"
  },
  {
    "url": "dist/text.js",
    "revision": "9748fd318bbb3f9f2fa7121410118a31"
  },
  {
    "url": "dist/main.js",
    "revision": "e3196e1cfd4a3723f84d9eb9d06ad536"
  },
  {
    "url": "dist/tables/elements.json",
    "revision": "47eddb288a7e9eefbff18e9736ef7825"
  },
  {
    "url": "dist/tables/materials.json",
    "revision": "eba20caffe4543fc0371141ec28d54c2"
  },
  {
    "url": "dist/tables/statuses.json",
    "revision": "33b4865ccf28127cfa2fff824f83c8b3"
  },
  {
    "url": "js/worker.js",
    "revision": "0ef7127dc9a11dcb7df255d826dd8f56"
  }
]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
