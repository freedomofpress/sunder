import React, { Component, PropTypes } from 'react';
import './Info.scss';


export default class Info extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  render() {
    const className = this.props.className || '';
    return (
      <div className={`flex-row info align-center ${className}`}>
        <i className="fa fa-info-circle" />{this.props.children}
      </div>
    );
  }
}
