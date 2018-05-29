import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './ShareRow.scss';

export default class ShareRow extends Component {
  static propTypes = {
    shareNumber: PropTypes.number.isRequired,
    isCopied: PropTypes.bool,
    saveStatus: PropTypes.shape({
      text: PropTypes.string,
      toolTip: PropTypes.string,
      isError: PropTypes.bool,
    }),
    onClickCopy: PropTypes.func.isRequired,
    onClickSave: PropTypes.func.isRequired,
  }

  render() {
    const { shareNumber, saveStatus } = this.props;
    let statusText = '';

    if (saveStatus) {
      statusText = (
        <span className={`share-status ${(saveStatus.isError ? 'error' : '')}`}>
          <span className="tooltipped bottom-tooltip right-tooltip"
            data-tooltip={saveStatus.toolTip}>
            {saveStatus.text}
          </span>
        </span>
      );
    }

    return (
      <div className="share-row" id={`share-${shareNumber}`}>
        <div className="share-cell share-value">
          {`Share #${shareNumber}`}
          {statusText}
        </div>
        <div className="share-cell share-actions">
          <Button className="copy"
            type="small"
            icon="clipboard"
            onClick={this.props.onClickCopy}>
            {this.props.isCopied ? 'Copied' : 'Copy'}
          </Button>
          <Button className="save"
            type="small"
            icon="hdd-o"
            onClick={this.props.onClickSave}>
            {saveStatus && !saveStatus.isError ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    );
  }
}
