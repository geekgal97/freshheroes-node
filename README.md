<h1 align="center">
  <img width="100" src="media/logo-frisse-helden.png" alt="Fresh Heroes Node">
  <br>
  <br>
  Frisse Helden
</h1>


> Proof of Concept

## Overview
Frisse Helden is a proof of concept implementation of the [Fresh Heroes site](http://freshheroes.com) on a NodeJS stack.

### Tech stack
* NodeJS
* Webserver: Express
* Template engine: [`ejs`](http://npmjs.org/packages/ejs) & [`virtual-dom`](http://npmjs.org/packages/virtual-dom)
* Build tool: [Gulp](http://gulpjs.com/)
* Database: [MongoDB](https://www.mongodb.com/community)
* Vanilla JavaScript
* Pure CSS

### Notable Changes / Features
* [x] Content & Mobile first
* [x] Service worker
  * [x] Offline support
  * [x] Fetch caching
* [x] HTTP/2 w/ Server Push
* [x] GZIP compression
* [x] `manifest.json`
* [x] Error pages (404, 500, no-internet)
* [x] HTML
  * [x] Removed duplicate `<meta name="viewport">`
  * [x] Reduced number of DOM nodes (~150 nodes) nodes)
* [x] CSS
  * [x] Font-size based on browser settings
  * [x] Body text in `system-ui` font
  * [x] Reduced number of unused CSS rules (99.6% decrease)
  * [x] Clean CSS selectors
  * [x] Avoidance of old browser prefixes
  * [x] Minimal usage of media queries
  * [x] Form elements wrapped in labels instead of using of id's where possible
* [x] JS
  * [x] Minimal (large) library usage
  * [x] Throttle `scroll`, `change` and `input` events
  * [x] No jQuery :tada:
  * [x] Vacancy results rendered client-side and fetched async

* [x] Images
  * [x] PNG to SVG when applicable
  * [x] Inline SVG's
  * [x] Compression
* [x] Fonts
  * [x] FOIT prevented with font loading through Font Loading API
  * [x] Remove fonts from JS assets directory
* [x] Database
  * [x] MongoDB management with Mongoose
  * [x] `bcrypt` password encryption on new user save

### Statistics
Reports generated through Lighthouse and Chrome DevTools Audit

**freshheroes.com**
* App can not load on offline/flaky connections
  * Doesn't registers a Service Worker
  * Doesn't respond with a 200 when offline
* Page load performance is decent
  * (62) First meaningful paint: 3424.6ms (target: 1,600ms)
  * (72) Time To Interactive (alpha): 3485.8ms (target: 5,000ms)
* User can not be prompted to Add to Homescreen
* Installed web app will not launch with custom splash screen
* Using deprecated prefixes
* Accessibility
  * Background and foreground colors do not have a sufficient contrast ratio (58 elements)
  * Not every form element has a label (4 elements)
* 80-90% of the CSS is not used on every page (~1400 CSS rules)
* Avoids an excessive DOM size: 453 nodes (target: 1,500 nodes)

**Now**
* [x] Service workers used
* [x] Fast page load performance
  * (100) First meaningful paint: 384.9ms (target: 1,600ms)
  * (100) Perceptual Speed Index: 677 (target: 1,250)
    * First Visual Change: 461ms
    * Last Visual Change: 1304ms
  * (100) Estimated Input Latency: 16ms (target: 50ms)
  * (100) Time To Interactive (alpha): 845.3ms (target: 5,000ms)
* [x] Network connection is secure
  * [x] Uses HTTPS
  * [x] Redirects HTTP traffic to HTTPS
* [x] Installed web app will launch with custom splash screen
  * [x] Manifest exists
  * [x] Contains name
  * [x] Contains background_color
  * [x] Contains theme_color
  * [x] Manifest contains icons at least 192px
  * [x] Has a <meta name="theme-color"> tag
* [x] Site is progressively enhanced
  * [x] Contains some content when JavaScript is not available
* [x] Design is mobile-friendly
  * [x] Has a <meta name="viewport"> tag with width or initial-scale
  * [x] Content is sized correctly for the viewport
* [x] Using modern offline features
  * [x] Avoids Application Cache
  * [x] Avoids WebSQL DB
* [x] Using modern protocols
  * [x] Uses HTTPS
* From 1340 rules (82%) of CSS not used to 5 rules (10%)
* ~150 nodes (maximum allowed per page: 1500 nodes)

## Getting started
```bash
$ git clone https://github.com/rijkvanzanten/freshheroes-node.git
```

```bash
$ npm install
```

Install MongoDB
```bash
$ brew install mongodb
```

Make a directory for the database
```bash
$ mkdir -p /data/db
```

Set read and write permissions for directory
```bash
$ sudo chown -R `id -u` /data/db
```

## Development
To build the static assets (client side):
```bash
$ npm run build
```

To watch for file changes and auto-refresh the browser:
```bash
$ npm run dev
```

To start the app in production mode:
```bash
$ npm start
```

## Editing the code
Please check out the [contributing guidelines](CONTRIBUTING.md) before you start working on features or bugs

## Team

![Rijk van Zanten](https://avatars0.githubusercontent.com/u/9141017?v=3&s=460) | ![Lars Schuitema](https://avatars1.githubusercontent.com/u/8817968?v=3&s=460) | ![Danny de Vries](https://avatars1.githubusercontent.com/u/22084444?v=3&s=460) | ![Mirza van Meerwijk](https://avatars2.githubusercontent.com/u/12242967?v=3&s=460) | ![Merlijn Vos](https://avatars1.githubusercontent.com/u/9060226?v=3&s=460) | ![Berend Pronk](https://avatars3.githubusercontent.com/u/12401943?v=3&s=460)
---|---|---|---|---|---
[Rijk van Zanten](https://github.com/rijkvanzanten) | [Lars Schuitema](https://github.com/larsdouweschuitema) | [Danny de Vries](https://github.com/dandevri) | [Mirza van Meerwijk](https://github.com/Mimaaa) | [Merlijn Vos](https://github.com/Murderlon) | [Berend Pronk](https://github.com/berendpronk)

## License

MIT © [Rijk van Zanten](http://rijks.website)
