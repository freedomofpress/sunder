import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { SplitScreen, mapStateToProps } from 'app/containers/SplitScreen';
import Split from 'app/components/Split';

let props;
let context;

describe('<SplitScreen />', () => {
  beforeEach(() => {
    props = {
      success: false,
      dispatch: spy()
    };
    context = {
      router: {
        push: spy()
      }
    };
  });

  it('should render without error', () => {
    const screen = shallow(<SplitScreen {...props} />, { context });
    expect(screen).to.exist();
  });

  it('should navigate if successful', () => {
    const screen = shallow(<SplitScreen {...props} />, { context });
    props.success = true;
    expect(context.router.push.calledOnce).to.be.false();
    screen.setProps(props);
    expect(context.router.push.calledOnce).to.be.true();
  });

  it('should dispatch when split submitted', () => {
    const screen = shallow(<SplitScreen {...props} />, { context });
    // There isn't a clear way to test what params are passed to split() here
    screen.find(Split).prop('onSubmit')({});
    expect(props.dispatch.calledOnce).to.be.true();
  });

  it('should map the state to the right props', () => {
    expect(mapStateToProps({ split: { shares: ['xyz'] } })).to.be.eql({ success: true });
    expect(mapStateToProps({ split: { shares: [] } })).to.be.eql({ success: false });
  });
});
