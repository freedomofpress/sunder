import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { RecoverScreen } from 'app/containers/RecoverScreen';

let props;
let context;

describe('<RecoverScreen />', () => {
  beforeEach(() => {
    props = {
      shares: [{
        data: 'xyz'
      }, {
        data: 'abc'
      }],
      quorum: 1,
      inProgress: false,
      dispatch: spy(),
      secret: undefined,
      error: undefined
    };
    context = {
      router: {
        goBack: spy(),
        push: spy()
      }
    };
  });

  it('should render without error', () => {
    const screen = shallow(<RecoverScreen {...props} />, { context });
    expect(screen).to.exist();
  });

  it('should navigate if secret is recover', () => {
    const screen = shallow(<RecoverScreen {...props} />, { context });
    props.secret = 'xyz';
    expect(context.router.push.calledOnce).to.be.false();
    screen.setProps(props);
    expect(context.router.push.calledOnce).to.be.true();
  });
});
