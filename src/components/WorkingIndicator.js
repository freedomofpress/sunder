import React, { Component } from 'react';
import PuzzleIcon from './PuzzleIcon';
import './WorkingIndicator.scss';

export default class WorkingIndicator extends Component {
  render() {
    return (
      <div className="overlay working-indicator">
        <div className="working-icon-container">
          <PuzzleIcon className="spin" />
        </div>
      </div>
    );
  }
}
