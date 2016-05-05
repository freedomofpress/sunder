import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeShare } from '../ducks/recover';
import './RecoverStatusShare.scss';


export class RecoverStatusShare extends Component {
  static propTypes = {
    share: PropTypes.shape({
      data: PropTypes.string.isRequired,
      error: PropTypes.string,
    }),
    current: PropTypes.bool,
    dispatch: PropTypes.func,
    index: PropTypes.number
  }

  handleRemove() {
    this.props.dispatch(removeShare(this.props.index));
  }

  render() {
    const { share, current, index } = this.props;
    let className;
    let statusMessage;

    if (current) {
      className = 'current';
      statusMessage = 'Share currently being entered';
    } else if (!share) {
      className = 'incomplete';
      statusMessage = 'Share still needed';
    } else if (share.error) {
      className = 'error';
      statusMessage = `Error: ${share.error}`;
    } else {
      className = 'success';
      statusMessage = `Share #${index + 1} succesfully processed`;
    }

    return (
      <div className={`share-progress-row ${className}`}>
        <span className={`progress-icon ${className}`}>
          <i className=" fa fa-puzzle-piece"
            style={{ transform: `rotate(${90 * this.props.index}deg)` }} />
          <i className="fa fa-close remove-share" onClick={this.handleRemove.bind(this)} />
        </span>
        <span className="share-status-text">{statusMessage}</span>
      </div>
    );
  }
}

export default connect()(RecoverStatusShare);
