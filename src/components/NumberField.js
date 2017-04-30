import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Field.scss';

/**
 * A simple number field that integrates with redux-form fields.
 */
export default class NumberField extends Component {
  static propTypes = {
    field: PropTypes.object,
    label: PropTypes.string
  };

  onChange(event) {
    this.props.field.onChange(parseInt(event.target.value, 10));
  }

  render() {
    const { field, label } = this.props;
    const hasError = field.touched && field.invalid;

    return (
      <div className={`field-container ${hasError ? 'has-error' : ''}`}>
        <div className="flex-row">
          <input className="labeled-input"
            type="number"
            pattern="[0-9]*"
            {...field}
            onChange={this.onChange.bind(this)} />
          <label className="label-input">{label}</label>
        </div>
        {hasError && <label className="error-label">{field.error}</label>}
      </div>
    );
  }
}
