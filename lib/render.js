const h = require('virtual-dom/h');

module.exports = render;

function render(vacancies) {
  return h('ul', vacancies.map(renderVacancy));
}

function renderVacancy(vacancy) {
  return h('li', [
    h('a', [
      h('h3', vacancy.name),
      h('p', vacancy.description),
      h('p', `${vacancy.companyName} — ${vacancy.address.city}`)
    ])
  ]);
}
