import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CopyButton from './CopyButton';
import SaveFileButton from './SaveFileButton';
import './ShareRow.scss';

export default class ShareRow extends Component {
  static propTypes = {
    share: PropTypes.string,
    shareNr: PropTypes.number,
    saved: PropTypes.shape({
      success: PropTypes.bool,
      message: PropTypes.string,
    }),
    onSaved: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCopied() {
    this.setState({ copied: true });
  }

  render() {
    const { share, shareNr, saved } = this.props;
    let savedIndicator = '';

    if (saved) {
      savedIndicator = (
        <span className={`tooltipped bottom-tooltip right-tooltip ${saved.success ? '' : 'error'}`}
          data-tooltip={saved.message}>
          {saved.success ? 'saved' : 'save failed'}
        </span>
      );
    }

    return (
      <div className="share-row" key={share} id={`share-${shareNr}`}>
        <div className="share-cell share-value">
          {`Share #${shareNr}`}
          <span className="share-status">
            {this.state.copied ? 'copied' : ''}
            {this.state.copied && this.props.saved ? ', ' : ''}
            {savedIndicator}
          </span>
        </div>
        <div className="share-cell share-actions">
          <CopyButton type="small"
            targetText={share}
            onCopied={this.handleCopied.bind(this)} />
          <SaveFileButton type="small"
            contents={share}
            isSaved={saved && saved.success}
            onSaved={this.props.onSaved}
            saveOptions={{
              shareNr: shareNr,
            }} />
        </div>
      </div>
    );
  }
}
