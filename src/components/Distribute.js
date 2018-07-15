import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SaveAllButton from './SaveAllButton';
import ShareRow from './ShareRow';
import Panel from './Panel';
import Info from './Info';
import './Distribute.scss';

export default class Distribute extends Component {
  static propTypes = {
    shares: PropTypes.array,
    quorum: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = { saveStatus: [] };
  }

  onSaved(index, saveStatus) {
    this.setState((state) => {
      state.saveStatus[index] = saveStatus;
    });
  }

  onSavedAll(saveStatuses) {
    this.setState({
      saveStatus: saveStatuses
    });
  }

  render() {
    const { quorum, shares } = this.props;

    const shareRows = this.props.shares.map((share, index) => (
      <ShareRow key={share}
        shareNr={index + 1}
        share={share}
        saved={this.state.saveStatus[index]}
        onSaved={this.onSaved.bind(this, index)} />
    ));

    return (
      <div className="container distribute-container flex-column">
        <Panel title="Secret Shares">
          <div className="shares-table">
            {shareRows}
          </div>
          <SaveAllButton
            contents={shares}
            onSavedAll={this.onSavedAll.bind(this)} />
        </Panel>
        <Info>
          {`Remember: you need ${quorum} out of ${shares.length} shares to recover the secret.`}
        </Info>
      </div>
    );
  }
}
