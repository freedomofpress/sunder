import React, { PropTypes } from 'react';
import './Panel.scss';


export default function Panel(props) {
  const { title, children, className } = props;
  const titleEl = (
    <span className="panel-title">
      {title}
    </span>
  );

  return (
    <div className={`panel ${className}`}>
      {title && titleEl}
      <div className="panel-contents flex-column">
        {children}
      </div>
    </div>
  );
}
Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
