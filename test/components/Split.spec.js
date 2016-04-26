import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import { Split } from 'app/components/Split';
import WorkingIndicator from 'app/components/WorkingIndicator';
import Button from 'app/components/Button';

let props;

describe('<Split />', () => {
  beforeEach(() => {
    props = {
      fields: {
        shares: {},
        quorum: {},
        secret: {}
      },
      submitting: false,
      handleSubmit: spy(),
      invalid: false
    };
  });

  it('should render without error', () => {
    const split = shallow(<Split {...props} />);
    expect(split).to.exist();
    expect(split.find(WorkingIndicator)).to.have.length(0);
    expect(split.find(Button).prop('disabled')).to.be.false();
  });

  it('should show the working indicator while submitting', () => {
    props.submitting = true;
    const split = shallow(<Split {...props} />);
    expect(split.find(WorkingIndicator)).to.have.length(1);
  });

  it('should disable the button when invalid', () => {
    props.invalid = true;
    const split = shallow(<Split {...props} />);
    expect(split.find(Button).prop('disabled')).to.be.true();
  });
});
