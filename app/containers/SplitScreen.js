import React, { Component, PropTypes } from 'react';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.success && !this.props.success) {
      this.context.router.push('distribute');
    }
  }

  render() {
    const headerContent = <BackButton />;

    return (
      <Layout header={headerContent}>
        <Split onSubmit={(values) => this.props.dispatch(split(
              values.secret, {
                quorum: parseInt(values.quorum, 10),
                shares: parseInt(values.shares, 10)
              }
            ))} />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: Boolean(state.split.shares && state.split.shares.length)
  };
}

export default connect(mapStateToProps)(SplitScreen);
