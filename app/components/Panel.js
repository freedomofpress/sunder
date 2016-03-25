import React, { PropTypes } from 'react';
import './Panel.scss';


export default function Panel(props) {
  const { title, children, className } = props;
  return (
    <div className={`panel ${className}`}>
      <span className="panel-title">
        {title}
      </span>
      <div className="panel-contents flex-column">
        {children}
      </div>
    </div>
  );
}
Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  className: PropTypes.string
};
