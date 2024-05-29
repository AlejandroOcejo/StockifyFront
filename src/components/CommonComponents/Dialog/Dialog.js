import React from 'react';

const Dialog = (props) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={props.closeDialog}
      className="fixed inset-0 overflow-auto bg-opacity-40 z-10 overflow-y-auto bg-black flex items-center justify-center">
      <div onClick={handleClick} className="bg-white p-8 rounded-lg max-w-screen-lg relative">
        {props.content}
        <div onClick={props.closeDialog} className="absolute top-0 right-0 p-4 cursor-pointer">
          <span className="text-black text-xl">X</span>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
