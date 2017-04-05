/**
 * Initializes demo users in DB
 */

const faker = require('faker');
const db = require('mongoose').connect('mongodb://localhost/freshheroes');
const User = require('./models/user');
const Vacancy = require('./models/vacancy');
const Company = require('./models/company');

// Users
// -----------------------------------------------------------------------------
const pim = new User({
  email: 'pim@lifely.nl',
  password: 'test',
  type: 'company',
  birthday: randomBirthday(),
  firstname: 'Pim',
  lastname: 'Verlaan',
  admin: true
});

const bryan = new User({
  email: 'bryan@lifely.nl',
  password: 'test',
  type: 'student',
  birthday: randomBirthday(),
  firstname: 'Bryan',
  lastname: 'te Beek'
});

const redbull = new User({
  email: 'redbull@lifely.nl',
  password: 'test',
  type: 'company',
  birthday: randomBirthday(),
  firstname: 'Redbull',
  lastname: 'Owner'
});

const rabobank = new User({
  email: 'rabobank@lifely.nl',
  password: 'test',
  type: 'company',
  birthday: randomBirthday(),
  firstname: 'Bryan',
  lastname: 'te Beek'
});

const ddd = new User({
  email: 'ddd@lifely.nl',
  password: 'test',
  type: 'company',
  birthday: randomBirthday(),
  firstname: 'Bryan',
  lastname: 'te Beek'
});

// Company
// -----------------------------------------------------------------------------
const lifely = new Company({
  name: 'Lifely',
  intro: 'Lifely, architect in online. Een digital agency met een rebelse balans tussen concept, design, content en techniek.',
  description: faker.paragraph(5),
  type: 'startup',
  amountOfEmployees: 10,
  status: 'active',
  website: 'lifely.nl',
  social: {
    facebook: 'facebook.com/lifelynl',
    twitter: 'twitter.com/lifelynl',
    linkedin: 'linkedin.com/lifely'
  },
  userId: pim._id
});

// Vacancies
// -----------------------------------------------------------------------------
const vacancy1 = new Vacancy({
  companyId: lifely._id,
  category: 'development',
  address: {
    street: 'Zekeringstraat 23B',
    zipcode: '1014 BM',
    city: 'Amsterdam'
  },
  deadline: new Date(),
  name: 'Developer (with Report)'
});

const vacancy2 = new Vacancy({
  companyId: lifely._id,
  category: 'development',
  address: {
    street: 'Zekeringstraat 23B',
    zipcode: '1014 BM',
    city: 'Amsterdam'
  },
  deadline: new Date(),
  name: 'Developer (with Report)'
});

Promise.all([
  lifely.save(),
  bryan.save(),
  redbull.save(),
  rabobank.save(),
  ddd.save(),

  vacancy1.save()
])
.then(() => db.connection.close())
.catch(() => {
  console.log('\n\nRecords bestaan al\n\n');
  db.connection.close();
});

function randomBirthday() {
  const today = new Date();
  return new Date(today.setFullYear(today.getFullYear() - (18 + Math.floor(Math.random() * 30))));
}
