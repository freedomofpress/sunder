import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class HomeButton extends Component {
  static contextTypes = { router: PropTypes.object }

  render() {
    return (
      <a className="btn-back" onClick={() => this.context.router.push('/')}>
        <i className="fa fa-chevron-left" /> Home
      </a>
    );
  }
}
