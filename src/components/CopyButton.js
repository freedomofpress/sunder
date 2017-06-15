import React, { Component } from 'react';
const {clipboard} = require('electron');
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
    clipboard.writeText(this.props.targetText);

    this.setState({ copied: 'successful' });
    if (this.props.onCopied) {
      this.props.onCopied();
    }

    window.setTimeout(() => this.setState({ copied: null }), 5000);
  }


  render() {
    const copied = this.state.copied;
    let copyText;

    if (copied === 'successful') {
      copyText = 'Copied';
    } else {
      copyText = this.props.buttonText || 'Copy';
    }

    return (
      <Button type="default"
        className="copy"
        icon="clipboard"
        onClick={this.handleClicked.bind(this)}
        {...this.props}>
        {copyText}
      </Button>
    );
  }
}
