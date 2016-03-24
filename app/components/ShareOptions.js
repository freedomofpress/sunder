import React, { Component, PropTypes } from 'react';
import './ShareOptions.scss';


export default class ShareOptions extends Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  render() {
    return (
      <div className="share-options">
        <div className="flex-row">
          <input className="labeled-input"
            type="number"
            pattern="[0-9]*"
            onChange={(event) => {
              this.props.onChange('shares', parseInt(event.target.value, 10));
            }}
            name="shares" />
          <label className="label-input">Total shares</label>
        </div>
        <div className="flex-row">
          <input className="labeled-input"
            type="number"
            pattern="[0-9]*"
            onChange={(event) => {
              this.props.onChange('quorum', parseInt(event.target.value, 10));
            }}
            name="quorum" />
          <label className="input-label">
            Shares needed to recover the secret
          </label>
        </div>
      </div>
    );
  }
}
