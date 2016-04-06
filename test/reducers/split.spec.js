import { expect } from 'chai';
import reducer, {
  SPLIT,
  SPLIT_SUCCESS,
  SPLIT_FAILURE
} from '../../app/ducks/split';


describe('split reducer', () => {
  describe('handling of SPLIT', () => {
    it('should return the right initial state', () => {
      expect(reducer(undefined, {})).to.be.eql({});
    });

    it('should mark inProgress on split', () => {
      const action = { type: SPLIT };
      expect(reducer(undefined, action).inProgress).to.be.true();
    });

    it('should store the requested numShares and quorum', () => {
      const action = { type: SPLIT, quorum: 10, numShares: 33 };
      expect(reducer(undefined, action).quorum).to.be.eql(10);
      expect(reducer(undefined, action).numShares).to.be.eql(33);
    });

    it('should clear pre-existing errors and shares', () => {
      const action = { type: SPLIT };
      const state = { error: 'Something bad', shares: ['asd', 'xyz'] };
      expect(reducer(state, action).error).to.be.null();
      expect(reducer(state, action).shares).to.be.null();
    });
  });

  describe('handling of SPLIT_SUCCESS', () => {
    it('should mark inProgress false', () => {
      const action = { type: SPLIT_SUCCESS };
      const state = { inProgress: true };
      expect(reducer(state, action).inProgress).to.be.false();
    });

    it('should clear any error', () => {
      const action = { type: SPLIT_SUCCESS };
      const state = { error: 'BAD' };
      expect(reducer(state, action).error).to.be.null();
    });

    it('should store the shares', () => {
      const shares = ['abc', 'xyz'];
      const action = { type: SPLIT_SUCCESS, shares };
      expect(reducer(undefined, action).shares).to.be.eql(shares);
    });
  });

  describe('handling of SPLIT_FAILURE', () => {
    it('should mark inProgress false', () => {
      const action = { type: SPLIT_FAILURE };
      const state = { inProgress: true };
      expect(reducer(state, action).inProgress).to.be.false();
    });

    it('should store the error', () => {
      const error = 'BAD NEWS';
      const action = { type: SPLIT_FAILURE, error };
      expect(reducer(undefined, action).error).to.be.eql(error);
    });
  });
});
