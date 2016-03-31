import React, { Component } from 'react';
import './WorkingIndicator.scss';

export default class WorkingIndicator extends Component {
  render() {
    return (
      <div className="overlay working-indicator">
        <i className="fa fa-spinner fa-pulse" />
      </div>
    );
  }
}
