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
  .use(compression({
    threshold: 0,
    filter: () => true
  }))
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
  .get('/inschrijven', getSignup)
  .get('/dashboard/stages', authenticate, getCompanyDashboard)
  .get('/studenten', getPageStudents)
  .get('/offline', getOfflinePage)
  .get('/bedrijven', getPageCompanies)
  .get('/over', getPageOver)
  .get('/voorwaarden', getPageTerms)
  .get('/:company/:vacancy', getVacancy)
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

  query.populate('company');

  if (type) {
    query.where('companyType').in(type);
  }

  if (size) {
    const orArray = [];
    size.forEach(size => {
      switch (size) {
        case 'small':
          orArray.push({companyEmployees: {$lte: 20}});
          break;
        case 'medium':
          orArray.push({companyEmployees: {$gte: 20, $lte: 100}});
          break;
        case 'large':
          orArray.push({companyEmployees: {$gte: 100}});
          break;
        default:
      }
    });
    query.or(orArray);
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
      return res.status(500).end();
    }

    const filterOptions = Object.assign({
      type: [], size: null, location: null, q: null, categories: []
    }, req.query);

    if (req.headers['content-type'] && req.headers['content-type'] === 'application/json') {
      return res.json(results);
    }
    return res.render('index', {html: toString(render(results)), filterOptions, results});
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

function getSignup(req, res) {
  res.render('signup');
}

function getPageStudents(req, res) {
  res.render('students', {
    title: 'Studenten'
  });
}

function getOfflinePage(req, res) {
  res.render('offline', {
    title: 'Offline'
  });
}

function getPageCompanies(req, res) {
  res.render('companies', {
    title: 'Bedrijven'
  });
}

function getPageOver(req, res) {
  res.render('about');
}

function getPageTerms(req, res) {
  res.render('terms');
}

function getVacancy(req, res) {
  mongoose.model('vacancy').findOne({slug: req.params.vacancy}, (err, vacancy) => {
    if (err) {
      console.log(err);
    }

    if (vacancy) {
      return res.render('vacancy', {vacancy});
    }

    return res.render('error');
  });
}
