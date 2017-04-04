const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/fresheroes', onerror);

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
  .listen(port, onListening);

function home(req, res) {
  res.render('index');
}

function onerror(err) {
  if (err) {
    throw err;
  }
}

function onListening() {
  console.log(`Server listening at port ${port}`);
}
