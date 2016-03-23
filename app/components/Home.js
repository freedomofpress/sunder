import React, { Component, PropTypes } from 'react';
import './Home.scss';
import Button from './Button';

export default class Home extends Component {
  static contextTypes = { router: PropTypes.object }

  render() {
    return (
      <div className="container home">
        <Button type="xlarge"
          icon="cubes"
          onClick={() => this.context.router.push('split')}>
          Split a secret
        </Button>
        <Button type="xlarge"
          icon="cube"
          onClick={() => this.context.router.push('recover')}>
          Recover a secret
        </Button>
      </div>
    );
  }
}
