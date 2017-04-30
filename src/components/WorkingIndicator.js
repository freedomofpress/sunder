import React, { Component } from 'react';
import Icon from './Icon';
import './WorkingIndicator.scss';

export default class WorkingIndicator extends Component {
  render() {
    return (
      <div className="overlay working-indicator">
        <div className="working-icon-container">
          <Icon className="spin" />
        </div>
      </div>
    );
  }
}
