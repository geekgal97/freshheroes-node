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
      h('p', `${vacancy.companyName} — ${vacancy.address.city}`),
      h('svg', {
        width: '41',
        height: '16',
        attributes: {
          viewBox: '633 99 41 16'
        }
      }, [
        h('path', {
          attributes: {
            d: 'M634 107h36m-4-6l6 6-6 6',
            fill: 'none',
            strokeLinecap: 'square',
            stroke: '#09B7F2',
            strokeWidth: '2'
          }
        })
      ])
    ])
  ]);
}
