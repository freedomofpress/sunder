import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Distribute from 'src/components/Distribute';
import ShareRow from 'src/components/ShareRow';

describe('Distribute', () => {
  it('should render the right number of rows', () => {
    const props = { shares: ['a', 'b', 'c'] };
    expect(shallow(<Distribute {...props} />).find(ShareRow)).to.have.length(3);
  });
});
