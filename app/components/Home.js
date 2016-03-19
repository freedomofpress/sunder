import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>This is the homescreen.</h1>
        </div>
        <Link to="split">Split a secret</Link>
        <Link to="recover">Recover a secret</Link>
      </div>
    );
  }
}
