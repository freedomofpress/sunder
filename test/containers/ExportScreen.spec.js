import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { ExportScreen } from 'src/containers/ExportScreen';

const props = { dispatch: spy(), secret: 'zyz' };

describe('<ExportScreen />', () => {
  it('should render without error', () => {
    const screen = mount(<ExportScreen {...props} />);
    expect(screen).to.exist();
  });
});
