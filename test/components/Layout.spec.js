import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Layout from 'src/components/Layout';

const props = { header: 'xyz', children: 'some txt' };

describe('<Layout />', () => {
  it('should render without error', () => {
    const layout = shallow(<Layout {...props} />);
    expect(layout.text()).to.contain(props.children);
    expect(layout.text()).to.contain(props.header);
  });
});
