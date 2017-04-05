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

const redbullUser = new User({
  email: 'redbull@lifely.nl',
  password: 'test',
  type: 'company',
  birthday: randomBirthday(),
  firstname: 'Redbull',
  lastname: 'Owner'
});

const raboUser = new User({
  email: 'rabobank@lifely.nl',
  password: 'test',
  type: 'company',
  birthday: randomBirthday(),
  firstname: 'Bryan',
  lastname: 'te Beek'
});

const dddUser = new User({
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
  description: faker.lorem.paragraph(5),
  type: 'startup',
  amountOfEmployees: 10,
  status: 'active',
  website: 'lifely.nl',
  social: {
    facebook: 'facebook.com/lifelynl',
    twitter: 'twitter.com/lifelynl',
    linkedin: 'linkedin.com/lifely'
  },
  user: pim._id
});

const rabobank = new Company({
  name: 'Rabobank',
  intro: 'De Rabobank is een bank zonder aandeelhouders. Dat is het idee van de coöperatie. U kunt bij ons terecht voor al uw dagelijkse bankzaken.',
  description: faker.lorem.paragraph(5),
  type: 'online-agency',
  amountOfEmployees: 4528,
  status: 'active',
  website: 'rabobank.nl',
  social: {
    facebook: 'facebook.com/rabobank',
    twitter: 'twitter.com/rabobank',
    linkedin: 'linkedin.com/rabobank'
  },
  user: raboUser._id
});

const redbull = new Company({
  name: 'RedBull',
  intro: 'Speciaal ontwikkeld voor momenten waarop je meer wilt presteren.',
  description: faker.lorem.paragraph(5),
  type: 'brand',
  amountOfEmployees: 78,
  status: 'active',
  website: 'redbull.nl',
  social: {
    facebook: 'facebook.com/redbull',
    twitter: 'twitter.com/redbull',
    linkedin: 'linkedin.com/redbull'
  },
  user: redbullUser._id
});

const ddd = new Company({
  name: 'Dutch Digital Design',
  intro: 'Initiative to unite, celebrate and create awareness on digital design.',
  description: faker.lorem.paragraph(5),
  type: 'brand',
  amountOfEmployees: 21,
  status: 'incomplete',
  social: {
    facebook: 'facebook.com/redbull',
    twitter: 'twitter.com/redbull',
    linkedin: 'linkedin.com/redbull'
  },
  user: dddUser._id
});

// Vacancies
// -----------------------------------------------------------------------------
const vacancy1 = new Vacancy({
  company: lifely._id,
  category: 'development',
  address: {
    street: 'Zekeringstraat 23B',
    zipcode: '1014 BM',
    city: 'Amsterdam'
  },
  deadline: getDate(5),
  name: 'Developer (with Report)',
  description: faker.lorem.paragraph(5)
});

const vacancy2 = new Vacancy({
  company: lifely._id,
  category: 'development',
  address: {
    street: 'Zekeringstraat 23B',
    zipcode: '1014 BM',
    city: 'Amsterdam'
  },
  deadline: getDate(-3),
  name: 'Developer (expired)',
  description: faker.lorem.paragraph(5)
});

const vacancy3 = new Vacancy({
  company: lifely._id,
  category: 'development',
  address: {
    street: 'Zekeringstraat 23B',
    zipcode: '1014 BM',
    city: 'Amsterdam'
  },
  deadline: getDate(-3),
  name: 'Developer (with Report and Expired)',
  description: faker.lorem.paragraph(5)
});

const vacancy4 = new Vacancy({
  company: lifely._id,
  category: 'development',
  address: {
    street: 'Zekeringstraat 23B',
    zipcode: '1014 BM',
    city: 'Amsterdam'
  },
  deadline: getDate(-3),
  name: 'Developer (with Report and Expired)',
  description: faker.lorem.paragraph(5)
});

const vacancy5 = new Vacancy({
  company: rabobank._id,
  category: 'design',
  address: {
    street: 'Admiraal de Ruijterweg 21',
    zipcode: '1014 BM',
    city: 'Amsterdam'
  },
  deadline: getDate(-3),
  name: 'Developer (with Report and Expired)',
  description: faker.lorem.paragraph(5)
});

Promise.all([
  lifely.save(),
  bryan.save(),
  redbullUser.save(),
  raboUser.save(),
  dddUser.save(),

  redbull.save(),
  rabobank.save(),
  ddd.save(),

  vacancy1.save(),
  vacancy2.save(),
  vacancy3.save(),
  vacancy4.save(),
  vacancy5.save()
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

function getDate(days) {
  const today = new Date();
  return today.setDate(today.getDate() + days);
}
