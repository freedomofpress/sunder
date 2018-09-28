import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { split } from '../ducks/split';
import { connect } from 'react-redux';
import Split from '../components/Split';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

export class SplitScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    success: PropTypes.bool
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { fakeDelay: false };
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.fakeDelay && nextProps.success) {
      this.context.router.push('distribute');
    }
  }

  handleSubmit(values) {
    this.setState({ fakeDelay: true });
    const fakeDelay = new Promise((resolve) => {
      setTimeout(() => {
        this.setState({ fakeDelay: false });
        resolve();
      }, 2000);
    });

    const splitPromise = this.props.dispatch(split(values.secret.data, {
      quorum: parseInt(values.quorum, 10),
      shares: parseInt(values.shares, 10),
      mimeType: values.secret.mimeType
    }));

    return Promise.all([splitPromise, fakeDelay]);
  }

  render() {
    const headerContent = <BackButton />;

    return (
      <Layout header={headerContent} title="Create Secret Shards">
        <Split onSubmit={this.handleSubmit.bind(this)} />
      </Layout>
    );
  }
}

export function mapStateToProps(state) {
  return {
    success: Boolean(state.split.shares && state.split.shares.length)
  };
}

export default connect(mapStateToProps)(SplitScreen);
