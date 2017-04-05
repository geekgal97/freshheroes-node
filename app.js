const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const randomstring = require('randomstring');
const toString = require('vdom-to-html');
const render = require('./lib/render');

// Register all models
const models = path.join(__dirname, '/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/freshheroes', onerror);

express()
  .use(compression())
  .use(express.static(path.join(__dirname, 'public'), {
    index: false,
    maxage: 604800000
  }))
  .use(session({
    secret: randomstring.generate(),
    resave: false,
    saveUninitialized: true
  }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .get('/', home)
  .get('/inloggen', getLogin)
  .post('/inloggen', postLogin)
  .get('/dashboard/stages', authenticate, getCompanyDashboard)
  .listen(port, onListening);

function onerror(err) {
  if (err) {
    throw err;
  }
}

function onListening() {
  console.log(`Server listening at port ${port}`);
}

function authenticate(req, res, next) {
  if (req.session.user) {
    next();
  }

  res.redirect('/login');
}

function getCompanyDashboard(req, res) {
  res.render('dashboard-company');
}

function home(req, res) {
  const query = mongoose.model('vacancy').find();

  const {type, size, location, q, categories} = req.query;

  if (type) {
    query.where('companyType').in(type);
  }

  if (size) {
    switch (size) {
      case 'small':
        query.where('companyEmployees').lte(20);
        break;
      case 'medium':
        query.where('companyEmployees').gte(20).lte(100);
        break;
      case 'large':
        query.where('companyEmployees').gte(100);
        break;
      default:
    }
  }

  if (location) {
    query.where('address.city').equals(location);
  }

  if (q) {
    const regex = new RegExp(escapeRegex(q), 'gi');
    query.or([{name: regex}, {description: regex}]);
  }

  if (categories) {
    query.where('category').in(categories);
  }

  query.exec(onexec);

  function onexec(err, results) {
    if (err) {
      console.error(err);
      res.status(500).end();
    }

    res.render('index', {html: toString(render(results))});
  }

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}

function getLogin(req, res) {
  res.render('login');
}

function postLogin(req, res) {
  if (!req.body.username && !req.body.password) {
    return res.redirect('/inloggen');
  }

  mongoose.model('user')
    .findOne({username: req.body.username})
    .select('+password -_id')
    .exec(onexec);

  function onexec(err, user) {
    if (err) {
      console.log(err);
      return res.status(500).end();
    }

    if (!user) {
      return res.redirect('/inloggen');
    }

    user.comparePassword(req.body.password, oncompare);

    function oncompare(err, isMatch) {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }

      if (isMatch) {
        user.password = null;
        req.session.user = user;
        return res.redirect('/dashboard/stages');
      }

      return res.redirect('/login');
    }
  }
}
