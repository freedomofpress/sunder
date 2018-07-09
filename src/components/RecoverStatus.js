import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecoverStatusShare from './RecoverStatusShare';
import { countGoodShares, countBadShares } from 'src/lib/utilities';
import './RecoverStatus.scss';


export default class RecoverStatus extends Component {
  static propTypes = {
    shares: PropTypes.array.isRequired,
    quorum: PropTypes.number
  }

  render() {
    const shareIcons = [];
    const { shares } = this.props;
    let quorum = this.props.quorum;
    quorum = quorum || 0;
    const numBadShares = countBadShares(shares);
    const numGoodShares = countGoodShares(shares);
    const numToDisplay = Math.max(0, quorum + numBadShares, shares.length);

    for (let i = 0; i < numToDisplay; i++) {
      shareIcons.push(
        <RecoverStatusShare share={shares[i]}
          current={i === shares.length}
          key={i}
          index={i} />
      );
    }

    let statusMessage = '';
    if (quorum && numGoodShares >= quorum) {
      let messageText = '';
      if(numBadShares) {
        messageText = <span><strong>{numGoodShares} </strong>shares entered! Remove malformed shares to continue.</span>
      } else {
        messageText =  <span><strong>{numGoodShares} </strong>shares entered! Click the giant button.</span>
      }

      statusMessage = (
        <h3 className="recover-status-message">
          {messageText}
        </h3>
      );
    } else if (quorum) {
      statusMessage = (
        <h3 className="recover-status-message">
          <span className="accent">{shares.length - numBadShares}</span>
          {' out of '}
          <span className="accent">{quorum}</span>
          {' valid shares entered.'}
        </h3>
      );
    }

    return (
      <div className="recover-status">
        {statusMessage}
        <div className="recover-status-list">
          {shareIcons}
        </div>
      </div>
    );
  }
}
