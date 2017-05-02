import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import Icon from 'src/components/Icon';
import Button from './Button';

export default class Home extends Component {
  static contextTypes = { router: PropTypes.object }

  render() {
    return (
      <div className="container home">
        <h1 className="home-title align-center">Sunder</h1>
        <div className="home-actions align-center">
          <Button type="xlarge"
            icon={<Icon />}
            id="split-button"
            onClick={() => this.context.router.push('split')}>
            Sunder It
          </Button>
          <Button type="xlarge"
            icon={<Icon type="recover" />}
            id="recover-button"
            onClick={() => this.context.router.push('recover')}>
            Recover It
          </Button>
        </div>
        <p className="home-explanation">
          {"Sunder is an implementation of Shamir's Secret Sharing scheme. " +
            "Under this scheme a secret is split into some number of pieces, called 'shares.'" +
            ' A configurable quorum of these shares is required to recover the original secret. '}
        </p>
      </div>
    );
  }
}
