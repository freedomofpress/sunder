import React, { Component, PropTypes } from 'react';
import { remote } from 'electron';
import fs from 'fs';
import Button from './Button';


export default class SaveFileButton extends Component {
  static propTypes = {
    contents: PropTypes.string,
    dialogTitle: PropTypes.string,
    defaultPath: PropTypes.string,
    onSaved: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick() {
    remote.dialog.showSaveDialog({
      title: this.props.dialogTitle || 'Save File',
      defaultPath: this.props.defaultPath,
    }, this.filePickerCallback.bind(this));
  }

  filePickerCallback(filename) {
    if (!filename) {
      // User didn't pick a file. Noop.
      return;
    }

    this.setState({ save: 'saving', to: filename });

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
      text = 'Save';
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
