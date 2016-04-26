import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import BackButton from 'app/components/BackButton';

describe('<BackButton />', () => {
  it('should work as intended', () => {
    const context = { router: { goBack: spy() } };
    const button = shallow(<BackButton />, { context });
    button.simulate('click');
    expect(context.router.goBack.calledOnce).to.be.true();
  });
});
