<h1 align="center">
  <img width="100" src="media/logo-frisse-helden.png" alt="Fresh Heroes Node">
  <br>
  <br>
  Frisse Helden
</h1>
> Proof of Concept

## Overview
Frisse Helden is a proof of concept implementation of the [Fresh Heroes site](http://freshheroes.com) on a NodeJS stack.


Polls is a simple web-based tool which lets you create a poll to a share-able link. It allows other users to view and vote on the poll and see the results in real-time.

The app was built using some of the latest (and greatest) in web technology while also keeping the best practices of progressive enhancement in mind.

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

## Change log

**Day two (12 hours)**
* [x] Load stylesheets individually per page

**Day three**
* [x] Remove SVG icons from fonts directory

## Team

![Rijk van Zanten](https://avatars0.githubusercontent.com/u/9141017?v=3&s=460) | ![Lars Schuitema](https://avatars1.githubusercontent.com/u/8817968?v=3&s=460) | ![Danny de Vries](https://avatars1.githubusercontent.com/u/22084444?v=3&s=460) | ![Mirza van Meerwijk](https://avatars2.githubusercontent.com/u/12242967?v=3&s=460) | ![Merlijn Vos](https://avatars1.githubusercontent.com/u/9060226?v=3&s=460) | ![Berend Pronk](https://avatars3.githubusercontent.com/u/12401943?v=3&s=460)
---|---|---|---
[Rijk van Zanten](https://github.com/rijkvanzanten) | [Lars Schuitema](https://github.com/larsdouweschuitema) | [Danny de Vries](https://github.com/dandevri) | [Mirza van Meerwijk](https://github.com/Mimaaa) | [Merlijn Vos](https://github.com/Murderlon) | [Berend Pronk](https://github.com/berendpronk)

## License

MIT © [Rijk van Zanten](http://rijks.website)
