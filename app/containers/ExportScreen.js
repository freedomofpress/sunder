import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';
import Export from '../components/Export';


export class ExportScreen extends Component {
  static propTypes = {
    secret: PropTypes.string,
    dispatch: PropTypes.func
  }

  render() {
    const headerContent = <BackButton />;

    return (
      <Layout header={headerContent}>
        <Export />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    secret: state.recover.secret
  };
}

export default connect(mapStateToProps)(ExportScreen);
