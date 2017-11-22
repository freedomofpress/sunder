import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CopyButton from './CopyButton';
import SaveFileButton from './SaveFileButton';
import './ShareRow.scss';

export default class ShareRow extends Component {
  static propTypes = {
    share: PropTypes.string,
    index: PropTypes.number,
    lastDirectory: PropTypes.string,
    saveLastDirectory: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCopied() {
    this.setState({ copied: true });
  }

  handleSaved(filename) {
    this.setState({ saved: filename });
  }

  render() {
    const { share, index } = this.props;
    let savedIndicator = '';

    if (this.state.saved) {
      savedIndicator = (
        <span className="tooltipped bottom-tooltip right-tooltip"
          data-tooltip={this.state.saved}>
          saved
        </span>
      );
    }

    return (
      <div className="share-row" key={share} id={`share-${index}`}>
        <div className="share-cell share-value">
          {`Share #${index}`}
          <span className="share-status">
            {this.state.copied ? 'copied' : ''}
            {this.state.copied && this.state.saved ? ', ' : ''}
            {savedIndicator}
          </span>
        </div>
        <div className="share-cell share-actions">
          <CopyButton type="small"
            targetText={share}
            onCopied={this.handleCopied.bind(this)} />
          <SaveFileButton contents={share}
            type="small"
            onSaved={this.handleSaved.bind(this)}
            lastDirectory={this.props.lastDirectory}
            saveLastDirectory={this.props.saveLastDirectory}
            suggestedFileName={`secret-shard-${index}.txt`} />
        </div>
      </div>
    );
  }
}
