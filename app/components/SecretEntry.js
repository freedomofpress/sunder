import React, { Component, PropTypes } from 'react';
import './SecretEntry.scss';


export default class SecretEntry extends Component {
  static propTypes = {}

  render() {
    return (
      <div className="flex-column">
        <div className="secret-entry-mode-select-container">
          <select defaultValue="text">
            <option value="text">As Text</option>
            <option value="file">From File</option>
          </select>
        </div>
        <div className="secret-entry-input-container flex-column">
          <textarea className="secret-entry-input"></textarea>
        </div>
      </div>
    );
  }
}
