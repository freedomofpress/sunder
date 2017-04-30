import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Distribute from '../components/Distribute';
import HomeButton from '../components/HomeButton';
import Layout from '../components/Layout';

export class DistributeScreen extends Component {
  static propTypes = {
    shares: PropTypes.array,
    dispatch: PropTypes.func,
    quorum: PropTypes.number
  }
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    if (!this.props.shares) {
      this.context.router.push('/');
      return <div />;
    }
    const headerContent = <HomeButton />;

    return (
      <Layout header={headerContent}>
        <Distribute shares={this.props.shares} quorum={this.props.quorum} />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    shares: state.split.shares,
    quorum: state.split.quorum
  };
}


export default connect(mapStateToProps)(DistributeScreen);
