import React from 'react';

const Switch = ({ isOn, handleToggle, offColor = 'bg-gray-300' }) => {
  return (
    <div
      className={`${isOn ? 'bg-green-500' : offColor
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out cursor-pointer`}
      onClick={handleToggle}>
      <span
        className={`${isOn ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
      />
    </div>
  );
};

export default Switch;
