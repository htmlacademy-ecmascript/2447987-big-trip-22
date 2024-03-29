import FormView from '../view/form-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { ModeType } from '../const.js';
import {UserAction, UpdateType} from '../const.js';
import { isDatesEqual } from '../utils/utils.js';

export default class PointPresenter {
  #boardContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #boardOffers = null;
  #boardDestinations = null;
  #point = null;
  #modeChangeHandler = null;
  #modeType = ModeType.VIEWING;
  #dataChangeHandler = null;

  constructor(boardContainer, onDataChange, point, boardDestinations, boardOffers, onModeChange) {
    this.#boardContainer = boardContainer;
    this.#point = point;
    this.#boardDestinations = boardDestinations;
    this.#boardOffers = boardOffers;
    this.#modeChangeHandler = onModeChange;
    this.#dataChangeHandler = onDataChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      boardDestinations: this.#boardDestinations,
      boardOffers: this.#boardOffers,
      onEditClick: this.#editClickHandler,
      onFavoriteClick: this.#toggleFavoriteStateHandler,
      mode: this.#modeType,
    });

    this.#pointEditComponent = new FormView({
      point: {...this.#point},
      boardDestinations: this.#boardDestinations,
      boardOffers: this.#boardOffers,
      onFormSubmit: this.#formSubmitHandler,
      onCloseForm: this.#buttonCloseHandler,
      onDeleteClick: this.#deleteClickHandler,
      mode: this.#modeType,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#boardContainer);
      return;
    }

    if (this.#modeType === ModeType.VIEWING) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#modeType === ModeType.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#modeType = ModeType.VIEWING;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#modeType !== ModeType.VIEWING) {
      this.#pointEditComponent.reset();
      this.#replaceFormToPoint();
    }
  }

  setSaving() {
    if (this.#modeType === ModeType.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#modeType === ModeType.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#modeType === ModeType.VIEWING) {
      this.#pointComponent?.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent?.shake(resetFormState);
  }

  #buttonCloseHandler = () => {
    this.#pointEditComponent.reset();
    this.#replaceFormToPoint();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset();
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#modeChangeHandler();
    this.#modeType = ModeType.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#modeType = ModeType.VIEWING;
  }

  #editClickHandler = () => {
    this.#replacePointToForm();
  };

  #formSubmitHandler = (update) => {
    const isMinorUpdate = (
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#point.dateTo, update.dateTo) ||
      this.#point.basePrice !== update.basePrice
    );

    this.#dataChangeHandler(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  #deleteClickHandler = (point) => {
    this.#dataChangeHandler(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #toggleFavoriteStateHandler = () => {
    this.#dataChangeHandler(UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };
}
