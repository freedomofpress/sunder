export const SAVE_LAST_DIRECTORY = 'SAVE_LAST_DIRECTORY';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_LAST_DIRECTORY:
      return Object.assign({}, state, { lastDirectory: action.directory });
    default:
      return state;
  }
}

export function saveLastDirectory(directory) {
  return { type: SAVE_LAST_DIRECTORY, directory };
}
