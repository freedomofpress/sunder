/**
 * Actions and reducer for recovering a secret.
 */

import { parseShare, recoverFFI } from 'src/lib/crypto';
import { RESET } from 'src/ducks/global';

export const RECOVER = 'RECOVER';
export const RECOVER_SUCCESS = 'RECOVER_SUCCESS';
export const RECOVER_ERROR = 'RECOVER_ERROR';
export const ADD_SHARE = 'ADD_SHARE';
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
      return Object.assign({}, state, { inProgress: true });
    case RECOVER_SUCCESS:
      return Object.assign({}, state, {
        secret: action.secret,
        inProgress: false
      });
    case RECOVER_ERROR:
      const newState = Object.assign({}, state, { inProgress: false });

      // If the error is associated with a specific share, add it to the share
      if (action.error && action.error.share_index !== undefined) {
        return Object.assign(newState, {
          shares: state.shares.map((share, index) => {
            if (index === action.error.share_index) {
              return Object.assign(share, { error: action.error.message });
            }
            return share;
          })
        });
      }

      // This is a global, but recoverable error where the shares are valid but mismatched
      if (action.error && action.error.share_groups) {
        // Find the group with the maximum shares in it, mark the others as not belonging
        // Should we indicate a strict majority? Should the messaging be different?
        // 'These don't match' vs. 'This one doesn't belong.'
        // Should we render them visually by group? Use colors to indicate?
        const maxGroupSize = Math.max(...action.error.share_groups.map((a) => a.length));
        const majorityGroup = action.error.share_groups.find((a) => a.length === maxGroupSize);
        return Object.assign(newState, {
          shares: state.shares.map((share, index) => {
            return Object.assign(share, {
              error: majorityGroup.includes(index) ? null : 'This share doesn\'t belong with the others.'
            })
          }),
          mismatch: true
        });
      }

      // Global error case
      return Object.assign(newState, {
        error: action.error && action.error.message || 'Something went wrong',
      });
    case ADD_SHARE: {
      // If share properties differ, prefer the ones entered first.
      const shareProperties =
        Object.assign({}, action.shareProperties, state.shareProperties);
      return Object.assign({}, state, {
        shares: [...state.shares, { data: action.share }],
        shareProperties
      });
    }
    case BAD_SHARE:
      return Object.assign({}, state, {
        shares: [...state.shares, { data: action.share, error: action.error }]
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


export function addShare(share) {
  return (dispatch, getState) => {
    const parsedShare = parseShare(share);
    const state = getState();
    const existingShareProperties = state.recover.shareProperties;

    if (existingShareProperties.id
        && existingShareProperties.id !== parsedShare.id) {
      return dispatch(badShare(share, 'Mismatched secret id'));
    }

    const parsedShares = state.recover.shares.map((s) => parseShare(s.data));
    if (parsedShares.some((s) => s.shareNum === parsedShare.shareNum)) {
      return dispatch(badShare(share, 'Duplicate share'));
    }

    if (!Number.isInteger(parsedShare.quorum) || !Number.isInteger(parsedShare.shareNum)) {
      return dispatch(badShare(share, 'Malformed share'));
    }

    dispatch({
      type: ADD_SHARE,
      share,
      shareProperties: { quorum: parsedShare.quorum }
    });
  };
}

export function badShare(share, error) {
  return { type: BAD_SHARE, share, error };
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
