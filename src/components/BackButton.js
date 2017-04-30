import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';


export default class BackButton extends Component {
  static contextTypes = { router: PropTypes.object }

  render() {
    return (
      <Button className="btn-back" onClick={this.context.router.goBack}>
        Back
      </Button>
    );
  }
}
