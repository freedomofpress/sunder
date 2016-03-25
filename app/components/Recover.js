import React, { Component, PropTypes } from 'react';
import Panel from './Panel';
import Info from './Info';
import Button from './Button';
import './Recover.scss';

export default class Recover extends Component {
  static propTypes = {
    shares: PropTypes.array,
    quorum: PropTypes.number
  }

  render() {
    return (
      <div className="container flex-column">
        <Info>
          To recover a shared secret start by providing one of the secret
          shares. SecretShare will then prompt you for the remaining shares
          needed to recover the shared secret.
        </Info>
        <Panel className="recover-row" title="Enter the first secret share">
          <select defaultValue="text"
            onChange={() => console.log('mode changed, NOT IMPLEMENTED')}>
            <option value="text">As Text</option>
            <option value="file">From File</option>
          </select>
          <input name="secret-share" />
          <Button type="default"
            icon="cube"
            onClick={() => console.log('continue clicked, NOT IMPLEMENTED')}>
            Continue
          </Button>
        </Panel>
      </div>
    );
  }
}
