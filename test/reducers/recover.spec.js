import { expect } from 'chai';
import reducer, {
  RECOVER,
  RECOVER_SUCCESS,
  RECOVER_ERROR,
  ADD_SHARE,
  BAD_SHARE,
  REMOVE_SHARE,
  RESET_RECOVERY,
  initialState
} from 'app/ducks/recover';

describe('recover reducer', () => {
  it('should have the right initial state', () => {
    expect(reducer(undefined, {})).to.be.eql(initialState);
  });

  describe('handling of RECOVER', () => {
    it('should mark inProgress true', () => {
      const action = { type: RECOVER };
      expect(reducer(undefined, action).inProgress).to.be.true();
    });
  });

  describe('handling of RECOVER_SUCCESS', () => {
    const secret = 'recovered secret';
    const action = { type: RECOVER_SUCCESS, secret };
    const state = { inProgress: true };

    it('should mark inProgress false', () => {
      expect(reducer(state, action).inProgress).to.be.false();
    });

    it('should store the secret', () => {
      expect(reducer(state, action).secret).to.be.eql(secret);
    });
  });

  describe('handling of RECOVER_ERROR', () => {
    const error = 'BAD NEWS';
    const action = { type: RECOVER_ERROR, error };
    const state = { inProgress: true };

    it('should mark inProgress false', () => {
      expect(reducer(state, action).inProgress).to.be.false();
    });

    it('should store the error message', () => {
      expect(reducer(state, action).error).to.be.eql(error);
    });
  });

  describe('handling of ADD_SHARE', () => {
    const shareProperties = {
      quorum: 3,
      version: 'v0.1'
    };
    const share = 'xyz';
    const action = { type: ADD_SHARE, share: 'xyz', shareProperties };
    const state = initialState;

    it('should add the share', () => {
      expect(reducer(state, action).shares).to.be.eql([{ data: share }]);
    });

    it('should store the shareProperties', () => {
      expect(reducer(state, action).shareProperties).to.be.eql(shareProperties);
    });

    it('should use earlier shareProperties when conflicting', () => {
      const secondState = Object.assign({}, initialState, { shareProperties });
      const secondShare = 'abc';
      const secondAction = {
        type: ADD_SHARE,
        share: secondShare,
        shareProperties: { quorum: 5, version: 'v1.2' }
      };

      expect(reducer(secondState, secondAction).shareProperties)
          .to.be.eql(shareProperties);
    });
  });

  describe('handling of BAD_SHARE', () => {
    it('should store the share with an error', () => {
      const share = 'xyz';
      const error = 'Something about this seems fishy.';
      const action = { type: BAD_SHARE, share, error };
      expect(reducer(undefined, action).shares).to.be.eql([{ data: share, error }]);
    });
  });

  describe('handling of REMOVE_SHARE', () => {
    it('should remove the right share', () => {
      const action = { type: REMOVE_SHARE, index: 1 };
      const state = { shares: ['a', 'b', 'c'] };
      expect(reducer(state, action).shares).to.be.eql(['a', 'c']);
    });

    it('should reset the state if this was the last share', () => {
      const action = { type: REMOVE_SHARE, index: 0 };
      const state = { shares: ['a'], shareProperties: { quorum: 3 } };
      expect(reducer(state, action)).to.be.eql(initialState);
    });
  });

  describe('handling of RESET_RECOVERY', () => {
    it('should revert to the initial state', () => {
      const action = { type: RESET_RECOVERY };
      const state = { shares: ['a', 'b', 'c'] };
      expect(reducer(state, action)).to.be.eql(initialState);
    });
  });
});
