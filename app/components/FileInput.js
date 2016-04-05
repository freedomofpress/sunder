import React, { Component, PropTypes } from 'react';
import fs from 'fs';

export default class FileInput extends Component {
  static propTypes = {
    field: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    fs.readFile(file.path, (err, contents) => {
      if (err) {
        // TODO: handle this
        return console.log(err);
      }

      this.props.field.onChange(contents.toString());
      this.setState({ filename: file.name });
    });
  }

  render() {
    return <input type="file" onChange={this.onFileChange.bind(this)} />;
  }
}
