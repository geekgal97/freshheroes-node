/**
 * Initializes demo users in DB
 */

const db = require('mongoose').connect('mongodb://localhost/freshheroes');
const User = require('./models/user');

const demoUsers = [
  {
    email: 'pim@lifely.nl',
    password: 'test',
    type: 'company',
    birthday: randomBirthday(),
    firstname: 'Pim',
    lastname: 'Verlaan',
    admin: true
  },
  {
    email: 'bryan@lifely.nl',
    password: 'test',
    type: 'student',
    birthday: randomBirthday(),
    firstname: 'Bryan',
    lastname: 'te Beek'
  },
  {
    email: 'redbull@lifely.nl',
    password: 'test',
    type: 'company',
    birthday: randomBirthday(),
    firstname: 'Redbull',
    lastname: 'Owner'
  },
  {
    email: 'rabobank@lifely.nl',
    password: 'test',
    type: 'company',
    birthday: randomBirthday(),
    firstname: 'Bryan',
    lastname: 'te Beek'
  },
  {
    email: 'ddd@lifely.nl',
    password: 'test',
    type: 'company',
    birthday: randomBirthday(),
    firstname: 'Bryan',
    lastname: 'te Beek'
  }
];

demoUsers.forEach((user, i) => {
  new User(user).save();

  if (i === demoUsers.length - 1) {
    db.connection.close();
  }
});

function randomBirthday() {
  const today = new Date();
  return new Date(today.setFullYear(today.getFullYear() - (18 + Math.floor(Math.random() * 30))));
}
