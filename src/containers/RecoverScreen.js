import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { recover, reset, addShare } from '../ducks/recover';
import Recover from '../components/Recover';
import BackButton from '../components/BackButton';
import WorkingIndicator from 'src/components/WorkingIndicator';
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
    secret: PropTypes.object,
    error: PropTypes.string
  }
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { fakeDelay: false };
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.fakeDelay && nextProps.secret) {
      this.context.router.push('/export');
    }
  }

  handleRecover() {
    this.setState({ fakeDelay: true });
    const fakeDelay = new Promise((resolve) => {
      window.setTimeout(() => {
        this.setState({ fakeDelay: false });
      }, 2000);
      resolve();
    });
    return Promise.all([this.props.dispatch(recover()), fakeDelay]);
  }

  handleShareAdded(data) {
    const share = Buffer.isBuffer(data.share) ? data.share.toString('utf8') : data.share;
    this.props.dispatch(addShare(share));
  }

  handleReset() {
    this.props.dispatch(reset());
  }

  render() {
    const headerContent = <BackButton />;
    const { shares, inProgress, quorum, error } = this.props;

    return (
      <Layout header={headerContent}>
        <div className="flex-column">
          <Recover shares={shares}
            quorum={quorum}
            inProgress={inProgress}
            error={error}
            onShareAdded={this.handleShareAdded.bind(this)}
            onReset={this.handleReset.bind(this)}
            onSubmit={this.handleRecover.bind(this)} />
          {inProgress || this.state.fakeDelay && <WorkingIndicator />}
        </div>
      </Layout>
    );
  }
}

export function mapStateToProps(state) {
  const { shares, inProgress, secret, error, shareProperties: { quorum } } = state.recover;
  return { shares, inProgress, quorum, secret, error };
}


export default connect(mapStateToProps)(RecoverScreen);
