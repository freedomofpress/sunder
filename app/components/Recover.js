import React, { Component, PropTypes } from 'react';
import Button from './Button';
import ShareInput from './ShareInput';
import RecoverStatus from './RecoverStatus';
import WorkingIndicator from './WorkingIndicator';
import './Recover.scss';

export default class Recover extends Component {
  static propTypes = {
    shares: PropTypes.array,
    quorum: PropTypes.number,
    inProgress: PropTypes.bool,
    onSubmit: PropTypes.func,
  }

  render() {
    const { quorum, shares, onSubmit } = this.props;
    const numGoodShares = shares.filter((s) => !s.error).length;
    let instructionalContent;

    if (shares.length > 0) {
      instructionalContent = '';
    } else {
      instructionalContent = 'To recover a secret, start by providing ' +
        'one of the secret shares. SecretShare will then prompt you for the ' +
        'remaining shares needed to recover the shared secret.';
    }

    let action;
    if (numGoodShares >= quorum) {
      action = (
        <div className="align-center recover-action">
          <Button type="xlarge"
            onClick={onSubmit}
            icon="cube">
            Recover
          </Button>
        </div>
      );
    } else {
      action = (
        <div className="recover-action">
          <ShareInput />
          {instructionalContent &&
            <p className="recover-explanation">{instructionalContent}</p>}
        </div>
      );
    }

    return (
      <div className="container flex-column recover">
        {action}
        <RecoverStatus quorum={quorum} shares={shares} />
        {this.props.inProgress && <WorkingIndicator />}
      </div>
    );
  }
}
