import React, { PropTypes } from 'react';
import './Button.scss';

export default function Button(props) {
  const type = props.type || 'default';
  const { icon } = props;

  let iconEl;
  if (typeof icon === 'object') {
    iconEl = (
      <div className="svg-icon btn-icon-container">
        {icon}
      </div>
    );
  } else {
    iconEl = (
      <div className="btn-icon-container">
        <i className={`fa fa-${icon}`} />
      </div>
    );
  }

  let className = icon ? props.className || '' : `btn-no-icon ${props.className}`;
  className = `${className} ${props.disabled ? 'disabled' : ''}`;

  return (
    <div className={`btn btn-${type} ${className}`}
      id={props.id ? props.id : null}
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
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['small', 'default', 'primary', 'xlarge']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  disabled: PropTypes.bool
};
