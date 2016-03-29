import React, { Component, PropTypes } from 'react';
import './Export.scss';
import Panel from './Panel';
import Button from './Button';
import CopyButton from './CopyButton';


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

  handleSave() {
    console.log('save');
  }

  handleVeracrypt() {
    console.log('veracrypt');
  }

  render() {
    let panel;

    if (this.state.viewing) {
      panel = (
        <Panel title="Secret">
          <textarea className="secret-view" value={this.props.secret} readOnly>
          </textarea>
          <div className="actions-row align-center">
            <Button type="default"
              onClick={this.handleHide.bind(this)}
              icon="eye-slash">
              Hide
            </Button>
          </div>
        </Panel>
      );
    } else {
      panel = (
        <Panel title="Actions">
          <div className="actions-row flex-row align-center">
            <Button type="default"
              icon="eye"
              onClick={this.handleView.bind(this)}>
              View
            </Button>
            <CopyButton targetText={this.props.secret} />
            <Button type="default"
              icon="hdd-o"
              onClick={this.handleSave.bind(this)}>
              Save
            </Button>
          </div>
          <div className="dash-separator" />
          <div className="flex-row veracrypt-row align-center">
            <Button type="xlarge"
              icon="hdd-o"
              onClick={this.handleVeracrypt.bind(this)}>
              <h4>Open Veracrypt Volume</h4>
              <span className="button-subtitle">
                This will prompt you to choose a Veracrypt volume, then open
                {' '}the volume using the recovered secret as the passphrase.
              </span>
            </Button>
          </div>
        </Panel>
      );
    }

    return (
      <div className="container flex-column">
        <div className="success-icon-container align-center">
          <i className="fa fa-cube" />
        </div>
        <div className="success-message align-center">
          Successfully recovered shared secret!
        </div>
        {panel}
      </div>
    );
  }
}
