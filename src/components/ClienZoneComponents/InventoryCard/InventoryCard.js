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

  const getTextColorBasedOnBackground = (bgColor) => {
    if (!bgColor || bgColor.length !== 6) {
      return 'black';
    }
    const r = parseInt(bgColor.substr(0, 2), 16);
    const g = parseInt(bgColor.substr(2, 2), 16);
    const b = parseInt(bgColor.substr(4, 2), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance < 0.5 ? 'white' : 'black';
  };

  const textColor = getTextColorBasedOnBackground(props.item.color);

  return (
    <>
      <div
        className="relative flex w-52 h-52 flex-col border-4 border-solid border-stockifyPurple text-center rounded-3xl justify-start items-center cursor-pointer pt-2"
        style={{ backgroundColor: `#${props.item.color}`, color: textColor }}
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
        <Dialog closeDialog={handleClose} content={<InventoryCardInfo item={props.item} />} />
      )}
    </>
  );
};

export default InventoryCard;
