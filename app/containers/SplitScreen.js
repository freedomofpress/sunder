import React, { Component, PropTypes } from 'react';
import { split, updateSplit } from '../ducks/split';
import { connect } from 'react-redux';
import Split from '../components/Split';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

export class SplitScreen extends Component {
  static propTypes = {
    inProgress: PropTypes.bool,
    error: PropTypes.string,
    shares: PropTypes.array,
    dispatch: PropTypes.func,
    data: PropTypes.shape({
      secret: PropTypes.string,
      quorum: PropTypes.number,
      shares: PropTypes.number
    }),
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
        <Split inProgress={this.props.inProgress}
          error={this.props.error}
          onSubmit={() => this.props.dispatch(split(
              this.props.data.secret, {
                quorum: this.props.data.quorum,
                shares: this.props.data.shares
              }
            ))}
          onChange={(key, value) => this.props.dispatch(updateSplit(key, value))}
          success={this.props.success} />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state.split, {
    success: Boolean(state.split.shares && state.split.shares.length)
  });
}

export default connect(mapStateToProps)(SplitScreen);
