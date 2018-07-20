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

  onFileChange(event) {
    const fileList = Array.from(event.target.files);
    Promise.all(fileList.map(this.processFile)).then((files) => {
      if (this.props.onChange) {
        this.props.onChange(files);
      }
    });
  }

  processFile(file) {
    // returns a promise that _always_ resolves to
    // { filename, data, error }
    const filename = file.name;
    return new Promise((resolve) => {
      fs.stat(file.path, (err, stats) => {
        if (stats.isDirectory()) {
          return resolve({
            error: 'Please choose a file. If you want to encrypt a directory, gzip it first.'
          });
        }

        if (err) {
          return resolve({ error: 'Something went wrong.' });
        }

        if (stats.size > MAX_FILE_SIZE_BYTES) {
          return resolve({
            error: `File too large. Files up to ${MAX_FILE_SIZE_BYTES / 1000000}mb accepted.`
          });
        }

        fs.readFile(file.path, (error, contents) => {
          if (error) {
            return resolve({ error: 'Something went wrong.' });
          }

          // TODO Look up the mime type here, pipe through reducer

          resolve({data: contents});
        });
      });
    }).then(function(result) {
      return { filename, data: '', error: null, ...result };
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
