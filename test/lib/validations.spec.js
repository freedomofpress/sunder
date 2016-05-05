import { expect } from 'chai';
import {
  createValidator,
  required,
  isNumber,
  min,
  max
} from 'src/lib/validations';

describe('validations', () => {
  describe('required', () => {
    it('should error on falsy values', () => {
      expect(required(false, 'test')).to.contain('required');
      expect(required(null, 'test')).to.contain('required');
      expect(required('', 'test')).to.contain('required');
    });

    it('should not error on 0', () => {
      expect(required(0, 'test')).to.be.false();
    });

    it('should error on []', () => {
      expect(required([], 'test')).to.contain('required');
    });

    it('should error on " "', () => {
      expect(required('    ', 'test')).to.contain('required');
    });

    it('should not error on truthy things', () => {
      expect(required('eh', 'test')).to.be.false();
      expect(required(10, 'test')).to.be.false();
      expect(required(['hello'], 'test')).to.be.false();
      expect(required({}, 'test')).to.be.false();
    });
  });

  describe('isNumber', () => {
    it('should error on non-numbers', () => {
      expect(isNumber({})).to.contain('number');
      expect(isNumber([])).to.contain('number');
    });

    it('should allow string numbers', () => {
      expect(isNumber('10')).to.be.false();
      expect(isNumber('78randomgarbage')).to.be.false();
      expect(isNumber('0')).to.be.false();
    });

    it('should not allow string non-numbers', () => {
      expect(isNumber('ten')).to.contain('number');
      expect(isNumber('randomgarbage')).to.contain('number');
      expect(isNumber('!200')).to.contain('number');
    });

    it('should allow numbers', () => {
      expect(isNumber(10)).to.be.false();
      expect(isNumber(33)).to.be.false();
      expect(isNumber(0)).to.be.false();
    });
  });

  describe('min', () => {
    it('should return number error for non-numbers', () => {
      expect(min(10)('ten')).to.contain('number');
      expect(min(10)({})).to.contain('number');
      expect(min(10)([])).to.contain('number');
    });

    it('should return min error when less', () => {
      expect(min(10)(9)).to.contain('at least');
      expect(min(0)('-10')).to.contain('at least');
      expect(min(0.00003)(0.00002)).to.contain('at least');
    });

    it('should allow values when more', () => {
      expect(min(10)(11)).to.be.false();
      expect(min(0)('10000')).to.be.false();
      expect(min(0.00003)(0.10002)).to.be.false();
    });
  });

  describe('max', () => {
    it('should return number error for non-numbers', () => {
      expect(max(10)('ten')).to.contain('number');
      expect(max(10)({})).to.contain('number');
      expect(max(10)([])).to.contain('number');
    });

    it('should return max error when more', () => {
      expect(max(10)(11)).to.contain('at most');
      expect(max(0)('10')).to.contain('at most');
      expect(max(0.00001)(0.00002)).to.contain('at most');
    });

    it('should allow values when more', () => {
      expect(max(10)(9)).to.be.false();
      expect(max(0)('-10000')).to.be.false();
      expect(max(0.00003)(0.00002)).to.be.false();
    });
  });

  describe('createValidator', () => {
    it('should work as expected', () => {
      const validator = createValidator({
        field1: [required],
        field2: [isNumber, max(10)]
      });
      expect(validator({ field2: 9 }).field1).to.contain('required');
      expect(validator({ field2: 11 }).field2).to.contain('at most');
      expect(validator({ field1: 'x', field2: 0 })).to.be.eql({});
    });
  });
});
