importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

if (workbox) {
  	console.log(`Yay! Workbox is loaded 🎉`)

  	workbox.precaching.precacheAndRoute([
  {
    "url": "assets/css/stylesheets/main.css",
    "revision": "6587a6a6c6a92602fde06620b20cc7aa"
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
    "url": "assets/images/icons/qd-128.png",
    "revision": "58748bc5bac86ef2b88e4f9a77ed21f7"
  },
  {
    "url": "assets/images/icons/qd-144.png",
    "revision": "facd79e5e10dd0f499d96bc27e8d5b63"
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
    "url": "assets/images/icons/qd-192.png",
    "revision": "ed693a291317d55b606c6d32d02b80cd"
  },
  {
    "url": "assets/images/icons/qd-256.png",
    "revision": "45364b1ef0afcaecbd2b2fb31bf0a9b8"
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
    "url": "assets/images/splash/splash-1125x2436.png",
    "revision": "e0263908567b4d459975aff58cadce1b"
  },
  {
    "url": "assets/images/splash/splash-1242x2208.png",
    "revision": "22b653e5b969d06252911acd29a85791"
  },
  {
    "url": "assets/images/splash/splash-1536x2048.png",
    "revision": "a3cc19dc7046757b0ce2554dc7f01736"
  },
  {
    "url": "assets/images/splash/splash-1668x2224.png",
    "revision": "897b6589956e48b123f3545bb32dd876"
  },
  {
    "url": "assets/images/splash/splash-2048x2732.png",
    "revision": "41674bf5c6d65103e0f4506a07ef9ad2"
  },
  {
    "url": "assets/images/splash/splash-640x1136.png",
    "revision": "6cd57d0db4f7ec74a7cc928b6ec5dc4a"
  },
  {
    "url": "assets/images/splash/splash-750x1334.png",
    "revision": "28e4b3f3f7a29e5f8169e0f12f5f76ef"
  },
  {
    "url": "index.html",
    "revision": "b8d55a1910ed21cb099bb5e5dc754317"
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
    "revision": "1adc643d271d926eb95acb3263658b77"
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
    "revision": "403ef2e8b19fe6540e63945e98a875d3"
  },
  {
    "url": "js/worker.js",
    "revision": "0ef7127dc9a11dcb7df255d826dd8f56"
  }
]);
  	workbox.googleAnalytics.initialize({
	  	parameterOverrides: {
	    	cd1: 'offline',
	  	},
	})

} else {
  	console.log(`Boo! Workbox didn't load 😬`)
}
