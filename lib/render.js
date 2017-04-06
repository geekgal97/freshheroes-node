const h = require('virtual-dom/h');

module.exports = render;

function render(vacancies) {
  return h('ul', vacancies.length > 0 ? vacancies.map(renderVacancy) : [notFound()]);
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

function notFound() {
  return h('li', {
    className: 'not-found'
  }, [
    h('img', {
      src: '/images/grumpy_cat.png'
    }),
    h('h3', 'We hebben geen vacatures voor je gevonden'),
    h('p', 'Probeer het eens met een andere zoekterm'),
    h('a', {
      href: '/'
    }, 'Bekijk alle vacatures')
  ]);
}
