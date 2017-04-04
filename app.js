const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

express()
  .use(compression())
  .use(express.static(path.join(__dirname, 'public'), {
    index: false,
    maxage: 604800000
  }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .get('/', home)
  .listen(port);

function home(req, res) {
  res.render('index');
}
