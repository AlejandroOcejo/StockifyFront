import React, { useState } from 'react';
import RemoveInventory from '../../RemoveInventory/RemoveInventory';
import Button from '../../../CommonComponents/Button/Button';

const InventoryCardInfo = ({ item }) => {
    const { id, name, description, location } = item;

    const [isRemove, setIsRemove] = useState(false);

    const handleClickRemove = () => {
        setIsRemove(true);
        console.log(id);
    };

    return (
        <>
            {isRemove ? (
                <RemoveInventory id={id} />
            ) : (
                <div className="flex flex-col p-4">
                    <div className="mb-2 text-lg font-semibold">{name}</div>
                    <div className="mb-2">{description}</div>
                    <div className="mb-4">Localización: {location}</div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <Button label="Acceder" />
                        <div
                            onClick={handleClickRemove}
                            className="cursor-pointer flex items-center text-red-500 font-bold hover:text-red-700 transition-colors"
                        >
                            Eliminar
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InventoryCardInfo;
