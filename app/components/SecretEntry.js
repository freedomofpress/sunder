import React, { Component, PropTypes } from 'react';
import './SecretEntry.scss';


export default class SecretEntry extends Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  render() {
    return (
      <div className="flex-column">
        <div className="secret-entry-mode-select-container">
          <select defaultValue="text"
            onChange={(event) => {
              this.props.onChange('entryMode', event.target.value);
            }}>
            <option value="text">As Text</option>
            <option value="file">From File</option>
          </select>
        </div>
        <div className="secret-entry-input-container flex-column">
          <textarea className="secret-entry-input"
            onChange={(event) => {
              this.props.onChange('secret', event.target.value);
            }}>
          </textarea>
        </div>
      </div>
    );
  }
}
