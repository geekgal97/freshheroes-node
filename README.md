# freshheroes-node
> Node Port of freshheroes.com

## Installation
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
