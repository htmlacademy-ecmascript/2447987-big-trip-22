import BoardPresenter from './presenter/board-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './const.js';
import PointsApiService from './points-api-service.js';
import PointsModel from './model/points-model.js';

const boardContainerElement = document.querySelector('.trip-events');
const buttonContainerElement = document.querySelector('.trip-main');
const filterModel = new FilterModel();
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const boardPresenter = new BoardPresenter({
  boardContainer: boardContainerElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: newPointFormCloseHandler,
  onLoaded: boardLoadedHandler,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: newPointButtonClickHandler
});

boardPresenter.init();
pointsModel.init();
render(newPointButtonComponent, buttonContainerElement);

function newPointFormCloseHandler () {
  toggleDisableNewPointButton(false);
}

function newPointButtonClickHandler () {
  boardPresenter.createPoint();
  toggleDisableNewPointButton(true);
}

function boardLoadedHandler(isSuccess) {
  toggleDisableNewPointButton(!isSuccess);
}

function toggleDisableNewPointButton (state) {
  newPointButtonComponent.element.disabled = state;
}
