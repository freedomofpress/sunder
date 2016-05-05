import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Info from 'src/components/Info';

const props = { className: 'info-test', children: 'some txt' };

describe('<Info />', () => {
  it('should render without error', () => {
    const info = shallow(<Info {...props} />);
    expect(info.is(`.${props.className}`)).to.be.true();
    expect(info.text()).to.contain(props.children);
  });
});
