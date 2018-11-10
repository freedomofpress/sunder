import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/Button';
import fs from 'fs';
import path from 'path';
const { dialog } = require('electron').remote

let fileCounter = 0;
const MAX_FILE_SIZE_BYTES = 1000000;

export default class FileInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    allowMultiple: PropTypes.bool
  }

  constructor(props) {
    super(props);
    // Generate a unique id to use as the field name
    this.fileInputId = `file-input-${fileCounter++}`;
  }

  onFileSelection() {
    let options = {properties: ['openfile']}
    if (this.props.allowMultiple) options.properties.push('multiSelections');
    const fileList = dialog.showOpenDialog(options);
    if (fileList === undefined) return;

    Promise.all(fileList.map(this.processFile)).then((files) => {
      if (this.props.onChange) {
        this.props.onChange(files);
      }
    });
  }

  processFile(filePath) {
    // returns a promise that _always_ resolves to
    // { filename, data, error }
    const filename = path.basename(filePath);
    return new Promise((resolve) => {
      fs.stat(filePath, (err, stats) => {
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

        fs.readFile(filePath, (error, contents) => {
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
        <Button className="file-button" type="default" icon="hdd-o" onClick={this.onFileSelection.bind(this)}>
          {this.props.label || 'Select File'}
        </Button>
      </div>
    );
  }
}
