import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import ShareInput from 'src/components/ShareInput';
import FileInput from 'src/components/FileInput';
import PasteButton from 'src/components/PasteButton';

const props = {
  fields: {
    share: {},
  },
  handleSubmit: spy(),
  invalid: false,
  resetForm: spy()
};

describe('<ShareInput />', () => {
  it('should render without error', () => {
    const shareInput = mount(<ShareInput {...props} />);
    expect(shareInput.find(FileInput)).to.have.length(1);
    expect(shareInput.find(PasteButton)).to.have.length(1);
  });
});
