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
  const initialData = __results__;

  let tree = render(initialData);
  let rootNode = createElement(tree);
  document.querySelector('[data-root]').replaceChild(rootNode, document.querySelector('[data-root] > ul'));

  document.querySelector('button[type=submit]').remove();

  document.querySelector('form').addEventListener('change', throttle(200, fetchData));
  document.querySelector('form').addEventListener('input', throttle(200, fetchData));

  function update(data) {
    const newTree = render(data);
    const patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
  }

  function fetchData() {
    console.log(serialize(document.querySelector('form')));
    superagent
      .get('/')
      .set('content-type', 'application/json')
      .query(serialize(document.querySelector('form')))
      .end((err, res) => {
        if (err) {
          console.error(err);
        }

        update(res.body);
      });
  }
})();
