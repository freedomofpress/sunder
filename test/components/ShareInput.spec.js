import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy, match } from 'sinon';
import { ShareInput } from 'app/components/ShareInput';
import Button from 'app/components/Button';

const props = {
  dispatch: spy(),
  quorum: 3,
  numEnteredShares: 2
};

describe('<ShareInput />', () => {
  it('should call addShare when button is pressed', () => {
    const shareInput = mount(<ShareInput {...props} />);
    const input = shareInput.find('[name="secret-share"]');
    const button = shareInput.find(Button);
    const testShare = 'test string';
    input.get(0).value = testShare;
    input.simulate('change');
    button.simulate('click');
    // This is a little awkward to test thoroughly, but this is pretty good.
    expect(props.dispatch.calledWithMatch(match.func)).to.be.true();
  });
});
