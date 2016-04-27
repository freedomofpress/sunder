import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Panel from './Panel';
import Button from './Button';
import './ShareInput.scss';
import { addShare } from '../ducks/recover';


export class ShareInput extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    numEnteredShares: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  // This will be more complicated when file input is implemented
  handleSubmit() {
    const share = this.shareEl.value;
    this.props.dispatch(addShare(share));
    this.shareEl.value = '';
    this.setState({ currentValue: '' });
  }

  handleChange(event) {
    this.setState({ currentValue: event.target.value.trim() });
  }

  render() {
    const { numEnteredShares } = this.props;
    const currentValue = this.state.currentValue;
    const whichShare = numEnteredShares === 0 ? 'first' : 'next';

    return (
      <Panel className="share-input"
        title={`Enter the ${whichShare} secret share`}>
        <select defaultValue="text"
          onChange={() => console.log('mode changed, NOT IMPLEMENTED')}>
          <option value="text">As Text</option>
          <option value="file">From File</option>
        </select>
        <input type="password"
          name="secret-share"
          onChange={this.handleChange.bind(this)}
          ref={(el) => (this.shareEl = el)} />
        <Button type="default"
          icon="puzzle-piece"
          id="submit-share-button"
          disabled={!currentValue}
          onClick={this.handleSubmit.bind(this)}>
          Continue
        </Button>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    numEnteredShares: state.recover.shares.filter((s) => !s.error).length
  };
}

export default connect(mapStateToProps)(ShareInput);
