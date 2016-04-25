import React, { Component, PropTypes } from 'react';
import FileInput from './FileInput';
import './SecretEntry.scss';

// Anything over 50 kb we won't try to print.
export const MAX_DISPLAY_SIZE_BYTES = 50000;

export default class SecretEntry extends Component {
  static propTypes = {
    // redux-form field
    field: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { entryMode: 'text', revealed: false };
  }

  onModeChange(event) {
    // Set revealed to false on any mode change so secret file contents aren't
    // unexpectedly revealed.
    this.setState({ entryMode: event.target.value, revealed: false });
  }

  onRevealChange(event) {
    this.setState({ revealed: event.target.checked });
  }

  clearSecret() {
    this.props.field.onChange('');
  }

  render() {
    const { field } = this.props;
    const hasError = field.touched && field.invalid;
    const { entryMode } = this.state;

    const tooLargeToDisplay = field.value && field.value.length * 2 > MAX_DISPLAY_SIZE_BYTES;
    let textField;
    if (tooLargeToDisplay) {
      textField = (
        <div className={`no-display-message ${entryMode === 'text' ? '' : 'hidden'}`}>
          {"This secret is too large to display (don't worry, we can still encrypt it)."}
          <a onClick={this.clearSecret.bind(this)}> Clear Secret</a>
        </div>
      );
    } else {
      // The odd concatenation on the className is because of https://github.com/airbnb/enzyme/issues/347
      textField = (
        <textarea className={`secret-entry-input ${this.state.revealed ? 'revealed' : ''}`
            + ` ${entryMode === 'text' ? '' : 'hidden'}`}
          {...field}>
        </textarea>
      );
    }

    const revealCheckbox = (
      <label className={`reveal-options ${tooLargeToDisplay ? 'hidden' : ''}`}>
        <input type="checkbox"
          onChange={this.onRevealChange.bind(this)}
          checked={this.state.revealed} /> Reveal secret?
      </label>
    );

    return (
      <div className="flex-column secret-entry">
        <div className="secret-entry-mode-select-container">
          <select defaultValue={this.state.entryMode}
            onChange={this.onModeChange.bind(this)}>
            <option value="text">As Text</option>
            <option value="file">From File</option>
          </select>
          {this.state.entryMode === 'text' && revealCheckbox}
        </div>
        <div className={`field-container secret-entry-input-container
            flex-column ${hasError ? 'has-error' : ''}`}>
          {textField}
          <FileInput className={entryMode === 'file' ? '' : 'hidden'} field={field} />
          {hasError && <label className="error-label">{field.error}</label>}
        </div>
      </div>
    );
  }
}
