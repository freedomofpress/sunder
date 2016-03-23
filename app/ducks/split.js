/**
 * Actions for splitting a secret.
 */

import { splitFFI } from '../lib/crypto';

const SPLIT = 'SPLIT';
const SPLIT_SUCCESS = 'SPLIT_SUCCESS';
const SPLIT_FAILURE = 'SPLIT_FAILURE';


export default function reducer(state = {}, action) {
  switch (action.type) {
    case SPLIT:
      return Object.assign(
        {}, state, { inProgress: true, error: null, shares: null });
    case SPLIT_SUCCESS:
      return Object.assign(
        {}, state, { inProgress: false, shares: action.shares, error: null });
    case SPLIT_FAILURE:
      return Object.assign(
        {}, state, { inProgress: false, error: action.error });
    default:
      return state;
  }
}

export function split(secret, options) {
  return (dispatch) => {
    if (!secret) {
      throw new Error('No secret passed to split.');
    } else if (!options.shares || !options.quorum) {
      throw new Error(
        `Expected shares and quorum to be defined on options but got ${options}`);
    }

    splitFFI(secret, options).then((shares) => {
      dispatch({ type: SPLIT_SUCCESS, shares });
    }).catch((error) => {
      // TODO: error handling
      dispatch({ type: SPLIT_FAILURE, error });
    });

    dispatch({ type: SPLIT });
  };
}
