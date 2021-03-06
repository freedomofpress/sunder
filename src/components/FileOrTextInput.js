import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileInput from './FileInput';
import './FileOrTextInput.scss';

// Anything over 50 kb we won't try to print.
export const MAX_DISPLAY_SIZE_BYTES = 50000;

export default class FileOrTextInput extends Component {
  static propTypes = {
    // redux-form field
    field: PropTypes.object,
    defaultMode: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = { entryMode: props.defaultMode || 'text', revealed: true };
  }

  onModeChange(event) {
    this.setState({ entryMode: event.target.value });
  }

  onRevealChange(event) {
    this.setState({ revealed: !event.target.checked });
  }

  clearData() {
    this.props.input.onChange('');
    this.setState({ filename: undefined, error: undefined });
  }

  onFileChange(files) {
    const file = files[0];

    if (file.error) {
      return this.onError(file);
    }

    this.setState({ filename: file.filename, error: undefined });
    if (this.props.input) {
      this.props.input.onChange(file.data, file.filename);
    }
  }

  onError(event) {
    this.setState({error: event.error});
  }

  render() {
    const { input } = this.props;
    const hasError = input.touched && input.invalid;
    const { entryMode } = this.state;

    const tooLargeToDisplay = input.value && input.value.length * 2 > MAX_DISPLAY_SIZE_BYTES;
    let textField;
    if (tooLargeToDisplay) {
      textField = (
        <div className={`no-display-message ${entryMode === 'text' ? '' : 'hidden'}`}>
          {"This is too large to display (don't worry, we can still use it)."}
          <a onClick={this.clearData.bind(this)}> Clear Data</a>
        </div>
      );
    } else {
      // The odd concatenation on the className is because of https://github.com/airbnb/enzyme/issues/347
      textField = (
        <textarea className={`file-or-text-input ${this.state.revealed ? 'revealed' : ''}`
            + ` ${entryMode === 'text' ? '' : 'hidden'}`}
          {...input}>
        </textarea>
      );
    }

    const revealCheckbox = (
      <label className={`reveal-options ${tooLargeToDisplay ? 'hidden' : ''}`}>
        <input type="checkbox"
          onChange={this.onRevealChange.bind(this)}
          checked={!this.state.revealed} /> Hide secret?
      </label>
    );

    return (
      <div className="flex-column file-or-text">
        <div className="file-or-text-mode-select-container">
          <select defaultValue={this.state.entryMode}
            onChange={this.onModeChange.bind(this)}>
            <option value="text">As Text</option>
            <option value="file">From File</option>
          </select>
          {this.state.entryMode === 'text' && revealCheckbox}
        </div>
        <div className={`field-container file-or-text-input-container
            flex-column ${hasError ? 'has-error' : ''}`}>
          {textField}
          <div className={entryMode === 'file' ? '' : 'hidden'}>
            <FileInput
              label={this.state.filename ? 'Change file' : null}
              onChange={this.onFileChange.bind(this)}
            />
            {this.state.filename && <div className="filename">{this.state.filename}</div>}
            {this.state.error && <div className="file-error">{this.state.error}</div>}
          </div>
          {hasError && <label className="error-label">{field.error}</label>}
        </div>
      </div>
    );
  }
}
