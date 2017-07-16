import { expect } from 'chai';
import reducer, {
  SAVE_LAST_DIRECTORY
} from 'src/ducks/files';

describe('files reducer', () => {
  it('should return the right initial state', () => {
    expect(reducer(undefined, {})).to.be.eql({});
  });

  it('should save the directory', () => {
    const action = {
      type: SAVE_LAST_DIRECTORY,
      directory: '/this/is/where/I/saved/the/thing'
    };
    expect(reducer(undefined, action)).to.be.eql({
      lastDirectory: action.directory
    });
  });
});

