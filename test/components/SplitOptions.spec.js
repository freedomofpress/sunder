import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SplitOptions from 'app/components/SplitOptions';

let props;

describe('<SplitOptions />', () => {
  beforeEach(() => {
    props = {
      quorumField: { value: 3 },
      sharesField: { value: 10 },
      dispatch: spy()
    };
  });

  it('should render without error', () => {
    expect(shallow(<SplitOptions {...props} />)).to.exist();
  });

  it('should display the quorum and share values somewhere', () => {
    const splitOptions = shallow(<SplitOptions {...props} />);
    expect(splitOptions.text()).to.contain(props.quorumField.value);
    expect(splitOptions.text()).to.contain(props.sharesField.value);
  });
});
