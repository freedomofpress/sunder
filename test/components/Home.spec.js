import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import Home from 'app/components/Home';
import Button from 'app/components/Button';

const props = { field: {} };

describe('<Home />', () => {
  it('should render without error', () => {
    const context = { router: { push: spy() } };
    const home = mount(<Home {...props} />, { context });
    home.find(Button).at(0).simulate('click');
    home.find(Button).at(1).simulate('click');
    expect(context.router.push.calledTwice).to.be.true();
  });

  // Interactions with the browser file dialogs seem very hard to test.
});
