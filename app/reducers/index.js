import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import split from '../ducks/split';

const rootReducer = combineReducers({
  routing,
  split
});

export default rootReducer;
