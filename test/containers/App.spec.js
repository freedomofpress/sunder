import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from 'src/containers/App';

const props = { children: 'some txt' };

describe('<App />', () => {
  it('should render without error', () => {
    const app = shallow(<App {...props} />);
    expect(app.text()).to.contain(props.children);
  });
});
