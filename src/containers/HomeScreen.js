import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { reset } from 'src/ducks/global';

export class HomeScreen extends Component {
  static propTypes = { dispatch: PropTypes.func };

  // Reset the application state every time the home screen is mounted
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
