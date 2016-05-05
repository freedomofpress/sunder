import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { RecoverScreen } from 'src/containers/RecoverScreen';
import Recover from 'src/components/Recover';
import { reset } from 'src/ducks/recover';

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

  it('should dispatch when recover submitted', () => {
    const screen = shallow(<RecoverScreen {...props} />, { context });
    // There isn't a clear way to test what params are passed to split() here
    screen.find(Recover).prop('onSubmit')();
    expect(props.dispatch.calledOnce).to.be.true();
  });

  it('should dispatch when reset', () => {
    const screen = shallow(<RecoverScreen {...props} />, { context });
    screen.find(Recover).prop('onReset')();
    expect(props.dispatch.calledWith(reset())).to.be.true();
  });
});
