import React, { Component, PropTypes } from 'react';
import Panel from './Panel';
import './Modal.scss';


export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func
  }

  render() {
    return (
      <div className="modal overlay" onClick={this.props.onClose}>
        <Panel title="">
          {this.props.children}
        </Panel>
      </div>
    );
  }
}
