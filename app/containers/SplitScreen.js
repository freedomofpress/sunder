import React, { Component } from 'react';
import Split from '../components/Split';
import BackButton from '../components/BackButton';

export default class SplitScreen extends Component {
  render() {
    return (
      <div>
        <BackButton />
        <Split />
      </div>
    );
  }
}
