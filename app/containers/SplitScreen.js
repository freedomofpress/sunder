import React, { Component } from 'react';
import Split from '../components/Split';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

export default class SplitScreen extends Component {
  render() {
    const headerContent = <BackButton />;
    const contents = <Split />;

    return (
      <Layout header={headerContent} content={contents} />
    );
  }
}
