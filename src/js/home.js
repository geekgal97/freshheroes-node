/* eslint-env browser */
/* global __results__ */
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');
const throttle = require('throttle-debounce/throttle');
const superagent = require('superagent');
const serialize = require('form-serialize');
const render = require('../../lib/render');

(function () {
  // Close/open filter on window size 💩
  window.addEventListener('resize', throttle(200, checkFilter));

  const initialData = __results__;
  const form = document.querySelector('form');

  let tree = render(initialData);
  let rootNode = createElement(tree);
  document.querySelector('[data-root]').replaceChild(rootNode, document.querySelector('[data-root] > div'));

  document.querySelector('button[type=submit]').remove();

  form.addEventListener('change', throttle(200, fetchData));
  form.addEventListener('input', throttle(200, fetchData));
  form.addEventListener('submit', e => e.preventDefault());

  function update(data) {
    const newTree = render(data);
    const patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
  }

  function fetchData() {
    const queryString = serialize(form);
    window.history.pushState({}, '', `/?${queryString}`);
    document.querySelector('[data-root]').style.opacity = '0.5';
    superagent
      .get('/')
      .set('content-type', 'application/json')
      .query(queryString)
      .end((err, res) => {
        if (err) {
          console.error(err);
        }

        document.querySelector('[data-root]').style.opacity = '1';

        update(res.body);
      });
  }

  function checkFilter() {
    if (window.innerWidth < 880) {
      return document.querySelector('details').removeAttribute('open');
    }

    return document.querySelector('details').setAttribute('open', '');
  }
})();
