import React, { PropTypes } from 'react';
import './Button.scss';

export default function Button(props) {
  const type = props.type || 'default';
  const { icon } = props;

  const iconEl = (
    <div className="btn-icon-container">
      <i className={`fa fa-${icon}`} />
    </div>
  );

  const className = icon ? props.className || '' : `btn-no-icon ${props.className}`;

  return (
    <div className={`btn btn-${type} ${className}`}
      onClick={props.onClick}>
      {icon && iconEl}
      <div className="btn-content-container align-left">
        {props.children}
      </div>
    </div>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType(
      [PropTypes.element, PropTypes.string]).isRequired,
  type: PropTypes.oneOf(['small', 'default', 'primary', 'xlarge']),
  icon: PropTypes.string
};
