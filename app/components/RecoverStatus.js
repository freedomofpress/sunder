import React, { Component, PropTypes } from 'react';
import './RecoverStatus.scss';


export default class RecoverStatus extends Component {
  static propTypes = {
    shares: PropTypes.array.isRequired,
    quorum: PropTypes.number
  }

  render() {
    const shareClasses = [];
    const { shares } = this.props;
    let quorum = this.props.quorum;
    // Provide a reasonable default so that there is something to display when
    // this value is unknown.
    quorum = quorum || 5;

    for (let i = 0; i < quorum; i++) {
      let className;
      if (!shares[i]) {
        className = i === shares.length ? 'current' : 'incomplete';
      } else if (shares[i].error) {
        className = 'error';
      } else {
        className = 'success';
      }
      shareClasses.push(className);
    }

    return (
      <div className="recover-status">
        {shareClasses.map((className, index) =>
          <i key={index} className={`fa fa-cube progress-icon ${className}`} />)
        }
      </div>
    );
  }
}
