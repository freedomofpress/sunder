import React, { Component, PropTypes } from 'react';
import { split } from '../ducks/split';
import { connect } from 'react-redux';
import Split from '../components/Split';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

export class SplitScreen extends Component {
  static propTypes = {
    inProgress: PropTypes.bool,
    error: PropTypes.string,
    shares: PropTypes.array,
    dispatch: PropTypes.func
  }

  render() {
    const headerContent = <BackButton />;
    const contents = (
      <Split inProgress={this.props.inProgress}
        error={this.props.error}
        onSubmit={(...args) => this.props.dispatch(split(...args))}
        success={this.props.shares && this.props.shares.length} />
    );

    return (
      <Layout header={headerContent} content={contents} />
    );
  }
}

function mapStateToProps(state) {
  return state.split;
}

export default connect(mapStateToProps)(SplitScreen);
