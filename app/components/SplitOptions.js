import React, { Component, PropTypes } from 'react';
import NumberField from './NumberField';
import './SplitOptions.scss';


export default class SplitOptions extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    // reduxForm fields
    quorumField: PropTypes.object,
    sharesField: PropTypes.object
  }

  render() {
    const { sharesField, quorumField } = this.props;
    let statusMessage;
    const statusEnding = ' shares need to recover secret.';

    if (quorumField.value && sharesField.value) {
      statusMessage = (
        <span>
          <strong>{quorumField.value}</strong>{' of '}
          <strong>{sharesField.value}</strong>{statusEnding}
        </span>
      );
    } else if (quorumField.value) {
      statusMessage = (
        <span><strong>{quorumField.value}</strong>{statusEnding}</span>
      );
    } else {
      statusMessage = '';
    }

    return (
      <div>
        <div className="split-options">
          <NumberField field={quorumField}
            label="Shares needed to recover the secret" />
          <NumberField field={sharesField} label="Total number of shares" />
        </div>
        <div className="split-status-message">{statusMessage}</div>
      </div>
    );
  }
}
