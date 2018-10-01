import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clipboard } from 'electron';
import { validateShare } from 'src/lib/utilities';
import FileInput from 'src/components/FileInput';
import PasteButton from 'src/components/PasteButton';
import Panel from './Panel';
import './ShareInput.scss';


export default class ShareInput extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    numEnteredShares: PropTypes.number,
    shares: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { shareInClipboard: false };
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('focus', this.handleFocus);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shares !== this.props.shares) {
      this.checkClipboardForShare(nextProps.shares);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.handleFocus);
  }

  handleFocus() {
    this.checkClipboardForShare();
  }

  checkClipboardForShare(currentShares) {
    const clipboardText = clipboard.readText();
    const result = validateShare(clipboardText, currentShares || this.props.shares);
    this.setState({ shareInClipboard: !result.error });
  }

  onPasteButtonClick(data) {
    if (this.props.onSubmit) {
      this.props.onSubmit([{data: data, filename: 'Copied from clipboard'}]);
    }
  }

  render() {
    const { numEnteredShares, onSubmit } = this.props;
    const whichShare = numEnteredShares === 0 ? 'first' : 'next';

    return (
      <Panel className="share-input"
        title={`Enter the ${whichShare} secret share`}>
        <FileInput onChange={onSubmit} allowMultiple />
        <PasteButton disabled={!this.state.shareInClipboard}
          onClick={this.onPasteButtonClick.bind(this)} />
      </Panel>
    );
  }
}
