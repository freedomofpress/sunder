import React, { Component, PropTypes } from 'react';


export default class BackButton extends Component {
  static contextTypes = { router: PropTypes.object }

  render() {
    return (
      <div className="btn btn-back" onClick={this.context.router.goBack}>
        Back
      </div>
    );
  }
}
