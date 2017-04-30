import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ShareInput from './ShareInput';
import RecoverStatus from './RecoverStatus';
import PuzzleIcon from './PuzzleIcon';
import { countGoodShares } from 'src/lib/utilities';
import './Recover.scss';

export default class Recover extends Component {
  static propTypes = {
    shares: PropTypes.array,
    quorum: PropTypes.number,
    inProgress: PropTypes.bool,
    onSubmit: PropTypes.func,
    error: PropTypes.string,
    unrecoverable: PropTypes.bool,
    mismatch: PropTypes.bool,
    onReset: PropTypes.func,
    onShareAdded: PropTypes.func
  }

  render() {
    const { quorum, shares, onSubmit, error, onReset, onShareAdded, unrecoverable, mismatch } = this.props;
    const numGoodShares = countGoodShares(shares);
    let instructionalContent;

    if (shares.length > 0) {
      instructionalContent = '';
    } else {
      instructionalContent = 'To recover a secret, start by providing ' +
        'one of the secret shares. Sunder will then prompt you for the ' +
        'remaining shares needed to recover the shared secret.';
    }

    const shouldDisplayStatus = !unrecoverable && shares.length > 0 && (!quorum || numGoodShares < quorum || mismatch);

    let action;
    if (error && unrecoverable) {
      action = (
        <div className="align-center reset-action">
          <p>
            Sorry, something went wrong. Received error message:
            <span className="recover-error-message"> {error}</span>
          </p>
          <Button type="default"
            onClick={onReset}>
            Reset Recovery
          </Button>
        </div>
      );
    } else if (!mismatch && numGoodShares >= quorum) {
      action = (
        <div className="recover-action align-center">
          <h1 className="accent">All shares entered!</h1>
          <Button type="xlarge"
            onClick={onSubmit}
            id="finish-recovery"
            icon={<PuzzleIcon />}>
            Recover
          </Button>
          <p> Click the giant button to recover.</p>
        </div>
      );
    } else {
      action = (
        <div className="recover-action">
          <ShareInput numEnteredShares={numGoodShares}
            onSubmit={onShareAdded} />
          {instructionalContent &&
            <p className="recover-explanation">{instructionalContent}</p>}
        </div>
      );
    }

    return (
      <div className="container flex-column recover">
        {action}
        {shouldDisplayStatus && <RecoverStatus quorum={quorum} shares={shares} />}
      </div>
    );
  }
}
