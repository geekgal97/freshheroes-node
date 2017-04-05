/**
 * Initializes demo users in DB
 */

const db = require('mongoose').connect('mongodb://localhost/freshheroes');
const User = require('./models/user');
const Vacancy = require('./models/vacancy');
const Company = require('./models/company');

Promise.all([
  User.remove({}),
  Vacancy.remove({}),
  Company.remove({})
])
.then(() => db.connection.close());
