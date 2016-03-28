import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { recover } from '../ducks/recover';
import Recover from '../components/Recover';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

export class RecoverScreen extends Component {
  static propTypes = {
    shares: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.string,
      error: PropTypes.string
    })),
    quorum: PropTypes.number,
    inProgress: PropTypes.bool,
    dispatch: PropTypes.func,
    secret: PropTypes.string
  }
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.secret && !this.props.secret) {
      this.context.router.push('/export');
    }
  }

  handleRecover() {
    this.props.dispatch(recover());
  }

  render() {
    const headerContent = <BackButton />;
    const { shares, inProgress, quorum } = this.props;

    return (
      <Layout header={headerContent}>
        <Recover shares={shares}
          quorum={quorum}
          inProgress={inProgress}
          onSubmit={this.handleRecover.bind(this)} />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { shares, inProgress, secret, shareProperties: { quorum } } = state.recover;
  return { shares, inProgress, quorum, secret };
}


export default connect(mapStateToProps)(RecoverScreen);
