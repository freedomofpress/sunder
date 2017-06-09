import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HomeButton from 'src/components/HomeButton';
import Layout from '../components/Layout';
import Export from '../components/Export';


export class ExportScreen extends Component {
  static propTypes = {
    secret: PropTypes.object,
    dispatch: PropTypes.func
  }

  render() {
    const headerContent = <HomeButton />;

    return (
      <Layout header={headerContent} title="Export Recovered Secret">
        <Export secret={this.props.secret} />
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
