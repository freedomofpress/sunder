import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';


export default class ErrorMessage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  render() {
    const className = this.props.className || '';
    if (!this.props.children) {
      return <span></span>;
    }

    return (
      <div className={`error-message ${className}`}>
        <i className="fa fa-exclamation-triangle" />{this.props.children}
      </div>
    );
  }
}
