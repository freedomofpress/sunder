import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileOrTextInput from './FileOrTextInput';
import SplitOptions from './SplitOptions';
import Button from './Button';
import Panel from './Panel';
import WorkingIndicator from './WorkingIndicator';
import splitValidator from '../lib/splitvalidator';
import Icon from './Icon';
import { reduxForm } from 'redux-form';
import './Split.scss';

function initialValidationWrapper(handler) {
  return function (...args) {
    if (!this.state.submittedOnce) {
      const fields = this.props.fields;
      const invalid = Object.keys(fields).reduce((acc, field) => (acc || fields[field].invalid), false);
      this.setState({
        submittedOnce: true
      });
      if (invalid) return;
    }
    handler(...args);
  }
}

export class Split extends Component {
  // These are all injected by the reduxForm decorator
  static propTypes = {
    fields: PropTypes.shape({
      shares: PropTypes.object,
      quorum: PropTypes.object,
      secret: PropTypes.object
    }),
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      submittedOnce: false
    }
    this.wrappedHandler = initialValidationWrapper(props.handleSubmit).bind(this);
  }

  render() {
    const {
      fields: { shares, quorum, secret },
      submitting,
      invalid
    } = this.props;

    const { submittedOnce } = this.state;

    return (
      <div className="container flex-column split-container">
        <Panel title="Enter Your Secret">
          <FileOrTextInput disabled={submitting} field={secret} submittedOnce={submittedOnce}/>
        </Panel>
        <Panel title="Share Options" className="split-options-panel">
          <SplitOptions disabled={submitting} submittedOnce={submittedOnce}
            sharesField={shares} quorumField={quorum} />
        </Panel>
        <div className="flex-row split-button-container">
          <Button type="primary"
            icon={<Icon className="split" />}
            id="create-shares"
            disabled={submittedOnce && (invalid || submitting)}
            onClick={this.wrappedHandler}>
            Create Secret Shares
          </Button>
          {submitting && <WorkingIndicator />}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'split',
  fields: ['secret', 'shares', 'quorum'],
  validate: splitValidator
})(Split);
