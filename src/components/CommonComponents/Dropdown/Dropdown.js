import React from 'react';

const Dropdown = ({ selectedValue, options, onChange }) => {
  return (
    <div className="relative w-full">
      <select
        className="p-2 rounded-xl border-2 border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0 w-full appearance-none"
        value={selectedValue}
        onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
