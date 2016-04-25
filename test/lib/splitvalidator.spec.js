import splitValidator from 'app/lib/splitvalidator';
import { expect } from 'chai';

describe('splitValidator', () => {
  it('should require secret', () => {
    expect(splitValidator({}).secret).to.contain('required');
  });

  it('should require shares', () => {
    expect(splitValidator({}).shares).to.contain('required');
  });

  it('should require shares to be a number', () => {
    expect(splitValidator({ shares: 'ten' }).shares).to.contain('number');
  });

  it('should require shares to be between 1 and 255', () => {
    expect(splitValidator({ shares: 0 }).shares).to.contain('at least');
    expect(splitValidator({ shares: 256 }).shares).to.contain('at most');
    expect(splitValidator({ shares: 1 }).shares).to.not.exist();
    expect(splitValidator({ shares: 255 }).shares).to.not.exist();
  });

  it('should require quorum', () => {
    expect(splitValidator({}).quorum).to.contain('required');
  });

  it('should require quorum to be a number', () => {
    expect(splitValidator({ quorum: 'ten' }).quorum).to.contain('number');
  });

  it('should require quorum to be between 1 and shares', () => {
    expect(splitValidator({ quorum: 0, shares: 10 }).quorum).to.contain('at least');
    expect(splitValidator({ quorum: 11, shares: 10 }).quorum).to.contain('at most');
    expect(splitValidator({ quorum: 200, shares: 255 }).quorum).to.not.exist();
  });
});
