import React from 'react';
import Icon from 'src/components/Icon';
import PropTypes from 'prop-types';
import './Layout.scss';


export default function Layout(props) {
  const { header, children, title } = props;
  return (
    <div className="layout-container">
      <div className="header">
        <div className="icon-container">
          <Icon />
        </div>
        <span className="app-title">Sunder</span>
        <span className="app-title-separator">|</span>
        <span className="app-sub-title">{title}</span>
      </div>
      <div className="layout-nav">
        {header}
      </div>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  header: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
