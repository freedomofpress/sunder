import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { DistributeScreen } from 'app/containers/DistributeScreen';

const props = { dispatch: spy(), shares: ['xyz'], quorum: 1 };

describe('<DistributeScreen />', () => {
  it('should reset app state when loaded', () => {
    const distribute = mount(<DistributeScreen {...props} />);
    expect(distribute).to.exist();
  });
});
