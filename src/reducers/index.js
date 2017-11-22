import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import split from '../ducks/split';
import recover from '../ducks/recover';
import files from '../ducks/files';

const rootReducer = combineReducers({
  routing,
  split,
  recover,
  form,
  files
});

export default rootReducer;
