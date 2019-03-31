import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberField from './NumberField';
import './SplitOptions.scss';


export default class SplitOptions extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    // reduxForm fields
    quorum: PropTypes.object,
    shares: PropTypes.object
  }

  render() {
    const { shares, quorum } = this.props;
    let statusMessage;
    const statusEnding = ' shares needed to recover secret.';

    if (quorum.input.value && shares.input.value) {
      statusMessage = (
        <span>
          <strong>{quorum.input.value}</strong>{' of '}
          <strong>{shares.input.value}</strong>{statusEnding}
        </span>
      );
    } else if (quorum.input.value) {
      statusMessage = (
        <span><strong>{quorum.input.value}</strong>{statusEnding}</span>
      );
    } else {
      statusMessage = 'How many shares should be needed to recover the secret?';
    }

    return (
      <div>
        <div className="split-options">
          <NumberField field={quorum.input}
            label="Shares needed to recover the secret" />
          <NumberField field={shares.input} label="Total number of shares" />
        </div>
        <div className="split-status-message">{statusMessage}</div>
      </div>
    );
  }
}
