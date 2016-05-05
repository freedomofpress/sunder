import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import ShareRow from 'src/components/ShareRow';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import CopyButton from 'src/components/CopyButton';
import SaveFileButton from 'src/components/SaveFileButton';

const props = {
  share: 'xyz',
  index: 2
};

describe('<ShareRow />', () => {
  it('should render without error', () => {
    const row = shallow(<ShareRow {...props} />);
    expect(row).to.have.length(1);
  });

  it('should show a modal when view clicked', () => {
    const row = shallow(<ShareRow {...props} />);
    const viewButton = row.find(Button);
    expect(row.find(Modal)).to.have.length(0);
    viewButton.simulate('click');
    expect(row.find(Modal)).to.have.length(1);
  });

  it('should indicate saved when save clicked', () => {
    const row = mount(<ShareRow {...props} />);
    // This is a hack to avoid mocking out the whole remote dialog/filesystem
    // interaction.
    row.find(SaveFileButton).prop('onSaved')('testfilename.txt');
    expect(row.find('.share-status').text()).to.contain('saved');
  });

  it('should indicate copied when copy clicked', () => {
    const row = mount(<ShareRow {...props} />);
    // Simulating the click wasn't working here for some reason.
    row.find(CopyButton).prop('onCopied')();
    expect(row.find('.share-status').text()).to.contain('copied');
  });
});
