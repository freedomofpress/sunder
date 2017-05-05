import React from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';


export default function Layout(props) {
  const { header, children } = props;
  return (
    <div className="layout-container">
      <div className="header">
        {header}
        <h1 className="app-title">Sunder</h1>
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
