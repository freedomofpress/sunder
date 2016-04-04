import React, { Component, PropTypes } from 'react';
import Button from './Button';
import CopyButton from './CopyButton';
import SaveFileButton from './SaveFileButton';
import Modal from './Modal';
import './ShareRow.scss';

export default class ShareRow extends Component {
  static propTypes = {
    share: PropTypes.string,
    index: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleViewing() {
    this.setState({ shown: !this.state.shown });
  }

  render() {
    const { share, index } = this.props;
    const modal = (
      <Modal onClose={this.toggleViewing.bind(this)}>
        <textarea className="secret-view" value={this.props.share} readOnly>
        </textarea>
        <div className="actions-row align-center">
          <Button type="default"
            onClick={this.toggleViewing.bind(this)}
            icon="eye-slash">
            Hide
          </Button>
        </div>
      </Modal>
    );

    return (
      <div className="share-row" key={share}>
        <div className="share-cell share-value">
          {`Share #${index}`}
        </div>
        <div className="share-cell share-actions">
          <Button type="small"
            icon="eye"
            onClick={this.toggleViewing.bind(this)}>
            View
          </Button>
          <CopyButton type="small" targetText={share} />
          <SaveFileButton contents={share}
            type="small"
            defaultPath={`secret-share-${index}.txt`} />
        </div>
        {this.state.shown && modal}
      </div>
    );
  }

  }
