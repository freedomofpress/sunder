import React, { Component } from 'react';
import SecretEntry from './SecretEntry';
import ShareOptions from './ShareOptions';
import Button from './Button';
import Panel from './Panel';

export default class Split extends Component {
  handleCreateShares(event) {
    console.log('handle called with', event);
  }

  render() {
    return (
      <div className="container split-container">
        <div className="col-half">
          <Panel title="Enter Your Secret">
            <SecretEntry />
          </Panel>
        </div>
        <div className="col-half">
          <Panel title="Share Options">
            <ShareOptions />
            <Button type="primary"
              icon="cubes"
              onClick={this.handleCreateShares.bind(this)}>
              Create Secret Shares
            </Button>
          </Panel>
        </div>
      </div>
    );
  }
}
