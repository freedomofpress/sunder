import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SaveFileButton from 'app/components/SaveFileButton';

const props = { buttonText: 'some txt' };

describe('<SaveFileButton />', () => {
  it('should render without error', () => {
    const button = mount(<SaveFileButton {...props} />);
    expect(button.text()).to.contain(props.buttonText);
  });

  // There's a lot more to this, but v. hard to test.
});
