import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { width, height, onButtonClick, disabled, label, color } = props;

  const sizeStyles = {
    width: width || 'auto',
    height: height || 'auto',
  };

  const backgroundColor = disabled ? 'gray' : color || '#6b46c1'; // Reemplaza '#6b46c1' con el color hexadecimal de 'bg-stockifyPurple'

  return (
    <div
      onClick={disabled ? null : onButtonClick}
      className={`flex justify-center items-center pt-2 pb-3 pl-7 pr-7 rounded-3xl text-white cursor-pointer leading-thigh ${
        disabled ? 'cursor-not-allowed' : ''
      }`}
      style={{ ...sizeStyles, backgroundColor }}>
      {label}
    </div>
  );
};

export default Button;

Button.propTypes = {
  label: PropTypes.string,
  onButtonClick: PropTypes.func,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};
