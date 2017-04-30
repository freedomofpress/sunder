import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Icon from 'src/components/Icon';

const props = { className: 'test' };

describe('<Icon />', () => {
  it('should render without error', () => {
    const icon = shallow(<Icon {...props} />);
    expect(icon.is(`.${props.className}`)).to.be.true();
  });
});
