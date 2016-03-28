import React, { Component, PropTypes } from 'react';
import Button from './Button';
import ShareInput from './ShareInput';
import RecoverStatus from './RecoverStatus';
import RecoverRow from './RecoverRow';
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
      instructionalContent = (<span>
        Recovering shared secret... <strong>{numGoodShares}/{quorum}</strong> provided
      </span>);
    } else {
      instructionalContent = 'To recover a shared secret start by providing ' +
        'one of the secret shares. SecretShare will then prompt you for the ' +
        'remaining shares needed to recover the shared secret.';
    }

    const enteredShares = shares.map((share, index) =>
      <RecoverRow share={share} key={share.data} index={index} />
    );

    let action;
    if (numGoodShares >= quorum) {
      action = (
        <div className="align-center">
          <Button type="xlarge"
            onClick={onSubmit}
            icon="cube">
            Recover
          </Button>
        </div>
      );
    } else {
      action = (
        <div>
          <ShareInput />
          <div className="recover-explanation">{instructionalContent}</div>
        </div>
      );
    }

    return (
      <div className="container flex-column">
        <RecoverStatus quorum={quorum} shares={shares} />
        {shares.length > 0 && <div className="entered-shares">{enteredShares}</div>}
        {action}
      </div>
    );
  }
}
