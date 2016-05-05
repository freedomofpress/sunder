import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CopyButton from 'src/components/CopyButton';

const props = {
  targetText: 'xyz'
};

describe('<CopyButton />', () => {
  it('should render without error', () => {
    expect(shallow(<CopyButton {...props} />)).to.exist();
  });

  // The rest of the functionality here somes hard to test/not worth testing.
});
