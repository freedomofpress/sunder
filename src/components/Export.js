import React, { Component, PropTypes } from 'react';
import './Export.scss';
import Panel from './Panel';
import Button from './Button';
import CopyButton from './CopyButton';
import SaveFileButton from './SaveFileButton';
import PuzzleIcon from './PuzzleIcon';
import Modal from './Modal';
import VeraCryptButton from './VeraCryptButton';
import { detectVeraCrypt } from '../lib/veracrypt';


export default class Export extends Component {
  static propTypes = { secret: PropTypes.string }

  constructor(props) {
    super(props);
    this.state = {};
    detectVeraCrypt().then((result) => {
      this.setState({ veracryptDetected: result });
    });
  }

  handleView() {
    this.setState({ viewing: true });
  }

  handleHide() {
    this.setState({ viewing: false });
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
          {this.state.veracryptDetected &&
            <div className="dash-separator" />}
          {this.state.veracryptDetected &&
            <VeraCryptButton className="veracrypt-row" secret={this.props.secret} />}
        </Panel>
        {this.state.viewing && modal}
      </div>
    );
  }
}
