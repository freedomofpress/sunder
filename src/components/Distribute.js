import React, { Component } from 'react';
const { clipboard } = require('electron');
import { remote } from 'electron';
import fs from 'fs';
import PropTypes from 'prop-types';
import ShareRow from './ShareRow';
import Panel from './Panel';
import Info from './Info';
import Button from './Button';
import './Distribute.scss';

export default class Distribute extends Component {
  static propTypes = {
    shares: PropTypes.array,
    quorum: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = { copiedShare: null, saveStatuses: [] };
  }

  copyShare(index) {
    clipboard.writeText(this.props.shares[index]);

    window.clearTimeout(this.state.timeoutCallback);
    var timeoutCallback = window.setTimeout(() => this.setState({ copiedShare: null }), 5000);

    this.setState({ copiedShare: index, timeoutCallback });
  }

  saveShare(index) {
    remote.dialog.showSaveDialog({
      title: 'Save share',
      defaultPath: `secret-share-${index + 1}.txt`,
    }, (filename) => {
      if (!filename) {
        return;
      }
      this.writeShare(index, filename);
    });
  }

  saveAllShares() {
    remote.dialog.showOpenDialog({
      title: 'Save All Files',
      properties: ['openDirectory', 'createDirectory']
    }, (directory) => {
      if (!directory) {
        return;
      }
      this.props.shares.forEach((item, index) => {
        this.writeShare(
          index,
          `${directory}/secret-share-${index + 1}.txt`,
          false
        );
      });
    });
  }

  writeShare(index, filename, overwrite = true) {
    fs.writeFile(
      filename,
      this.props.shares[index],
      { mode: '0600', flag: (overwrite ? 'w' : 'wx') },
      (error) => {
        let saveStatus = {};

        if (error) {
          saveStatus.isError = true;
          saveStatus.text = 'Save failed';

          switch (error.code) {
            case 'EEXIST':
              saveStatus.toolTip = 'File already exists.';
              break;
            default:
              saveStatus.toolTip = `Unexpected error: ${error.code}.`;
              break;
          }
        } else {
          saveStatus.text = 'Save successful';
          saveStatus.toolTip = `Saved as: ${filename}`;
        }

        this.setState((prevState) => {
          prevState.saveStatuses[index] = saveStatus;
        });
      }
    );
  }

  render() {
    const { quorum, shares } = this.props;
    const { copiedShare, saveStatuses } = this.state;

    const shareRows = shares.map((share, index) => (
      <ShareRow key={share}
        shareNumber={index + 1}
        isCopied={copiedShare === index}
        saveStatus={saveStatuses[index]}
        onClickCopy={this.copyShare.bind(this, index)}
        onClickSave={this.saveShare.bind(this, index)} />
    ));

    return (
      <div className="container distribute-container flex-column">
        <Panel title="Secret Shares">
          <Button type="default"
            icon="hdd-o"
            onClick={this.saveAllShares.bind(this)}>
            Save all
          </Button>
          <div className="shares-table">
            {shareRows}
          </div>
        </Panel>
        <Info>
          {`Remember: you need ${quorum} out of ${shares.length} shares to recover the secret.`}
        </Info>
      </div>
    );
  }
}
