/**
 * Actions and reducer for recovering a secret.
 */

import { recoverFFI } from 'src/lib/crypto';
import { validateShare } from 'src/lib/utilities';
import { RESET } from 'src/ducks/global';

export const RECOVER = 'RECOVER';
export const RECOVER_SUCCESS = 'RECOVER_SUCCESS';
export const RECOVER_ERROR = 'RECOVER_ERROR';
export const ADD_SHARE = 'ADD_SHARE';
export const ADD_SHARES = 'ADD_SHARES';
export const BAD_SHARE = 'BAD_SHARE';
export const REMOVE_SHARE = 'REMOVE_SHARE';
export const RESET_RECOVERY = 'RESET_RECOVERY';

export const initialState = {
  shares: [],
  shareProperties: {},
  secret: null,
  inProgress: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECOVER:
      return Object.assign({}, state, { inProgress: true, error: undefined });
    case RECOVER_SUCCESS:
      return Object.assign({}, state, {
        secret: action.secret,
        inProgress: false
      });
    case RECOVER_ERROR:
      return errorReducer(state, action);
    case ADD_SHARE: {
      // If share properties differ, prefer the ones entered first.
      const shareProperties =
        Object.assign({}, action.shareProperties, state.shareProperties);
      return Object.assign({}, state, {
        shares: [...state.shares, { ...action.share }],
        shareProperties
      });
    }
    case ADD_SHARES: {
      // If share properties differ, prefer the ones entered first.
      const shareProperties =
        Object.assign({}, action.shareProperties, state.shareProperties);
      return Object.assign({}, state, {
        shares: [...state.shares, ...action.shares ],
        shareProperties
      });
    }
    case BAD_SHARE:
      return Object.assign({}, state, {
        shares: [...state.shares, { ...action.share, error: action.error } ]
      });
    case REMOVE_SHARE:
      // If this is the only share, completely reset.
      if (state.shares.length === 1) {
        return initialState;
      }

      return Object.assign({}, state, {
        shares: [
          ...state.shares.slice(0, action.index),
          ...state.shares.slice(action.index + 1)
        ]
      });
    case RESET_RECOVERY:
      return initialState;
    case RESET:
      return initialState;
    default:
      return state;
  }
}


function errorReducer(state, action) {
  const newState = Object.assign({}, state, { inProgress: false });

  // If the error is associated with a specific share, add it to the share
  if (action.error && action.error.share_index !== undefined) {
    return Object.assign(newState, {
      shares: state.shares.map((share, index) => {
        if (index === action.error.share_index) {
          return Object.assign(share, { error: action.error.message });
        }
        return share;
      }),
      error: 'One of the shares is invalid.'
    });
  }

  // This is a global, but recoverable error where the shares are valid but mismatched
  if (action.error && action.error.share_groups) {
    // Find the group with the maximum shares in it, mark the others as not belonging
    // Should we indicate a strict majority? Should the messaging be different?
    // 'These don't match' vs. 'This one doesn't belong.'
    // Should we render them visually by group? Use colors to indicate?
    const maxGroupSize = Math.max(...action.error.share_groups.map((a) => a.length));
    const majorityGroup = action.error.share_groups.findIndex((a) => a.length === maxGroupSize);

    /* eslint-disable no-else-return */
    return Object.assign(newState, {
      shares: state.shares.map((share, index) => {
        const group = action.error.share_groups.findIndex((g) => g.includes(index));
        if (majorityGroup !== group) {
          return Object.assign(share, {
            error: 'This share doesn\'t belong with the others.',
            group
          });
        } else {
          return Object.assign(share, { group });
        }
      }),
      error: 'One or more of the shares belongs to a different secret.'
    });
  }

  // Global error case, nothing to be done.
  return Object.assign(newState, {
    error: action.error && action.error.message || 'Something went wrong',
    unrecoverable: true
  });
}


export function addShares(fileList) {
  return (dispatch, getState) => {
    const state = getState();
    let newShares = [];
    let quorum = undefined;
    fileList.forEach(function(share) {
      const result = validateShare(share.data, [...state.recover.shares, ...newShares]);
      if (result.error === 'DUPLICATE') {
        newShares.push({...share, error: 'Duplicate share'});
      } else if (result.error === 'MALFORMED') {
        newShares.push({...share, error: 'Malformed share'});
      } else if (result.error) {
        newShares.push({...share, error: 'Unknown error' + result.error});
      } else {
        newShares.push(share);
      }

      if (!quorum && result.parsedShare && result.parsedShare.quorum > 0) {
        quorum = result.parsedShare.quorum;
      }
    });

    dispatch({
      type: ADD_SHARES,
      shares: newShares,
      shareProperties: { quorum }
    });
  };
}

export function removeShare(index) {
  return { type: REMOVE_SHARE, index };
}


export function reset() {
  return { type: RESET_RECOVERY };
}


export function recover() {
  return (dispatch, getState) => {
    const state = getState();
    const shares = state.recover.shares
      .map((s) => s.data);

    dispatch({ type: RECOVER });

    recoverFFI(shares).then((secret) => {
      dispatch({ type: RECOVER_SUCCESS, secret });
    }).catch((error) => {
      dispatch({ type: RECOVER_ERROR, error });
    });
  };
}
