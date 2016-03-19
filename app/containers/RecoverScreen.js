import React, { Component } from 'react';
import Recover from '../components/Recover';
import BackButton from '../components/BackButton';

export default class RecoverScreen extends Component {
  render() {
    return (
      <div>
        <BackButton />
        <Recover />
      </div>
    );
  }
}
