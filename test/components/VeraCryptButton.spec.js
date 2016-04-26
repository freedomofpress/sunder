import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import VeraCryptButton from 'app/components/VeraCryptButton';

const props = { className: 'test', secret: 'xyz' };

describe('<VeraCryptButton />', () => {
  it('should render without error', () => {
    const button = shallow(<VeraCryptButton {...props} />);
    expect(button.is(`.${props.className}`)).to.be.true();
  });

  // Need to mock out the veracrypt lib and dialog to test the rest of this
});
