import React, { Component, PropTypes } from 'react';
import Button from 'app/components/Button';
import fs from 'fs';

let fileCounter = 0;
const MAX_FILE_SIZE_BYTES = 1000000;

export default class FileInput extends Component {
  static propTypes = {
    field: PropTypes.object,
    className: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {};
    // Generate a unique id to use as the field name
    this.fileInputId = `file-input-${fileCounter++}`;
  }

  componentWillReceiveProps(nextProps) {
    // This is a bit of a hack to keep the filename in sync with the text field.
    // If the user clears or modifies the file contents in the text input we
    // don't want to show that file as still being chosen. This works because
    // the filename is set AFTER the value of the field in `onFileChange`.
    if (nextProps.field.value !== this.props.field.value) {
      this.setState({ filename: undefined, error: undefined });
    }
  }

  onFileChange(event) {
    this.setState({ error: false });
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    fs.stat(file.path, (err, stats) => {
      if (stats.isDirectory()) {
        return this.setState({
          error: 'Please choose a file. If you want to encrypt a directory, gzip it first.'
        });
      }

      if (err) {
        return this.setState({ error: 'Something went wrong.' });
      }


      if (stats.size > MAX_FILE_SIZE_BYTES) {
        return this.setState({
          error: `File too large. Files up to ${MAX_FILE_SIZE_BYTES / 1000000}mb accepted.`
        });
      }

      fs.readFile(file.path, (error, contents) => {
        if (error) {
          return this.setState({ error: 'Something went wrong.' });
        }

        // The order of these statements is important because of `componentWillReceiveProps`
        this.props.field.onChange(contents.toString());
        this.setState({ filename: file.name });
      });
    });
  }

  render() {
    return (
      <div className={`file-input-container ${this.props.className}`}>
        <input name={this.fileInputId}
          id={this.fileInputId}
          type="file"
          onChange={this.onFileChange.bind(this)} />
        <label htmlFor={this.fileInputId}>
          <Button className="file-button" type="default" icon="hdd-o">
            {this.state.filename ? 'Change File' : 'Select File'}
          </Button>
        </label>
        {this.state.filename && <div className="filename">{this.state.filename}</div>}
        {this.state.error && <div className="file-error">{this.state.error}</div>}
      </div>
    );
  }
}
