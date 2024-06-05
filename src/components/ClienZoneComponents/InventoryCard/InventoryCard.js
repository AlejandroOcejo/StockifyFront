import React, { useState } from "react";
import Dialog from "../../CommonComponents/Dialog/Dialog";
import InventoryCardInfo from "./InventoryCardInfo/InventoryCardInfo";

const InventoryCard = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        className="relative flex w-52 h-52 flex-col border-4 border-dashed bg-[#F3F3F3] text-center rounded-3xl justify-start items-center cursor-pointer pt-2"
        style={{ borderColor: `#${props.item.color}` }}
        onClick={handleClick}>
        <div className="text-xl font-semibold">{props.item.name}</div>
        {props.item.image ? (
          <img
            className="absolute top-1/2 transform -translate-y-1/2 w-28 h-28 rounded-full"
            alt="añadir"
            src={props.item.image}
          />
        ) : null}
      </div>
      {isDialogOpen && (
        <Dialog closeDialog={handleClose} content={<InventoryCardInfo item={props.item} />}
        />
      )}
    </>
  );
};

export default InventoryCard;
