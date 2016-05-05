import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import split from '../ducks/split';
import recover from '../ducks/recover';

const rootReducer = combineReducers({
  routing,
  split,
  recover,
  form
});

export default rootReducer;
