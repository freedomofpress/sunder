import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from './Panel';
import './Modal.scss';


export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func
  }

  render() {
    return (
      <div className="modal overlay" onClick={this.props.onClose}>
        <Panel title="" onClick={(event) => event.stopPropagation()}>
          {this.props.children}
        </Panel>
      </div>
    );
  }
}
