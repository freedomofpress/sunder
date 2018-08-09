import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import FileOrTextInput, { MAX_DISPLAY_SIZE_BYTES } from 'src/components/FileOrTextInput';
import FileInput from 'src/components/FileInput';

const props = {
  field: {
    touched: false,
    invalid: false,
    value: 'secret',
    onChange: spy()
  }
};

describe('<FileOrTextInput />', () => {
  it('should render a textarea by default', () => {
    const fileOrText = shallow(<FileOrTextInput {...props} />);
    expect(fileOrText.find('textarea').not('.hidden')).to.have.length(1);
    expect(fileOrText.find(FileInput).parent().is('.hidden')).to.be.true();
  });

  it('should render a file input when file mode selected', () => {
    const fileOrText = shallow(<FileOrTextInput {...props} />);
    fileOrText.find('select').simulate('change', { target: { value: 'file' } });
    expect(fileOrText.find(FileInput).not('.hidden')).to.have.length(1);
    expect(fileOrText.find('textarea').is('.hidden')).to.be.true();
  });

  it('shouldn\'t render secret if it\'s too big', () => {
    let testSecret = [];
    for (let i = 0; i < MAX_DISPLAY_SIZE_BYTES / 2 + 1; i++) {
      testSecret.push('a');
    }
    testSecret = testSecret.join('');
    const testProps = { field: Object.assign({}, props.field, { value: testSecret }) };
    const fileOrText = shallow(<FileOrTextInput {...testProps} />);
    const noDisplay = fileOrText.find('.no-display-message');
    expect(noDisplay).to.have.length(1);
    noDisplay.find('a').simulate('click');
    expect(props.field.onChange.calledWith('')).to.be.true();
  });

  it('should handle the reveal checkbox properly', () => {
    const fileOrText = shallow(<FileOrTextInput {...props} />);
    expect(fileOrText.find('textarea').is('.revealed')).to.be.true();
    fileOrText.find('.reveal-options').find('input')
      .simulate('change', { target: { checked: true } });
    expect(fileOrText.find('textarea').is('.revealed')).to.be.false();
  });
});
