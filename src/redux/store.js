import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import logger from "redux-logger";
// Import saga middleware
import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import createSagaMiddleware from "redux-saga";

/*
// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];
*/

function* fetchPlant() {
  try {
    const plantResponse = yield axios.get("/api/plants");
    yield put({ type: "SET_PLANT", payload: plantResponse.data });
  } catch (error) {
    console.log("error in fetchPlant", error);
  }
}
function* postPlant(action) {
  try {
    yield axios.post("/api/plants", action.payload);
    yield put({ type: "FETCH_PLANT" });
  } catch (error) {
    console.log("error in post");
  }
}

// This function (our reducer) will be called when an
// action is dipatched.

/*
const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};
*/

const plantReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PLANT":
      return action.payload;
    case "ADD_PLANT":
      console.log("Adding new plant:", action.payload);
      return [...state, action.payload];
    default:
      return state;
  }
};

// everything below here needs some work -- Mike

function* rootSaga() {
  yield takeLatest("FETCH_PLANT", fetchPlant);
  yield takeLatest("ADD_PLANT", postPlant);
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const store = createStore(
  combineReducers({
    plantReducer,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga);
export default store;
