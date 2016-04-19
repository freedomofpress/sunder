import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { reset } from 'app/ducks/global';

export class HomeScreen extends Component {
  static propTypes = { dispatch: PropTypes.func };

  // Reset the application state ever time the home screen is mounted
  componentWillMount() {
    this.props.dispatch(reset());
  }

  render() {
    return (
      <Home />
    );
  }
}

export default connect()(HomeScreen);
