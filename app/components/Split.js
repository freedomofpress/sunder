import React, { Component, PropTypes } from 'react';
import SecretEntry from './SecretEntry';
import ShareOptions from './ShareOptions';
import Button from './Button';
import Panel from './Panel';
import WorkingIndicator from './WorkingIndicator';
import './Split.scss';

export default class Split extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    success: PropTypes.bool,
    inProgress: PropTypes.bool,
    error: PropTypes.string,
    onChange: PropTypes.func
  }

  render() {
    return (
      <div className="container split-container">
        <div className="col-half">
          <Panel title="Enter Your Secret">
            <SecretEntry disabled={this.props.inProgress}
              onChange={this.props.onChange} />
          </Panel>
        </div>
        <div className="col-half">
          <Panel title="Share Options">
            <ShareOptions onChange={this.props.onChange}
              disabled={this.props.inProgress} />
          </Panel>
          <div className="flex-row split-button-container">
            <Button type="primary"
              icon="cubes"
              disabled={this.props.inProgress}
              onClick={this.props.onSubmit}>
              Create Secret Shares
            </Button>
            {this.props.inProgress && <WorkingIndicator />}
          </div>
        </div>
      </div>
    );
  }
}
