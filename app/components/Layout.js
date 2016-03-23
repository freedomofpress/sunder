import React, { PropTypes } from 'react';
import './Layout.scss';


export default function Layout(props) {
  const { header, content } = props;
  return (
    <div className="layout-container">
      <div className="header">
        {header}
      </div>
      <div className="content-container">
        {content}
      </div>
    </div>
  );
}
Layout.propTypes = {
  header: PropTypes.element.isRequired,
  content: PropTypes.element.isRequired
};
