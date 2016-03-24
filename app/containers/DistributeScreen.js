import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Distribute from '../components/Distribute';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

export class DistributeScreen extends Component {
  static propTypes = {
    shares: PropTypes.array,
    dispatch: PropTypes.func
  }

  render() {
    const headerContent = <BackButton />;

    return (
      <Layout header={headerContent}>
        <Distribute shares={this.props.shares} />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    shares: state.split.shares
  };
}


export default connect(mapStateToProps)(DistributeScreen);
