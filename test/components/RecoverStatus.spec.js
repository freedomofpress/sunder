import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RecoverStatus from 'src/components/RecoverStatus';
import RecoverStatusShare from 'src/components/RecoverStatusShare';

describe('<RecoverStatus />', () => {
  it('should render nothing with no quorum', () => {
    const props = {
      shares: [],
      quorum: undefined
    };
    const status = shallow(<RecoverStatus {...props} />);
    expect(status).to.have.length(1);
    expect(status.find(RecoverStatusShare)).to.have.length(0);
  });

  it('should render quorum if it exists', () => {
    const props = {
      shares: [{ data: 'xyz' }],
      quorum: 3
    };
    const status = shallow(<RecoverStatus {...props} />);
    expect(status.find(RecoverStatusShare)).to.have.length(3);
  });

  it('should render all shares even if greater than quorum', () => {
    const props = {
      shares: [{ data: 'xyz' }, { data: 'xyz' }, { data: 'xyz' }, { data: 'xyz' }],
      quorum: 3
    };
    const status = shallow(<RecoverStatus {...props} />);
    expect(status.find(RecoverStatusShare)).to.have.length(4);
  });

  it('should render numBadShares + quorum', () => {
    const props = {
      shares: [{ error: 'xyz' }, { error: 'xyz' }, { error: 'xyz' }, { error: 'xyz' }],
      quorum: 3
    };
    const status = shallow(<RecoverStatus {...props} />);
    expect(status.find(RecoverStatusShare)).to.have.length(7);
  });

  it('should set the current prop of the right share', () => {
    const props = {
      shares: [{ data: 'xyz' }],
      quorum: 3
    };
    const status = shallow(<RecoverStatus {...props} />);
    expect(status.find(RecoverStatusShare).at(1).prop('current')).to.be.true();
  });
});
