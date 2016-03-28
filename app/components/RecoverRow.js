import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeShare } from '../ducks/recover';
import './RecoverRow.scss';


export class RecoverRow extends Component {
  static propTypes = {
    share: PropTypes.shape({
      data: PropTypes.string.isRequired,
      error: PropTypes.string,
    }),
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func
  }

  handleRemove() {
    this.props.dispatch(removeShare(this.props.index));
  }

  render() {
    const { share, index } = this.props;
    const className = share.error ? 'error' : 'success';
    return (<div className={`recover-row ${className}`}>
      <i className="fa fa-cube" /> Share #{index + 1}{' '}
      <i className="fa fa-close" onClick={this.handleRemove.bind(this)} />
    </div>);
  }
}

export default connect()(RecoverRow);
