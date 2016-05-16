import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { ShareInput } from 'src/components/ShareInput';

const props = {
  fields: {
    share: {},
  },
  handleSubmit: spy(),
  invalid: false,
  resetForm: spy()
};

describe('<ShareInput />', () => {
  it('should call handleSubmit when button is pressed', () => {
    const shareInput = mount(<ShareInput {...props} />);
    const input = shareInput.find('textarea');
    const button = shareInput.find('#submit-share-button');
    const testShare = 'test string';
    input.get(0).value = testShare;
    input.simulate('change');
    button.simulate('click');
    expect(props.handleSubmit.calledOnce).to.be.true();
    expect(props.resetForm.calledOnce).to.be.true();
  });
});
