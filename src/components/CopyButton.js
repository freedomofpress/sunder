import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';


export default class CopyButton extends Component {
  static propTypes = {
    targetText: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    onCopied: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClicked() {
    let successful;
    this.copyEl.setSelectionRange(0, this.copyEl.value.length);

    try {
      successful = document.execCommand('copy');
    } catch (e) {
      successful = false;
    }

    if (successful) {
      this.setState({ copied: 'successful' });
      if (this.props.onCopied) {
        this.props.onCopied();
      }
    } else {
      this.setState({ copied: 'error' });
    }

    window.setTimeout(() => this.setState({ copied: null }), 5000);
  }


  render() {
    const copied = this.state.copied;
    let copyText;

    if (copied === 'successful') {
      copyText = 'Copied';
    } else if (copied === 'error') {
      copyText = 'Copy failed';
    } else {
      copyText = this.props.buttonText || 'Copy';
    }

    return (
      <Button type="default"
        icon="clipboard"
        onClick={this.handleClicked.bind(this)}
        {...this.props}>
        {copyText}
        {/* hidden input for copy to clipboard functionality */}
        <input type="text"
          style={ { position: 'absolute', top: '-10000px', left: '-10000px' } }
          readOnly
          ref={(el) => (this.copyEl = el)}
          value={this.props.targetText} />
      </Button>

    );
  }
}
