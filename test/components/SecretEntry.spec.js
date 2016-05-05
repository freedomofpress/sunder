import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SecretEntry, { MAX_DISPLAY_SIZE_BYTES } from 'src/components/SecretEntry';
import FileInput from 'src/components/FileInput';

const props = {
  field: {
    touched: false,
    invalid: false,
    value: 'secret',
    onChange: spy()
  }
};

describe('<SecretEntry />', () => {
  it('should render a textarea by default', () => {
    const secretEntry = shallow(<SecretEntry {...props} />);
    expect(secretEntry.find('textarea').not('.hidden')).to.have.length(1);
    expect(secretEntry.find(FileInput).is('.hidden')).to.be.true();
  });

  it('should render a file input when file mode selected', () => {
    const secretEntry = shallow(<SecretEntry {...props} />);
    secretEntry.find('select').simulate('change', { target: { value: 'file' } });
    expect(secretEntry.find(FileInput).not('.hidden')).to.have.length(1);
    expect(secretEntry.find('textarea').is('.hidden')).to.be.true();
  });

  it('shouldn\'t render secret if it\'s too big', () => {
    let testSecret = [];
    for (let i = 0; i < MAX_DISPLAY_SIZE_BYTES / 2 + 1; i++) {
      testSecret.push('a');
    }
    testSecret = testSecret.join('');
    const testProps = { field: Object.assign({}, props.field, { value: testSecret }) };
    const secretEntry = shallow(<SecretEntry {...testProps} />);
    const noDisplay = secretEntry.find('.no-display-message');
    expect(noDisplay).to.have.length(1);
    noDisplay.find('a').simulate('click');
    expect(props.field.onChange.calledWith('')).to.be.true();
  });

  it('should handle the reveal checkbox properly', () => {
    const secretEntry = shallow(<SecretEntry {...props} />);
    expect(secretEntry.find('textarea').is('.revealed')).to.be.false();
    secretEntry.find('.reveal-options').find('input')
      .simulate('change', { target: { checked: true } });
    expect(secretEntry.find('textarea').is('.revealed')).to.be.true();
  });

  it('should handle the reveal checkbox properly', () => {
    const secretEntry = shallow(<SecretEntry {...props} />);
    expect(secretEntry.find('textarea').is('.revealed')).to.be.false();
    secretEntry.find('.reveal-options').find('input')
      .simulate('change', { target: { checked: true } });
    expect(secretEntry.find('textarea').is('.revealed')).to.be.true();
  });
});
