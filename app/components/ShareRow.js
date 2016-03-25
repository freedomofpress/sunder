import React, { Component, PropTypes } from 'react';
import Button from './Button';
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

  handleCopyClicked() {
    let successful;
    this.copyEl.setSelectionRange(0, this.copyEl.value.length);

    try {
      successful = document.execCommand('copy');
    } catch (e) {
      successful = false;
    }

    if (successful) {
      this.setState({ copy: 'successful' });
    } else {
      this.setState({ copy: 'error' });
    }

    window.setTimeout(() => this.setState({ copy: null }), 5000);
  }

  handleSaveClicked() {
    console.log('save clicked NOT IMPLEMENTED');
  }

  render() {
    const { share, index } = this.props;
    let copyText;
    let viewText;
    let shareValue;

    if (this.state.copy === 'successful') {
      copyText = 'Copied';
    } else if (this.state.copy === 'error') {
      copyText = 'Copy failed';
    } else {
      copyText = 'Copy';
    }

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
          <Button type="small"
            icon="clipboard"
            onClick={this.handleCopyClicked.bind(this)}>
            {copyText}
          </Button>
          <Button type="small"
            icon="hdd-o"
            onClick={this.handleSaveClicked.bind(this)}>
            Save
          </Button>
        </div>
        {/* hidden input for copy to clipboard functionality */}
        <input type="text"
          className="share-copy"
          readOnly
          ref={(el) => (this.copyEl = el)}
          value={share} />
      </div>
    );
  }

  }
