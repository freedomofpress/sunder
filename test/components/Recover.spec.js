import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import Recover from 'src/components/Recover';
import ShareInput from 'src/components/ShareInput';
import Button from 'src/components/Button';
import RecoverStatus from 'src/components/RecoverStatus';

let props;

describe('<Recover />', () => {
  beforeEach(() => {
    props = {
      shares: [],
      quorum: 3,
      inProgress: false,
      onSubmit: spy(),
      onReset: spy()
    };
  });

  it('should render without error', () => {
    const recover = shallow(<Recover {...props} />);
    expect(recover).to.exist();
  });

  it('should contain a ShareInput', () => {
    expect(shallow(<Recover {...props} />).find(ShareInput)).to.have.length(1);
  });

  it('should contain some instructional text when shares is empty', () => {
    const instructions = shallow(<Recover {...props} />).find('.recover-explanation');
    expect(instructions.text()).to.contain('To recover a secret');
  });

  it('should not contain instructional text once the first share is entered', () => {
    props.shares = [{ data: 'asdf' }];
    expect(shallow(<Recover {...props} />).find('.recover-explanation')).to.have.length(0);
  });

  it('should show a reset button on global error', () => {
    props.error = 'bad';
    props.unrecoverable = true;
    const recover = shallow(<Recover {...props} />);
    expect(recover.find('.reset-action')).to.have.length(1);
    expect(recover.find(Button)).to.have.length(1);
    expect(recover.find(Button).prop('onClick')).to.be.eql(props.onReset);
    expect(recover.find(RecoverStatus)).to.have.length(0);
  });

  it('should show a finish recovery button if good shares exceed quorum', () => {
    props.shares = [{ data: 'a' }, { data: 'b' }, { data: 'c' }];
    const recover = shallow(<Recover {...props} />);
    const button = recover.find(Button);
    expect(button).to.have.length(1);
    expect(button.prop('onClick')).to.be.eql(props.onSubmit);
  });

  it('should not show a finish recovery button if shares exceed quorum but have errors', () => {
    props.shares = [{ data: 'a' }, { data: 'b' }, { data: 'c', error: 'bad' }];
    const recover = shallow(<Recover {...props} />);
    expect(recover.find(ShareInput)).to.have.length(1);
  });
});
