import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { RecoverStatusShare } from 'app/components/RecoverStatusShare';
import { removeShare } from 'app/ducks/recover';

describe('<RecoverStatusShare />', () => {
  it('should render as current if current true', () => {
    const props = {
      share: { data: 'xyz' },
      current: true
    };
    const share = shallow(<RecoverStatusShare {...props} />);
    expect(share.find('.current')).to.have.length(1);
  });

  it('should render as incomplete if no share', () => {
    const props = {};
    const share = shallow(<RecoverStatusShare {...props} />);
    expect(share.find('.incomplete')).to.have.length(1);
  });

  it('should render as error if error present on share', () => {
    const props = {
      share: { data: 'xyz', error: 'bad' }
    };
    const share = shallow(<RecoverStatusShare {...props} />);
    expect(share.find('.error')).to.have.length(1);
  });

  it('should render as successful if no error present on share', () => {
    const props = {
      share: { data: 'xyz' }
    };
    const share = shallow(<RecoverStatusShare {...props} />);
    expect(share.find('.success')).to.have.length(1);
  });

  it('should dispatch remove share when clicked', () => {
    const props = {
      share: { data: 'xyz' },
      index: 2,
      dispatch: spy()
    };
    const share = shallow(<RecoverStatusShare {...props} />);
    const remove = share.find('.remove-share');
    remove.simulate('click');
    expect(props.dispatch.calledWith(removeShare(2))).to.be.true();
  });
});
