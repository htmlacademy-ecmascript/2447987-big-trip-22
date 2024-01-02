import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import AbstractView from '../framework/view/abstract-view.js';
import { calculateDurationOfStay, transformToDateFromFormat, transformToTimeToFormat } from '../mock/utils/point.js';

dayjs.extend(duration);

function createPointTemplate(point, destinations, offers) {
  const {
    destination,
    base_price: price,
    date_from: dateFrom,
    date_to: dateTo,
    isFavorite,
    type,
    offers: offersList,
  } = point;

  const pointDestination = destinations.find((dest) => dest.id === destination);
  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => offersList.includes(typeOffer.id));
  const durationOfStay = calculateDurationOfStay(dateTo, dateFrom);
  const durationOfStayFormat = `${durationOfStay.days() > 0 ? `${durationOfStay.days()}D` : ''} ${durationOfStay.hours()}H ${durationOfStay.minutes()}M`;
  const renderPointsOffers = () => pointOffers.map(({price: destinationPrice, title}) => `
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${destinationPrice}</span>
      </li>
    `).join('');

  return (
    `<div class="event">
      <time class="event__date" datetime=${transformToDateFromFormat(dateFrom)}>${transformToDateFromFormat(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Drive ${pointDestination?.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dateFrom}>${transformToTimeToFormat(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime=${dateTo}>${transformToTimeToFormat(dateTo)}</time>
        </p>
        <p class="event__duration">${durationOfStayFormat}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${renderPointsOffers()}
      </ul>
      <button class="event__favorite-btn  ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({point, boardDestinations, boardOffers, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#destinations = boardDestinations;
    this.#offers = boardOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
