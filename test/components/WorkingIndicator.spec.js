import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import WorkingIndicator from 'src/components/WorkingIndicator';

describe('<WorkingIndicator />', () => {
  it('should render without error', () => {
    const indicator = shallow(<WorkingIndicator />);
    expect(indicator).to.exist();
  });
});
