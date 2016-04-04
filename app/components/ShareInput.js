import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Panel from './Panel';
import Button from './Button';
import './ShareInput.scss';
import { addShare } from '../ducks/recover';


export class ShareInput extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    quorum: PropTypes.number,
    numEnteredShares: PropTypes.number,
  }

  // This will be more complicated when file input is implemented
  handleSubmit() {
    const share = this.shareEl.value;
    this.props.dispatch(addShare(share));
    this.shareEl.value = '';
  }

  render() {
    const { quorum, numEnteredShares } = this.props;
    const whichShare = numEnteredShares === 0 ? 'first' : 'next';
    const progressMessage = quorum ? `(${numEnteredShares}/${quorum})` : '';

    return (
      <Panel className="share-input"
        title={`Enter the ${whichShare} secret share ${progressMessage}`}>
        <select defaultValue="text"
          onChange={() => console.log('mode changed, NOT IMPLEMENTED')}>
          <option value="text">As Text</option>
          <option value="file">From File</option>
        </select>
        <input name="secret-share" ref={(el) => (this.shareEl = el)} />
        <Button type="default"
          icon="cube"
          onClick={this.handleSubmit.bind(this)}>
          Continue
        </Button>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    quorum: state.recover.shareProperties.quorum,
    numEnteredShares: state.recover.shares.length
  };
}

export default connect(mapStateToProps)(ShareInput);
