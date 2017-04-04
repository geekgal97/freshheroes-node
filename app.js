const path = require('path');
const express = require('express');
const compression = require('compression');

const port = process.env.PORT || 3000;

express()
  .use(compression())
  .use(express.static(path.join(__dirname, 'public'), {
    index: false,
    maxage: 604800000
  }))
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .get('/', home)
  .listen(port);

function home(req, res) {
  res.render('index');
}
