import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/Button';
import fs from 'fs';

let fileCounter = 0;
const MAX_FILE_SIZE_BYTES = 1000000;

export default class FileInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string
  }

  constructor(props) {
    super(props);
    // Generate a unique id to use as the field name
    this.fileInputId = `file-input-${fileCounter++}`;
  }

  onError(event) {
    if (this.props.onError) {
      this.props.onError(event);
    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    fs.stat(file.path, (err, stats) => {
      if (stats.isDirectory()) {
        return this.onError({
          error: 'Please choose a file. If you want to encrypt a directory, gzip it first.'
        });
      }

      if (err) {
        return this.onError({ error: 'Something went wrong. ' });
      }

      if (stats.size > MAX_FILE_SIZE_BYTES) {
        return this.onError({
          error: `File too large. Files up to ${MAX_FILE_SIZE_BYTES / 1000000}mb accepted.`
        }):
      }

      fs.readFile(file.path, (error, contents) => {
        if (error) {
          return this.onError({ error: 'Something went wrong.' });
        }

        // TODO Look up the mime type here, pipe through reducer
        if (this.props.onChange) {
          this.onChange({ data: contents, filename: file.name });
        }

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
            {this.props.label || 'Select File'}
          </Button>
        </label>
      </div>
    );
  }
}
