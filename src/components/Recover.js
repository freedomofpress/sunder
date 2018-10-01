import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ShareInput from './ShareInput';
import RecoverStatus from './RecoverStatus';
import Icon from './Icon';
import { countGoodShares, sharesMismatched, countBadShares } from 'src/lib/utilities';
import './Recover.scss';

export default class Recover extends Component {
  static propTypes = {
    shares: PropTypes.array,
    quorum: PropTypes.number,
    inProgress: PropTypes.bool,
    onSubmit: PropTypes.func,
    error: PropTypes.string,
    unrecoverable: PropTypes.bool,
    onReset: PropTypes.func,
    onSharesAdded: PropTypes.func
  }

  render() {
    const { quorum, shares, onSubmit, error, onReset, onSharesAdded, unrecoverable } = this.props;
    const numGoodShares = countGoodShares(shares);
    const numBadShares = countBadShares(shares);
    let instructionalContent;

    if (shares.length > 0) {
      instructionalContent = '';
    } else {
      instructionalContent = 'To recover a secret, start by providing ' +
        'one of the secret shares. Sunder will then prompt you for the ' +
        'remaining shares needed to recover the shared secret.';
    }

    const hasShares = shares.length > 0;
    const mismatchExists = sharesMismatched(shares);
    const shouldDisplayStatus = !unrecoverable && hasShares &&
      (!quorum || numGoodShares < quorum || mismatchExists || numBadShares);

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
    } else if (!mismatchExists && numGoodShares >= quorum && !numBadShares) {
      action = (
        <div className="recover-action align-center">
          <h1>All shares entered!</h1>
          <Button type="xlarge"
            onClick={onSubmit}
            id="finish-recovery"
            icon={<Icon type="recover" />}>
            Recover
          </Button>
          <p> Click the giant button to recover.</p>
        </div>
      );
    } else {
      action = (
        <div className="recover-action">
          <ShareInput
            numEnteredShares={numGoodShares}
            shares={shares}
            onSubmit={onSharesAdded} />
          {instructionalContent &&
            <p className="recover-explanation">{instructionalContent}</p>}
        </div>
      );
    }
    
    return (
      <div className="container flex-column recover">
        {action}
        {shouldDisplayStatus ? <RecoverStatus quorum={quorum} shares={shares} /> : null}
      </div>
    );
  }
}
