import React, { Component, PropTypes } from 'react';
import Button from './Button';


export default class HomeButton extends Component {
  static contextTypes = { router: PropTypes.object }

  render() {
    return (
      <Button className="btn-back"
        onClick={() => this.context.router.push('/')}>
        Home
      </Button>
    );
  }
}
