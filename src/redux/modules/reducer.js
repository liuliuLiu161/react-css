import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
// import { pagination } from 'violet-paginator';

import auth from './auth';
import diaglogReducer from './diaglog';
import loadingReducer from './loading';
import home from './home'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  diaglog: diaglogReducer,
  loading: loadingReducer,
  home,
});
