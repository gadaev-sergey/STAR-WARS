import {createElem, render} from './helper.js'

export function renderSection(data, [planetsListElem, spciesListElem]) {
  console.log(spciesListElem)
  const section = createElem('div', {
          classList: ['film-item']
        }),
        container = createElem('div', {
          classList: ['container', 'film-item__container']
        }, section),
        linkBack = createElem('a', {
          classList: ['film-item__linkBack', 'reset-text'],
          textContent: 'Back to episodes',
          href: 'index.html'
        }, container),
        titleWraper = createElem('div', {
          classList: ['film-item__title-wraper']
        }, container),
        sectionTitle = createElem('h1', {
          classList: ['film-item__title', 'reset-text'],
          textContent: data.title
        }, titleWraper),
        numberEpisode = createElem('span', {
          classList: ['film-item__number-episode'],
          textContent: data.episode_id
        }, titleWraper),
        sectionDesc = createElem('p', {
          classList: ['film-item__desc', 'reset-text'],
          textContent: data.opening_crawl
        }, container),
        planetsTitle = createElem('h2', {
          classList: ['planets-title', 'title-2', 'reset-text'],
          textContent: 'Planets'
        }, container),
        planetsList = createElem('ul', {
          classList: ['planets-list', 'cards-list', 'reset-list']
        }, container),
        speciesTitle = createElem('h2', {
          classList: ['species-title', 'title-2', 'reset-text'],
          textContent: 'Species'
        }, container),
        speciesList = createElem('ul', {
          classList: ['species-list', 'cards-list', 'reset-list']
        }, container);

  linkBack.addEventListener('click', event => {
    event.preventDefault();
    history.pushState(null, '', event.currentTarget.href);
    render()
  });

  for (const planet of planetsListElem) {
    const planetItem = createElem('li', {
            classList: ['planets-item', 'cards-item']
          }, planetsList),
          planetItemTitle = createElem('h3', {
            classList: ['planets-item__title', 'cards-title', 'reset-text'],
            textContent: planet.name
          }, planetItem),
          planetItemDesc = createElem('div', {
            classList: ['planets-item__desc', 'cards-desc'],
            textContent: `diameter - ${planet.diameter}`
          }, planetItem)
  };

  for (const spcies of spciesListElem) {
    const spciesItem = createElem('li', {
            classList: ['spcies-item', 'cards-item']
          }, speciesList),
          spciesItemTitle = createElem('h3', {
            classList: ['spcies-item__title', 'cards-title', 'reset-text'],
            textContent: spcies.name
          }, spciesItem),
          spciesItemDesc = createElem('div', {
            classList: ['spcies-item__desc', 'cards-desc'],
            textContent: `average lifespan - ${spcies.average_lifespan}`
          }, spciesItem)
  };

  return section;
}
