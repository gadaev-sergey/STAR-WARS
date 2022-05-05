import {cssPromises, appContainer} from './data.js';

export function createElem(el, options, parent) {
  const elem = document.createElement(el)
  for (const key in options) {
    if (key === 'classList') {
      for (const e of options[key]) elem.classList.add(e)
      continue
    }
    if (key === 'dataset') elem.dataset[options[key].dataName] = options[key].dataValue
    if (key === 'style') elem.style[options[key].dataName] = options[key].dataValue
    elem[key] = options[key]
  }
  if (parent) parent.append(elem)
  return elem
}


export function render() {
  appContainer.innerHTML = ''
  appContainer.append(preloader());
  const searchParams = new URLSearchParams(location.search),
        filmNumber = searchParams.get('filmNumber');

  if (filmNumber) {
    renderPage(
      './film-item.js',
      `https://swapi.dev/api/films/${filmNumber}`,
      '../css/film-item.css'
    );
  } else {
    renderPage(
      './film-list.js',
      'https://swapi.dev/api/films/',
      '../css/film-list.css'
    );
  }

  function renderPage(moduleName, apiUrl, css) {
    Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
      .then(([pageModule, data]) => {
        if (data.planets) {
          const promisePlanets = data.planets.map(src => loadResource(src)),
                promiseSpecies = data.species.map(src => loadResource(src));

          const prom1 = Promise.all(promisePlanets).then()
          const prom2 = Promise.all(promiseSpecies).then()
          Promise.all([prom1, prom2]).then(lists => {
            appContainer.innerHTML = '';
            appContainer.append(pageModule.renderSection(data, lists));
          })
        } else {
          appContainer.innerHTML = '';
            appContainer.append(pageModule.renderSection(data));
        }

    });
  }

  function loadResource(src) {
    if (src.endsWith('.js')) {
      return import(src);
    }
    if (src.endsWith('.css')) {
      if (!cssPromises[src]) {
        const link = createElem('link', {
          rel: 'stylesheet',
          href: src
        }, document.head);
        cssPromises[src] = new Promise(resolve => {
          link.addEventListener('load', () => resolve());
        })
      }
      return cssPromises[src];
    }
    return fetch(src).then(res => res.json())
  }

  function preloader() {
    const container = createElem('div', {
            classList: ['preloader-container']
          }),
          wraper = createElem('div', {
            classList: ['preloader-wraper']
          }, container),
          icon = createElem('div', {
            classList: ['preloader-icon'],
            textContent: '/'
          }, wraper),
          text = createElem('div', {
            classList: ['preloader-text'],
            textContent: 'Loading...'
          }, wraper);

    return container;
  }
}


