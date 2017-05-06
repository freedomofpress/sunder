import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const statusEnding = ' shares needed to recover secret.';

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
      statusMessage = 'How many shares should be needed to recover the secret?';
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
