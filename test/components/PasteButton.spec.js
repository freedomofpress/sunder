import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import PasteButton from 'src/components/PasteButton';

describe('Panel', () => {
  it('should render without error', () => {
    expect(mount(<PasteButton />).text()).to.include('clipboard');
  });
});
