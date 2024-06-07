import React, { useState } from 'react';
import RemoveInventory from '../../RemoveInventory/RemoveInventory';
import Button from '../../../CommonComponents/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const InventoryCardInfo = ({ item }) => {
    const { id, name, description, location } = item;
    const navigate = useNavigate();
    const [t] = useTranslation('global');
    const [isRemove, setIsRemove] = useState(false);

    const handleClickRemove = () => {
        setIsRemove(true);
        console.log(id);
    };

    const handleAccederClick = () => {
        if (id) {
            navigate(`/client/${id}/products`, { state: { fromInventoryCard: true } });
        } else {
            console.error('inventoryId is undefined');
        }
    };

    return (
        <>
            {isRemove ? (
                <RemoveInventory id={id} />
            ) : (
                <div className="flex flex-col p-4">
                    <div className="mb-2 text-lg font-semibold">{name}</div>
                    <div className="mb-2">{t('InventoryCardInfo.DescriptionLabel')}: {description}</div>
                    <div className="mb-4">{t('InventoryCardInfo.LocationLabel')}: {location}</div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <Button label={t('InventoryCardInfo.AccessButtonLabel')} onButtonClick={handleAccederClick} />
                        <div
                            onClick={handleClickRemove}
                            className="cursor-pointer flex items-center text-red-500 font-bold hover:text-red-700 transition-colors"
                        >
                            {t('InventoryCardInfo.RemoveButtonLabel')}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InventoryCardInfo;
