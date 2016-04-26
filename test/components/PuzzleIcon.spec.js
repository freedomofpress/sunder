import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PuzzleIcon from 'app/components/PuzzleIcon';

const props = { className: 'test' };

describe('<PuzzleIcon />', () => {
  it('should render without error', () => {
    const icon = shallow(<PuzzleIcon {...props} />);
    expect(icon.is(`.${props.className}`)).to.be.true();
  });
});
