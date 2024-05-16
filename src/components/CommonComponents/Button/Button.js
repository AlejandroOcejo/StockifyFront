import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <div className="flex justify-center items-center pt-2 pb-3 pl-7 pr-7 rounded-3xl bg-stockifyPurple text-white cursor-pointer leading-thigh">
      {props.name}
    </div>
  );
};

export default Button;

Button.propTypes = {
  name: PropTypes.string,
};
