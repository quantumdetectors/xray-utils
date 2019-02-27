importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

if (workbox) {
  	console.log(`Yay! Workbox is loaded 🎉`)

  	workbox.precaching.precacheAndRoute([
  {
    "url": "assets/css/stylesheets/main.css",
    "revision": "8c6a2d437ddcd01b07add183c986cc06"
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
    "revision": "5ed216584ded839fd96aded22e9e6a72"
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
    "revision": "465bcef8401add2ade9cf414ada2cb88"
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
    "revision": "567af3bd447beec62dedb842fef768de"
  },
  {
    "url": "dist/tables/chantler/01.json",
    "revision": "c92512f9cf1dff455eaa6e0c604d4da3"
  },
  {
    "url": "dist/tables/chantler/02.json",
    "revision": "dc29821f80c5ea042d1ce90b842d9a7d"
  },
  {
    "url": "dist/tables/chantler/03.json",
    "revision": "4b717f8e754bd255a38e1aaed2e37b7d"
  },
  {
    "url": "dist/tables/chantler/04.json",
    "revision": "194f3ef67af40c10b506471d6fa74919"
  },
  {
    "url": "dist/tables/chantler/05.json",
    "revision": "c9a62260b475db6b05ef0880b9f357ed"
  },
  {
    "url": "dist/tables/chantler/06.json",
    "revision": "3aa92155c932d90229e3583a7fc102ec"
  },
  {
    "url": "dist/tables/chantler/07.json",
    "revision": "72a73d98307929a984d4e40948544044"
  },
  {
    "url": "dist/tables/chantler/08.json",
    "revision": "bd28d9d8dbd523e5e827a7ec3aea6524"
  },
  {
    "url": "dist/tables/chantler/09.json",
    "revision": "70ef28e686d79e09a299effd62e74386"
  },
  {
    "url": "dist/tables/chantler/10.json",
    "revision": "234a7ca251039ae15ec73d4d81039426"
  },
  {
    "url": "dist/tables/chantler/11.json",
    "revision": "e2087f885e0e1b0193aa954a9f28a87d"
  },
  {
    "url": "dist/tables/chantler/12.json",
    "revision": "02df03395416316af379e4353309421a"
  },
  {
    "url": "dist/tables/chantler/13.json",
    "revision": "7f87d81880b1235e257bcd595884a62c"
  },
  {
    "url": "dist/tables/chantler/14.json",
    "revision": "d913da3755f6fbae8dab1bb9eb8877db"
  },
  {
    "url": "dist/tables/chantler/15.json",
    "revision": "bc62b553dde0393768b4c99dfb6851c7"
  },
  {
    "url": "dist/tables/chantler/16.json",
    "revision": "03ed0a2b46398e3a3dd7ca4213eb277e"
  },
  {
    "url": "dist/tables/chantler/17.json",
    "revision": "dff59caebb268e1f5b90b8d5d904ab8a"
  },
  {
    "url": "dist/tables/chantler/18.json",
    "revision": "0b5d7e9ffd9746acf9129ce5d0786336"
  },
  {
    "url": "dist/tables/chantler/19.json",
    "revision": "4cff26bbc9f4380505b0182ed9de412b"
  },
  {
    "url": "dist/tables/chantler/20.json",
    "revision": "598392a4e1fb1d8b94c664aa8d85aa47"
  },
  {
    "url": "dist/tables/chantler/21.json",
    "revision": "01558cc216ed8d8d5bf07c21c2212422"
  },
  {
    "url": "dist/tables/chantler/22.json",
    "revision": "a907d9ea5f05fddc2e1ad904cc6999b7"
  },
  {
    "url": "dist/tables/chantler/23.json",
    "revision": "cc5921d32f527379e5191b8ca78bc026"
  },
  {
    "url": "dist/tables/chantler/24.json",
    "revision": "cedf6ef7012796b9927db4730f12363a"
  },
  {
    "url": "dist/tables/chantler/25.json",
    "revision": "230ef47d1e758cb9b9215d3828f47d51"
  },
  {
    "url": "dist/tables/chantler/26.json",
    "revision": "150796af115865b7c82a80b3c5e22b30"
  },
  {
    "url": "dist/tables/chantler/27.json",
    "revision": "d660db439a892cf7b73b89dca5cf0cad"
  },
  {
    "url": "dist/tables/chantler/28.json",
    "revision": "40960ac29fec8bffd85c7a8a7e5cd03c"
  },
  {
    "url": "dist/tables/chantler/29.json",
    "revision": "d3adb4573e25f1d60a5c34d8c54b4b0f"
  },
  {
    "url": "dist/tables/chantler/30.json",
    "revision": "6742d428219a04b10c78fd1a8e735988"
  },
  {
    "url": "dist/tables/chantler/31.json",
    "revision": "951bc2908b374134258413d2940effe7"
  },
  {
    "url": "dist/tables/chantler/32.json",
    "revision": "16a826418161823284563218d3fba656"
  },
  {
    "url": "dist/tables/chantler/33.json",
    "revision": "04c70c3a82e31689c32a1299710158fb"
  },
  {
    "url": "dist/tables/chantler/34.json",
    "revision": "3f855553ab81268e854f4668e71d9338"
  },
  {
    "url": "dist/tables/chantler/35.json",
    "revision": "e10fe836c89f0d80423ee904f8770d20"
  },
  {
    "url": "dist/tables/chantler/36.json",
    "revision": "230d24c7a9bee8841b75be42deb39253"
  },
  {
    "url": "dist/tables/chantler/37.json",
    "revision": "965c8b3b65b143109ef65e3b5befbd25"
  },
  {
    "url": "dist/tables/chantler/38.json",
    "revision": "5e28a044047eb03b5cf12e0242d4904a"
  },
  {
    "url": "dist/tables/chantler/39.json",
    "revision": "c2246c099eebf763ed7b8261cc618ca1"
  },
  {
    "url": "dist/tables/chantler/40.json",
    "revision": "b19cfe70666fe092f033c7d3f35efbca"
  },
  {
    "url": "dist/tables/chantler/41.json",
    "revision": "457a0760be265a3b4b399be20c91b692"
  },
  {
    "url": "dist/tables/chantler/42.json",
    "revision": "5436d9e52b901ea0475fd34fb5ca3e99"
  },
  {
    "url": "dist/tables/chantler/43.json",
    "revision": "728cbcc747d72b1a7b5ec0d8f8fe8199"
  },
  {
    "url": "dist/tables/chantler/44.json",
    "revision": "9a66e62049fc52105337b63d0cbf70c4"
  },
  {
    "url": "dist/tables/chantler/45.json",
    "revision": "fb78dfe2b8ce1e30bef85834aeb6692b"
  },
  {
    "url": "dist/tables/chantler/46.json",
    "revision": "63d865760a624e92eeb744b782ba8ce1"
  },
  {
    "url": "dist/tables/chantler/47.json",
    "revision": "0697a36a98d3c8a97efbedf8095ed538"
  },
  {
    "url": "dist/tables/chantler/48.json",
    "revision": "310f14b56c68d76fc3fb01ce5eda21af"
  },
  {
    "url": "dist/tables/chantler/49.json",
    "revision": "d15e20541e8a64f50d51e50aef577e13"
  },
  {
    "url": "dist/tables/chantler/50.json",
    "revision": "75d20e365e6c251bdabb97805a3838c4"
  },
  {
    "url": "dist/tables/chantler/51.json",
    "revision": "a308e5fa50deca83eb0c1364c434deae"
  },
  {
    "url": "dist/tables/chantler/52.json",
    "revision": "67d6cf158260f8e19dfbd8e3ed02a22d"
  },
  {
    "url": "dist/tables/chantler/53.json",
    "revision": "7aaa5394496b7a1952ce21bbefc43b5f"
  },
  {
    "url": "dist/tables/chantler/54.json",
    "revision": "f8b46891632cdb919336306c399f5b41"
  },
  {
    "url": "dist/tables/chantler/55.json",
    "revision": "ea55321affe8517770368c0c5c0e32fb"
  },
  {
    "url": "dist/tables/chantler/56.json",
    "revision": "53f01509577569132096ad1c874173a2"
  },
  {
    "url": "dist/tables/chantler/57.json",
    "revision": "4806a0ad5a7dcd975a9a1588c3fe116d"
  },
  {
    "url": "dist/tables/chantler/58.json",
    "revision": "6953c7ddb657a2f8da78bf3ba9b2b804"
  },
  {
    "url": "dist/tables/chantler/59.json",
    "revision": "281e95fe96b3bf3a2c396a9f2bdf1f5b"
  },
  {
    "url": "dist/tables/chantler/60.json",
    "revision": "12b021eb55c6695013495b0f7cb9a7e6"
  },
  {
    "url": "dist/tables/chantler/61.json",
    "revision": "1c64faea10cc8d54aa0da956d4e764c5"
  },
  {
    "url": "dist/tables/chantler/62.json",
    "revision": "ef900822ab26723f91efc4a4faaaf36a"
  },
  {
    "url": "dist/tables/chantler/63.json",
    "revision": "23f1b6edc912a48a36bc27bb2831b623"
  },
  {
    "url": "dist/tables/chantler/64.json",
    "revision": "9a7c9903801e65d95a1edd05f6a374fd"
  },
  {
    "url": "dist/tables/chantler/65.json",
    "revision": "e894b167234ea48db158d69779dcb87b"
  },
  {
    "url": "dist/tables/chantler/66.json",
    "revision": "eb31bd607929c8d2f503ce291bb7b548"
  },
  {
    "url": "dist/tables/chantler/67.json",
    "revision": "87c92a2911d6ead66f9a7c4b51b39150"
  },
  {
    "url": "dist/tables/chantler/68.json",
    "revision": "c6875fe96fda99918675ac42ff659550"
  },
  {
    "url": "dist/tables/chantler/69.json",
    "revision": "9362723e32490af089fa0f7e752420ee"
  },
  {
    "url": "dist/tables/chantler/70.json",
    "revision": "c3458e2f5a1d6918e06356df6e512130"
  },
  {
    "url": "dist/tables/chantler/71.json",
    "revision": "a4e4578feba37b0e56825d2a88d6421a"
  },
  {
    "url": "dist/tables/chantler/72.json",
    "revision": "ccaedc113c3e90b892e03ffbd15ac864"
  },
  {
    "url": "dist/tables/chantler/73.json",
    "revision": "e044cf2c137124a33cb952750b4e480a"
  },
  {
    "url": "dist/tables/chantler/74.json",
    "revision": "38d44d608cdb6a0fe6a8e2426644d52f"
  },
  {
    "url": "dist/tables/chantler/75.json",
    "revision": "e602cc4d9bbe16ecff691318f07d1128"
  },
  {
    "url": "dist/tables/chantler/76.json",
    "revision": "605208e2ee9862a28423e472f38efce5"
  },
  {
    "url": "dist/tables/chantler/77.json",
    "revision": "37b4c4f767c391ecee4dba442db95649"
  },
  {
    "url": "dist/tables/chantler/78.json",
    "revision": "3be9f3c89e558c27ec22192b709a390c"
  },
  {
    "url": "dist/tables/chantler/79.json",
    "revision": "099ef3d0685e835311263c3d09d275cd"
  },
  {
    "url": "dist/tables/chantler/80.json",
    "revision": "178453da90bfc0997df3b94538cf788d"
  },
  {
    "url": "dist/tables/chantler/81.json",
    "revision": "e5bf0ebab3d498245a317e8ebb42f975"
  },
  {
    "url": "dist/tables/chantler/82.json",
    "revision": "2b084caa330e3018e3854589511b61bb"
  },
  {
    "url": "dist/tables/chantler/83.json",
    "revision": "064641d55190d9dd395b8a1b51783662"
  },
  {
    "url": "dist/tables/chantler/84.json",
    "revision": "dbaff509a81f7ecc79039df2279384a9"
  },
  {
    "url": "dist/tables/chantler/85.json",
    "revision": "c87dd5b63614b8ff8f7274e6bb027a39"
  },
  {
    "url": "dist/tables/chantler/86.json",
    "revision": "826129a7297b0253facfb3b103fd3bf2"
  },
  {
    "url": "dist/tables/chantler/87.json",
    "revision": "97c5945937cc7e9caa05a01eb989891d"
  },
  {
    "url": "dist/tables/chantler/88.json",
    "revision": "08d5942e0e4cd9f6fa5655ef4d2f6449"
  },
  {
    "url": "dist/tables/chantler/89.json",
    "revision": "bf614c899728c926ea121836da68113d"
  },
  {
    "url": "dist/tables/chantler/90.json",
    "revision": "2f63992ce0b6b3faecdf92cc33d132ce"
  },
  {
    "url": "dist/tables/chantler/91.json",
    "revision": "52b2dddab36730713fe33d4088bf6570"
  },
  {
    "url": "dist/tables/chantler/92.json",
    "revision": "7c8b75cadf46784d155bc786abfb3bc9"
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
