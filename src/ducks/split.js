/**
 * Actions and reducer for splitting a secret.
 */

import { splitFFI } from 'src/lib/crypto';
import { RESET } from 'src/ducks/global';

export const SPLIT = 'SPLIT';
export const SPLIT_SUCCESS = 'SPLIT_SUCCESS';
export const SPLIT_FAILURE = 'SPLIT_FAILURE';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SPLIT:
      return Object.assign(
        {}, state, {
          inProgress: true,
          error: null,
          shares: null,
          numShares: action.numShares,
          quorum: action.quorum
        });
    case SPLIT_SUCCESS:
      return Object.assign(
        {}, state, { inProgress: false, shares: action.shares, error: null });
    case SPLIT_FAILURE:
      return Object.assign(
        {}, state, { inProgress: false, error: action.error });
    case RESET:
      return initialState;
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

    dispatch({
      type: SPLIT,
      numShares: options.shares,
      quorum: options.quorum
    });

    if (!Buffer.isBuffer(secret)) {
      secret = Buffer.from(secret, 'utf8');
    }

    return splitFFI(secret, options).then((shares) => {
      dispatch({ type: SPLIT_SUCCESS, shares });
    }).catch((error) => {
      // TODO: error handling
      dispatch({ type: SPLIT_FAILURE, error });
    });
  };
}
