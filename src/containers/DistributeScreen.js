import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Distribute from '../components/Distribute';
import HomeButton from '../components/HomeButton';
import Layout from '../components/Layout';
import { saveLastDirectory } from '../ducks/files';

export class DistributeScreen extends Component {
  static propTypes = {
    shares: PropTypes.array,
    dispatch: PropTypes.func,
    quorum: PropTypes.number,
    lastDirectory: PropTypes.string
  }
  static contextTypes = {
    router: PropTypes.object
  }

  saveLastDirectory(directory) {
    this.props.dispatch(saveLastDirectory(directory));
  }

  render() {
    if (!this.props.shares) {
      this.context.router.push('/');
      return <div />;
    }
    const headerContent = <HomeButton />;

    return (
      <Layout header={headerContent} title="Distribute Secret Shards">
        <Distribute
          shares={this.props.shares}
          quorum={this.props.quorum}
          lastDirectory={this.props.lastDirectory}
          saveLastDirectory={this.saveLastDirectory.bind(this)} />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    shares: state.split.shares,
    quorum: state.split.quorum,
    lastDirectory: state.files.lastDirectory
  };
}


export default connect(mapStateToProps)(DistributeScreen);
