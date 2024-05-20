import React from 'react';
import PropTypes from 'prop-types';

const Spacer = ({ height, width }) => {
  const styles = {
    height: height || 10,
    width: width || '100%',
  };

  return <div style={styles}></div>;
};

export default Spacer;

Spacer.propTypes = {
  height: PropTypes.number,
  width: PropTypes.string,
};
