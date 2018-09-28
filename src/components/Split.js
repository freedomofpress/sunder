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

export class Split extends Component {
  // These are all injected by the reduxForm decorator
  static propTypes = {
    fields: PropTypes.shape({
      shares: PropTypes.object,
      quorum: PropTypes.object,
      mimeType: PropTypes.object,
      secret: PropTypes.object
    }),
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
  }

  render() {
    const {
      fields: { shares, quorum, secret, mimeType },
      submitting,
      handleSubmit,
      invalid
    } = this.props;

    return (
      <div className="container flex-column split-container">
        <Panel title="Enter Your Secret">
          <FileOrTextInput disabled={submitting} field={secret} />
        </Panel>
        <Panel title="Share Options" className="split-options-panel">
          <SplitOptions disabled={submitting}
            sharesField={shares} quorumField={quorum} />
        </Panel>
        <div className="flex-row split-button-container">
          <Button type="primary"
            icon={<Icon className="split" />}
            id="create-shares"
            disabled={invalid || submitting}
            onClick={handleSubmit}>
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
  fields: ['secret', 'shares', 'quorum', 'mimeType'],
  validate: splitValidator
})(Split);
