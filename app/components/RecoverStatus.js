import React, { Component, PropTypes } from 'react';
import RecoverStatusShare from './RecoverStatusShare';
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

    for (let i = 0; i < quorum; i++) {
      shareIcons.push(
        <RecoverStatusShare share={shares[i]}
          current={i === shares.length}
          key={i}
          index={i} />
      );
    }

    return (
      <div className="recover-status">
        {shareIcons}
      </div>
    );
  }
}
