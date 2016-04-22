import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import Recover from 'app/components/Recover';

const props = {
  shares: [],
  quorum: 3,
  inProgress: false,
  onSubmit: spy(),
  onReset: spy()
};

describe('<Recover />', () => {
  it('should render without error', () => {
    expect(shallow(<Recover {...props} />).is('.recover')).to.be.true();
  });
});
