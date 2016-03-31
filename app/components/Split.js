import React, { Component, PropTypes } from 'react';
import SecretEntry from './SecretEntry';
import SplitOptions from './SplitOptions';
import Button from './Button';
import Panel from './Panel';
import WorkingIndicator from './WorkingIndicator';
import splitValidator from '../lib/splitvalidator';
import { reduxForm } from 'redux-form';
import './Split.scss';

export default class Split extends Component {
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

  render() {
    const {
      fields: { shares, quorum, secret },
      submitting,
      handleSubmit,
      invalid
    } = this.props;

    return (
      <div className="container split-container">
        <div className="col-half">
          <Panel title="Enter Your Secret">
            <SecretEntry disabled={submitting} field={secret} />
          </Panel>
        </div>
        <div className="col-half">
          <Panel title="Share Options">
            <SplitOptions disabled={submitting}
              sharesField={shares} quorumField={quorum} />
          </Panel>
          <div className="flex-row split-button-container">
            <Button type="primary"
              icon="cubes"
              disabled={invalid || submitting}
              onClick={handleSubmit}>
              Create Secret Shares
            </Button>
            {submitting && <WorkingIndicator />}
          </div>
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
