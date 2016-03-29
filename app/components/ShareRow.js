import React, { Component, PropTypes } from 'react';
import Button from './Button';
import CopyButton from './CopyButton';
import './ShareRow.scss';

export default class ShareRow extends Component {
  static propTypes = {
    share: PropTypes.string,
    index: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleViewClicked() {
    this.setState({ shown: !this.state.shown });
  }

  handleSaveClicked() {
    console.log('save clicked NOT IMPLEMENTED');
  }

  render() {
    const { share, index } = this.props;
    let viewText;
    let shareValue;

    if (this.state.shown) {
      viewText = 'Hide';
      shareValue = (
        <textarea className="full-width" value={share} readOnly />
      );
    } else {
      viewText = 'View';
      shareValue = `Share #${index}`;
    }

    return (
      <div className="share-row" key={share}>
        <div className="share-cell share-value">
          {shareValue}
        </div>
        <div className="share-cell share-actions">
          <Button type="small"
            icon="eye"
            onClick={this.handleViewClicked.bind(this)}>
            {viewText}
          </Button>
          <CopyButton type="small" targetText={share} />
          <Button type="small"
            icon="hdd-o"
            onClick={this.handleSaveClicked.bind(this)}>
            Save
          </Button>
        </div>
      </div>
    );
  }

  }
