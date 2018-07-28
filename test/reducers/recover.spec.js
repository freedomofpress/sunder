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
} from 'src/ducks/recover';

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
    const error = { message: 'BAD NEWS' };
    const action = { type: RECOVER_ERROR, error };
    const state = { inProgress: true };

    it('should mark inProgress false', () => {
      expect(reducer(state, action).inProgress).to.be.false();
    });

    it('should store the error message', () => {
      expect(reducer(state, action).error).to.be.eql(error.message);
    });

    it('should attach an indexed error to the right share', () => {
      const shareError = { message: 'BAD NEWS', share_index: 1 };
      const shareErrorAction = { type: RECOVER_ERROR, error: shareError };
      const share0 = { data: 'sharedata0' };
      const share1 = { data: 'sharedata1' };
      const startingState = { inProgress: true, shares: [share0, share1] };

      expect(reducer(startingState, shareErrorAction).shares)
        .to.be.eql([share0, { data: 'sharedata1', error: 'BAD NEWS' }]);
      expect(reducer(startingState, shareErrorAction).error)
        .to.be.eql('One of the shares is invalid.');
      expect(reducer(startingState, shareErrorAction).inProgress)
        .to.be.eql(false);
    });

    it('should handle share groups properly', () => {
      const shareError = { message: 'BAD NEWS', share_groups: [[0], [1, 2]] };
      const shareErrorAction = { type: RECOVER_ERROR, error: shareError };
      const share0 = { data: 'sharedata0' };
      const share1 = { data: 'sharedata1' };
      const share2 = { data: 'sharedata2' };
      const startingState = { inProgress: true, shares: [share0, share1, share2] };

      expect(reducer(startingState, shareErrorAction).shares)
        .to.be.eql([
          {
            data: 'sharedata0',
            error: 'This share doesn\'t belong with the others.',
            group: 0
          },
          Object.assign({}, share1, { group: 1 }),
          Object.assign({}, share2, { group: 1 }),
        ]);
      expect(reducer(startingState, shareErrorAction).error)
        .to.be.eql('One or more of the shares belongs to a different secret.');
      expect(reducer(startingState, shareErrorAction).inProgress)
        .to.be.eql(false);
    });
  });

  describe('handling of ADD_SHARE', () => {
    const shareProperties = {
      quorum: 3,
      version: 'v0.1'
    };
    const share = {data: 'xyz'};
    const action = { type: ADD_SHARE, share: share, shareProperties };
    const state = initialState;

    it('should add the share', () => {
      expect(reducer(state, action).shares).to.be.eql([ share ]);
    });

    it('should store the shareProperties', () => {
      expect(reducer(state, action).shareProperties).to.be.eql(shareProperties);
    });

    it('should use earlier shareProperties when conflicting', () => {
      const secondState = Object.assign({}, initialState, { shareProperties });
      const secondShare = {data: 'abc'};
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
      const share = {data: 'xyz'};
      const error = 'Something about this seems fishy.';
      const action = { type: BAD_SHARE, share, error };
      expect(reducer(undefined, action).shares).to.be.eql([{ data: share.data, error }]);
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
