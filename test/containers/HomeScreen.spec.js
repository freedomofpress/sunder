import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { reset } from 'src/ducks/global';
import { HomeScreen } from 'src/containers/HomeScreen';

const props = { dispatch: spy() };

describe('<HomeScreen />', () => {
  it('should reset app state when loaded', () => {
    mount(<HomeScreen {...props} />);
    expect(props.dispatch.calledWith(reset())).to.be.true();
  });
});
