import React, { useState } from 'react';
import Dialog from '../../CommonComponents/Dialog/Dialog';
import AddInventoryForm from './AddInventoryForm/AddInventoryForm';

const AddInventory = () => {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive(!isActive);
  };

  return (
    <>
      {isActive ? <Dialog closeDialog={handleClick} content={<AddInventoryForm />} /> : null}
      <div
        className="flex w-52 h-52 flex-col border-4 border-dashed border-indigo-600 gap-8 bg-[#F3F3F3] text-center rounded-3xl justify-center items-center cursor-pointer"
        onClick={handleClick}>
        <img className="w-20 h-auto" alt="añadir" src="anadir.png" />
      </div>
    </>
  );
};

export default AddInventory;
