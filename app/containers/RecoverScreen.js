import React, { Component } from 'react';
import Recover from '../components/Recover';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

export default class RecoverScreen extends Component {
  render() {
    const headerContent = <BackButton />;

    return (
      <Layout header={headerContent}>
        <Recover />
      </Layout>
    );
  }
}
