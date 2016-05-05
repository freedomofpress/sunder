import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import NumberField from 'src/components/NumberField';

describe('NumberField', () => {
  it('should render an error message', () => {
    const props = {
      field: {
        error: 'error',
        touched: true,
        invalid: true
      }
    };
    expect(shallow(<NumberField {...props} />).find('.error-label')).to.have.length(1);
  });

  it('should call onChanged with the parsed value', () => {
    const props = { field: { onChange: spy() } };
    const field = shallow(<NumberField {...props} />);
    const input = field.find('input');
    input.simulate('change', { target: { value: '10' } });
    expect(props.field.onChange.calledWith(10)).to.be.true();
  });
});
