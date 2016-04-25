import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Button from 'app/components/Button';

let props;
describe('Button', () => {
  beforeEach(() => {
    props = {
      onClick: spy(),
      className: 'special-button-class',
      children: 'button contents',
      type: 'default',
      icon: 'cube',
      id: 'unique-button',
      disabled: false
    };
  });

  it('should render without error', () => {
    expect(shallow(<Button {...props} />)).to.have.length(1);
  });

  it('should handle an icon-less button', () => {
    props.icon = undefined;
    const button = shallow(<Button {...props} />);
    expect(button.is('.btn-no-icon')).to.be.true();
    expect(button.find('i')).to.have.length(0);
  });

  it('should handle an svg icon', () => {
    props.icon = <svg />;
    const button = shallow(<Button {...props} />);
    expect(button.find('svg')).to.have.length(1);
  });

  it('should include the children', () => {
    const button = shallow(<Button {...props} />);
    expect(button.text()).to.contain(props.children);
  });

  it('should handle disabled', () => {
    props.disabled = true;
    const button = shallow(<Button {...props} />);
    expect(button.is('.disabled')).to.be.true();
  });

  it('should include id', () => {
    const button = shallow(<Button {...props} />);
    expect(button.is(`#${props.id}`)).to.be.true();
  });

  it('should include classname', () => {
    const button = shallow(<Button {...props} />);
    expect(button.is(`.${props.className}`)).to.be.true();
  });

  it('should call onClick', () => {
    const button = shallow(<Button {...props} />);
    button.simulate('click');
    expect(props.onClick.calledOnce).to.be.true();
  });
});
