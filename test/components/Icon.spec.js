import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Icon from 'src/components/Icon';

const props = { type: 'recover' };

describe('<Icon />', () => {
  it('should render without error', () => {
    const icon = shallow(<Icon {...props} />);
    expect(icon.is('svg')).to.be.true();
  });
});
