import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Modal from 'app/components/Modal';

const props = { onClose: spy(), children: 'some txt' };

describe('<Modal />', () => {
  it('should render without error', () => {
    const modal = mount(<Modal {...props} />);
    expect(modal.text()).to.contain(props.children);
  });

  it('should call onClose when overlay clicked', () => {
    const modal = mount(<Modal {...props} />);
    modal.simulate('click');
    expect(props.onClose.calledOnce).to.be.true();
  });
});
