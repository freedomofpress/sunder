import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ErrorMessage from 'app/components/ErrorMessage';

describe('ErrorMessage', () => {
  it('should render an error message', () => {
    expect(shallow(<ErrorMessage>Oh no!</ErrorMessage>).is('.error-message')).to.be.true();
  });

  it('should not render error message with no children', () => {
    expect(shallow(<ErrorMessage />).is('.error-message')).to.be.false();
  });
});
