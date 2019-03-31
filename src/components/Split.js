import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileOrTextInput from './FileOrTextInput';
import SplitOptions from './SplitOptions';
import Button from './Button';
import Panel from './Panel';
import WorkingIndicator from './WorkingIndicator';
import splitValidator from '../lib/splitvalidator';
import Icon from './Icon';
import { reduxForm, Field, Fields } from 'redux-form';
import './Split.scss';

export class Split extends Component {
  // These are all injected by the reduxForm decorator
  static propTypes = {
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
  };
  render() {
    const {
      submitting,
      handleSubmit,
      invalid
    } = this.props;

    return (
      <div className="container flex-column split-container">
        <Panel title="Enter Your Secret">
          <Field
            name="secret"
            disabled={submitting}
            component={FileOrTextInput} />
        </Panel>
        <Panel title="Share Options" className="split-options-panel">
          <Fields
            names={["quorum", "shares"]}
            disabled={submitting}
            component={SplitOptions} />
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
  validate: splitValidator,
  touchOnBlur: false,
  touchOnChange: true
})(Split);
