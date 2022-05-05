import {createElem, render} from './helper.js'

export function renderSection(data) {
  let cardNumberValue = 0
  const section = createElem('div', {
          classList: ['film-list']
        }),
        container = createElem('div', {
          classList: ['container', 'film-list__container']
        }, section),
        sectionTitle = createElem('h1', {
          classList: ['film-list__title', 'reset-text'],
          textContent: 'Film list STAR WARS'
        }, container),
        listFilm = createElem('ul', {
          classList: ['film-list__list', 'reset-list']
        }, container);

  for (const film of data.results) {
    ++cardNumberValue
    const itemFilm = createElem('li', {
            classList: ['film-list__item']
          }, listFilm),
          card = createElem('a', {
            classList: ['film-card'],
            href: `?filmNumber=${cardNumberValue}`
          }, itemFilm),
          cardNumber = createElem('div', {
            classList: ['film-card__desc', 'reset-text']
          }, card),
          cardTitle = createElem('h2', {
            classList: ['film-card__title', 'reset-text'],
            textContent: film.title
          }, card);

    switch (cardNumberValue) {
      case 1:
        cardNumber.textContent = 'I';
        break;
      case 2:
        cardNumber.textContent = 'II';
        break;
      case 3:
        cardNumber.textContent = 'III';
        break;
      case 4:
        cardNumber.textContent = 'IV';
        break;
      case 5:
        cardNumber.textContent = 'V';
        break;
      case 6:
        cardNumber.textContent = 'VI';
        break;
      default:
        cardNumber.textContent = 'Такого еще нет';
    };

    card.addEventListener('click', event => {
      event.preventDefault();
      history.pushState(null, '', event.currentTarget.href);
      render()
    })
  }

  return section;
}
