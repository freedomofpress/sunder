import React, { Component, PropTypes } from 'react';
import './ShareOptions.scss';


export default class ShareOptions extends Component {
  static propTypes = {}

  render() {
    return (
      <div className="share-options">
        <div className="flex-row">
          <input className="labeled-input"
            type="number"
            pattern="[0-9]*"
            name="shares" />
          <label className="label-input">Total shares</label>
        </div>
        <div className="flex-row">
          <input className="labeled-input" type="number" pattern="[0-9]*" name="quorum" />
          <label className="input-label">Shares needed to recover the secret</label>
        </div>
      </div>
    );
  }
}
