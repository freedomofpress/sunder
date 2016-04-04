import React, { Component, PropTypes } from 'react';
import FileInput from './FileInput';
import './SecretEntry.scss';


export default class SecretEntry extends Component {
  static propTypes = {
    // redux-form field
    field: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { entryMode: 'text' };
  }

  onModeChange(event) {
    this.setState({ entryMode: event.target.value });
  }

  render() {
    const { field } = this.props;
    const hasError = field.touched && field.invalid;

    let fieldEl;
    if (this.state.entryMode === 'text') {
      fieldEl = (
        <textarea className="secret-entry-input"
          {...field}>
        </textarea>
      );
    } else {
      fieldEl = <FileInput field={field} />;
    }

    return (
      <div className="flex-column">
        <div className="secret-entry-mode-select-container">
          <select defaultValue={this.state.entryMode}
            onChange={this.onModeChange.bind(this)}>
            <option value="text">As Text</option>
            <option value="file">From File</option>
          </select>
        </div>
        <div className={`field-container secret-entry-input-container
            flex-column ${hasError ? 'has-error' : ''}`}>
          {fieldEl}
          {hasError && <label className="error-label">{field.error}</label>}
        </div>
      </div>
    );
  }
}
