import React from 'react';

const Dialog = (props) => {
    
    const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={props.closeDialog}
      className="fixed inset-0 overflow-auto bg-opacity-40 z-10 overflow-y-auto bg-black flex items-center justify-center">
      <div onClick={handleClick} className="bg-white p-8 rounded-lg max-w-screen-lg w-full">
        {props.content}
        <button onClick={props.closeDialog}>aaaaa</button>
      </div>
    </div>
  );
};

export default Dialog;
