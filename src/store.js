import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import GetData from './Redux/reducer/getData';

const store = createStore(
  combineReducers({
    GetData
  }), 
  applyMiddleware(thunk)
);

export default store;