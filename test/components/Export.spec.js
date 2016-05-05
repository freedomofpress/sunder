import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Export from 'src/components/Export';
import Modal from 'src/components/Modal';

const props = { secret: 'xyz' };

describe('<Export />', () => {
  it('should render without error', () => {
    expect(shallow(<Export {...props} />)).to.exist();
  });

  it('should show the view model when view clicked', () => {
    const wrapper = mount(<Export {...props} />);
    expect(wrapper.find(Modal)).to.have.length(0);
    wrapper.find('#view-secret-button').simulate('click');
    expect(wrapper.find(Modal)).to.have.length(1);
  });
});
