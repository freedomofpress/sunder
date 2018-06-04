import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveFiles } from 'src/lib/save';
import Button from './Button';


export default class SaveAllButton extends Component {
  static propTypes = {
    contents: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string, PropTypes.object
      ])
    ),
    saveOptions: PropTypes.object,
    isSaved: PropTypes.bool,
    onSavedAll: PropTypes.func,
  }

  handleClick() {
    saveFiles(
      this.props.contents,
      this.props.saveOptions,
      this.props.onSavedAll
    );
  }

  render() {
    return (
      <Button type="default"
        onClick={this.handleClick.bind(this)}
        icon="hdd-o"
        {...this.props}>
        {this.props.isSaved ? "Saved all" : "Save all"}
      </Button>
    );
  }

}
