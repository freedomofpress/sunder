import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import CopyButton from './CopyButton';
import SaveFileButton from './SaveFileButton';
import Modal from './Modal';
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

  toggleViewing() {
    this.setState({ shown: !this.state.shown });
  }

  handleCopied() {
    this.setState({ copied: true });
  }

  handleSaved(filename) {
    this.setState({ saved: filename });
  }

  render() {
    const { share, index } = this.props;
    const modal = (
      <Modal onClose={this.toggleViewing.bind(this)}>
        <textarea className="secret-view" value={this.props.share} readOnly>
        </textarea>
        <div className="actions-row align-center">
          <Button type="default"
            onClick={this.toggleViewing.bind(this)}
            icon="eye-slash">
            Hide
          </Button>
        </div>
      </Modal>
    );

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
          <Button type="small"
            icon="eye"
            onClick={this.toggleViewing.bind(this)}>
            View
          </Button>
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
        {this.state.shown && modal}
      </div>
    );
  }
}
