import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clipboard } from 'electron';

import Button from './Button.js';
import './PasteButton.scss';


export default class PasteButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  }

  handleClicked() {
    const value = clipboard.readText();

    this.props.onClick(value);
  }

  render() {
    return (
      <Button type="default"
        className="paste"
        icon="clipboard"
        disabled={this.props.disabled}
        onClick={this.handleClicked.bind(this)}>
        Copy from clipboard
      </Button>
    );
  }
}
