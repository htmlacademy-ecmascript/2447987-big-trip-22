import SortView from '../view/sort-view.js';
import { remove, render } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { filterByFuture, filterByPast, filterByPresent, filtersGenerateInfo } from '../utils/filter.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {FilterType, RenderPosition, SortType, TimeLimit, UpdateType, UserAction} from '../const.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/sort.js';
import FilterPresenter from './filter-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import HeaderInfo from '../view/header-info.js';
import TripList from '../view/trip-list.js';
import ErrroPointView from '../view/error-point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #tripList = new TripList();
  #sortComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #noPointComponent = null;
  #newPointPresenter = null;
  #onNewPointDestroy = null;
  #headerInfo = new HeaderInfo();
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #errorMessageComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({boardContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderHeaderInfo();
    this.#renderBoard();
    this.#renderFilters();
    remove(this.#errorMessageComponent);

    this.#newPointPresenter = new NewPointPresenter({
      boardContainer: this.#tripList.element,
      onDataChange: this.#handleViewAction,
      pointsModel: this.#pointsModel,
      onDestroy: this.onNewPointDestroy.bind(this),
    });
  }

  get points() {
    const points = this.#filterPoints(this.#pointsModel.points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...points].sort(sortPointsByTime);
      case SortType.PRICE:
        return [...points].sort(sortPointsByPrice);
      case SortType.DAY:
        return [...points].sort(sortPointsByDay);
      default:
        return [...points].sort(sortPointsByDay);
    }
  }

  onNewPointDestroy() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
    }
    this.#onNewPointDestroy();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
  }

  #filterPoints(points) {
    const filterType = this.#filterModel.filter;
    const filteredPoints = filtersGenerateInfo[filterType](points);

    switch (filterType) {
      case FilterType.FUTURE:
        return filterByFuture(filteredPoints);
      case FilterType.PRESENT:
        return filterByPresent(filteredPoints);
      case FilterType.PAST:
        return filterByPast(filteredPoints);
      case FilterType.EVERYTHING:
        return filteredPoints;
      default:
        return filteredPoints;
    }
  }

  #renderBoard() {
    const boardDestinations = this.#pointsModel.destinations;
    const boardOffers = this.#pointsModel.offers;
    const points = this.points;
    render(this.#tripList, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (filtersGenerateInfo[this.#filterModel.filter](points).length === 0) {
      this.#renderNoPoints();
      return;
    }

    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i], boardDestinations, boardOffers);
    }
    this.#renderSort();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderFilters() {
    const siteHeaderElement = document.querySelector('.trip-controls__filters');
    const filterPresenter = new FilterPresenter({
      filterContainer: siteHeaderElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });

    filterPresenter.init();
  }

  #renderHeaderInfo() {
    render(this.#headerInfo, document.querySelector('.trip-main__trip-controls'), RenderPosition.BEFOREBEGIN);
  }

  #renderPoint(point, boardDestinations, boardOffers) {
    const pointPresenter = new PointPresenter(
      this.#tripList.element,
      this.#handleViewAction,
      point,
      boardDestinations,
      boardOffers,
      this.#handleModeChange,
    );
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView(this.#filterModel.filter);
    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderErrorMessage() {
    this.#errorMessageComponent = new ErrroPointView();
    render(this.#errorMessageComponent, this.#boardContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#newPointPresenter.destroy();
    this.#pointPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#currentSortType = SortType.DAY;
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard();
        this.#renderErrorMessage();
        break;
    }
  };
}
