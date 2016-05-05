import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { DistributeScreen } from 'src/containers/DistributeScreen';

const props = { dispatch: spy(), shares: ['xyz'], quorum: 1 };

describe('<DistributeScreen />', () => {
  it('should render without error', () => {
    const distribute = mount(<DistributeScreen {...props} />);
    expect(distribute).to.exist();
  });
});
