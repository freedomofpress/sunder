import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class BackButton extends Component {
  static contextTypes = { router: PropTypes.object }

  render() {
    return (
      <a className="btn-back" onClick={this.context.router.goBack}>
        <i className="fa fa-chevron-left" /> Back
      </a>
    );
  }
}
