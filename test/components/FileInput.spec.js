import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import FileInput from 'app/components/FileInput';

const props = { field: {} };

describe('<FileInput />', () => {
  it('should render without error', () => {
    expect(shallow(<FileInput {...props} />)).to.exist();
  });

  // Interactions with the browser file dialogs seem very hard to test.
});
