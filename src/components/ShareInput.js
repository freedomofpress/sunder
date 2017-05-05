import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { createValidator, required } from 'src/lib/validations';
import FileOrTextInput from 'src/components/FileOrTextInput';
import Panel from './Panel';
import Button from './Button';
import './ShareInput.scss';


export class ShareInput extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    numEnteredShares: PropTypes.number,
    handleSubmit: PropTypes.func,
    // These are injected by the reduxForm decorator
    fields: PropTypes.shape({
      share: PropTypes.object
    }),
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    resetForm: PropTypes.func
  }

  handleSubmit() {
    this.props.handleSubmit();
    this.props.resetForm();
  }

  render() {
    const { numEnteredShares, invalid, fields: { share } } = this.props;
    const whichShare = numEnteredShares === 0 ? 'first' : 'next';

    return (
      <Panel className="share-input"
        title={`Enter the ${whichShare} secret share`}>
        <FileOrTextInput field={share} defaultMode="file" />
        <Button type="default"
          icon="puzzle-piece"
          id="submit-share-button"
          disabled={invalid}
          onClick={this.handleSubmit.bind(this)}>
          Continue
        </Button>
      </Panel>
    );
  }
}

export default reduxForm({
  form: 'recover-share',
  fields: ['share'],
  validate: createValidator({
    share: [required]
  })
})(ShareInput);
