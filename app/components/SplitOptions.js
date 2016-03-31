import React, { Component, PropTypes } from 'react';
import NumberField from './NumberField';
import './SplitOptions.scss';


export default class SplitOptions extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    // reduxForm fields
    quorumField: PropTypes.object,
    sharesField: PropTypes.object
  }

  render() {
    const { sharesField, quorumField } = this.props;

    return (
      <div className="split-options">
        <NumberField field={sharesField} label="Number of shares" />
        <NumberField field={quorumField}
          label="Shares needed to recover the secret" />
      </div>
    );
  }
}
