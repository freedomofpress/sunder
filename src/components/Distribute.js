import React, { Component, PropTypes } from 'react';
import ShareRow from './ShareRow';
import Panel from './Panel';
import Info from './Info';
import './Distribute.scss';

export default class Distribute extends Component {
  static propTypes = {
    shares: PropTypes.array,
    quorum: PropTypes.number
  }

  render() {
    const { quorum, shares } = this.props;
    const shareRows = this.props.shares.map((share, index) => (
      <ShareRow key={share} index={index + 1} share={share} />
    ));

    return (
      <div className="container distribute-container flex-column">
        <Panel title="Secret Shares">
          <div className="shares-table">
            {shareRows}
          </div>
        </Panel>
        <Info>
          {`Remember: you need ${quorum} out of ${shares.length} shares to recover the secret.`}
        </Info>
      </div>
    );
  }
}
