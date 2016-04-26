import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Panel from 'app/components/Panel';

describe('Panel', () => {
  it('should render title if passed', () => {
    const props = { title: 'title' };
    expect(shallow(<Panel {...props} />).find('.panel-title')).to.have.length(1);
  });

  it('should not render title if not passed', () => {
    const props = { };
    expect(shallow(<Panel {...props} />).find('.panel-title')).to.have.length(0);
  });

  it('should render className if passed', () => {
    const props = { className: 'sweet-panel' };
    expect(shallow(<Panel {...props} />).is(`.${props.className}`)).to.be.true();
  });

  it('should pass onClick', () => {
    const props = { onClick: () => {} };
    expect(shallow(<Panel {...props} />).prop('onClick')).to.deep.equal(props.onClick);
  });
});
