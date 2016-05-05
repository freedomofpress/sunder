import React, { PropTypes } from 'react';
import './Layout.scss';


export default function Layout(props) {
  const { header, children } = props;
  return (
    <div className="layout-container">
      <div className="header">
        {header}
        <h1 className="app-title">Secret Splitter</h1>
      </div>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  header: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired
};
