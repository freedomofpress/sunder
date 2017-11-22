import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import fs from 'fs';
import path from 'path';
import Button from './Button';


export default class SaveFileButton extends Component {
  static propTypes = {
    contents: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    dialogTitle: PropTypes.string,
    suggestedFileName: PropTypes.string,
    buttonText: PropTypes.string,
    onSaved: PropTypes.func,
    lastDirectory: PropTypes.string,
    saveLastDirectory: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick() {
    const defaultPath = path.join(
      this.props.lastDirectory || '',
      this.props.suggestedFileName);

    remote.dialog.showSaveDialog({
      title: this.props.dialogTitle || 'Save File',
      defaultPath,
    }, this.filePickerCallback.bind(this));
  }

  filePickerCallback(filename) {
    if (!filename) {
      // User didn't pick a file. Noop.
      return;
    }

    this.setState({ save: 'saving', to: filename });

    this.props.saveLastDirectory(path.dirname(filename));

    fs.writeFile(
      filename,
      this.props.contents,
      { mode: '0600' },
      (error) => {
        if (error) {
          return this.setState({ save: 'failed' });
        }

        this.setState({ save: 'succeeded' });
        if (this.props.onSaved) {
          this.props.onSaved(filename);
        }
      });
  }

  render() {
    let text;

    if (this.state.save === 'saving') {
      text = 'Saving';
    } else if (this.state.save === 'failed') {
      text = 'Failed';
    } else if (this.state.save === 'succeeded') {
      text = 'Saved';
    } else {
      text = this.props.buttonText || 'Save';
    }

    return (
      <Button type="default"
        onClick={this.handleClick.bind(this)}
        icon="hdd-o"
        {...this.props}>
        {text}
      </Button>
    );
  }
}
