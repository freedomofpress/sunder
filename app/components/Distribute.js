import React, { Component, PropTypes } from 'react';
import Button from './Button';
import Panel from './Panel';

export default class Distribute extends Component {
  static propTypes = {
    shares: PropTypes.array
  }

  render() {
    return (
      <div className="container distribute-container">
        <Panel title="Secret Shares">
          something something
        </Panel>
      </div>
    );
  }
}
