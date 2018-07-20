import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    error: PropTypes.string,
    unrecoverable: PropTypes.bool
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
    } else if (nextState.fakeDelay && nextProps.error) {
      nextState.resolveDelay();
      this.setState({ fakeDelay: false });
    }
  }

  handleRecover() {
    let resolveDelay;
    const delayPromise = new Promise((resolve) => {
      window.setTimeout(() => {
        this.setState({ fakeDelay: false });
        resolve();
      }, 2000);
      resolveDelay = resolve;
    });

    this.setState({
      fakeDelay: true,
      resolveDelay
    });

    return Promise.all([this.props.dispatch(recover()), delayPromise]);
  }

  handleShareAdded(result) {
    const { data, filename } = result;
    const share = Buffer.isBuffer(data) ? data.toString('utf8') : data;
    this.props.dispatch(addShare({ data: share, filename}));
  }

  handleReset() {
    this.props.dispatch(reset());
  }

  render() {
    const headerContent = <BackButton />;
    const { shares, inProgress, quorum, error, unrecoverable } = this.props;

    return (
      <Layout header={headerContent} title="Recover Secret">
        <div className="flex-column">
          <Recover shares={shares}
            quorum={quorum}
            inProgress={inProgress}
            error={error}
            unrecoverable={unrecoverable}
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
  const {
    shares, inProgress, secret, error, unrecoverable, shareProperties: { quorum }
  } = state.recover;
  return { shares, inProgress, quorum, secret, error, unrecoverable };
}


export default connect(mapStateToProps)(RecoverScreen);
