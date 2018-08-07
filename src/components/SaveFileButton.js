import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveFile } from 'src/lib/save';
import Button from './Button';


export default class SaveFileButton extends Component {
  static propTypes = {
    contents: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    saveOptions: PropTypes.object,
    isSaved: PropTypes.bool,
    onSaved: PropTypes.func,
  }

  handleClick() {
    saveFile(
      this.props.contents,
      this.props.saveOptions,
      this.props.onSaved
    );
  }

  render() {
    return (
      <Button
        onClick={this.handleClick.bind(this)}
        icon="hdd-o"
        {...this.props}>
        {this.props.isSaved ? "Saved" : (this.props.buttonText || "Save") }
      </Button>
    );
  }

}
