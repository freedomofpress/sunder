import React, { Component, PropTypes } from 'react';
import './Export.scss';
import Panel from './Panel';
import Button from './Button';
import Info from './Info';
import ErrorMessage from './ErrorMessage';
import CopyButton from './CopyButton';
import SaveFileButton from './SaveFileButton';
import PuzzleIcon from './PuzzleIcon';
import Modal from './Modal';
import { remote } from 'electron';
import openVolume from 'app/lib/veracrypt';


export default class Export extends Component {
  static propTypes = { secret: PropTypes.string }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleView() {
    this.setState({ viewing: true });
  }

  handleHide() {
    this.setState({ viewing: false });
  }

  handleVeracrypt() {
    return new Promise((resolve, reject) => {
      remote.dialog.showOpenDialog({
        title: 'Select VeraCrypt volume',
        properties: ['openFile']
      }, (filenames) => {
        const path = filenames[0];
        openVolume(path, this.props.secret)
          .then(() => {
            this.setState({ veraCryptError: false });
            resolve();
          })
          .catch((message) => {
            this.setState({ veraCryptError: message });
            reject(message);
          });
      });
    });
  }

  render() {
    const modal = (
      <Modal onClose={this.handleHide.bind(this)} title="Secret">
        <textarea className="secret-view" value={this.props.secret} readOnly>
        </textarea>
        <div className="actions-row align-center">
          <Button type="default"
            onClick={this.handleHide.bind(this)}
            icon="eye-slash">
            Hide
          </Button>
        </div>
      </Modal>
    );

    return (
      <div className="container flex-column export">
        <div className="success-container">
          <div className="success-icon-container align-center">
            <PuzzleIcon />
            <div className="success-message align-center">
              <i className="fa fa-check" />
            </div>
          </div>
          <div className="export-explanation">
            <p>
              <strong>{'What\'s next? '}</strong>
              If this secret was the passphrase to an encrypted volume you might
              {' '}want to open that volume. If it is something else you can
              {' '}copy it to the clipboard, or save it to a file.
            </p>
          </div>
        </div>
        <Panel title="Actions">
          <div className="actions-row flex-row align-center">
            <Button type="default"
              icon="eye"
              id="view-secret-button"
              onClick={this.handleView.bind(this)}>
              View Secret
            </Button>
            <CopyButton buttonText="Copy Secret" targetText={this.props.secret} />
            <SaveFileButton buttonText="Save Secret" contents={this.props.secret} />
          </div>
          <div className="dash-separator" />
          <div className="flex-column veracrypt-row align-center">
            <ErrorMessage>{this.state.veraCryptError}</ErrorMessage>
            <Button type="xlarge"
              icon="hdd-o"
              onClick={this.handleVeracrypt.bind(this)}>
              <h4>Open Veracrypt Volume</h4>
              <span className="button-subtitle">
                This will prompt you to choose a Veracrypt volume, then open
                {' '}the volume using the recovered secret as the passphrase.
              </span>
            </Button>
            <Info>
              {'If VeraCrypt asks for a password then it has failed to open' +
              ' the volume with the recovered secret.'}
            </Info>
          </div>
        </Panel>
        {this.state.viewing && modal}
      </div>
    );
  }
}
