import React, { useState, useEffect } from 'react';
import RemoveInventory from '../../RemoveInventory/RemoveInventory';
import Button from '../../../CommonComponents/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryById } from '../../../../state/inventorySlicer';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

const InventoryCardInfo = ({ item }) => {
    const { id, name, description, location } = item;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t] = useTranslation('global');
    const [isRemove, setIsRemove] = useState(false);
    const currentInventory = useSelector(state => state.inventory.currentInventory);
    const [isExporting, setIsExporting] = useState(false);

    const handleClickRemove = () => {
        setIsRemove(true);
    };

    const handleAccederClick = () => {
        if (id) {
            navigate(`/client/${id}/products`, { state: { fromInventoryCard: true } });
        } else {
            console.error('inventoryId is undefined');
        }
    };

    const handleClickExport = async () => {
        if (id) {
            setIsExporting(true);
            await dispatch(getInventoryById(id));
        } else {
            console.error('inventoryId is undefined');
        }
    };

    useEffect(() => {
        if (isExporting && currentInventory && currentInventory.id === id) {
            exportToExcel(currentInventory);
            setIsExporting(false);
        }
    }, [isExporting, currentInventory, id]);

    const exportToExcel = (data) => {
        const products = data && data.products ? data.products.map(product => ({
            'product': product.name,
            'description': product.description,
            'price': `${product.price}€`,
            'quantity': product.quantity,
            'category': product.categories.map(cat => cat.name).join(', '),
        })) : [];

        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}${minutes}${seconds}`;

        const fileName = `Inventory_${id}_${timeString}.xlsx`;
        XLSX.writeFile(workbook, `${fileName}`);

        toast.success('Inventario exportado con éxito');
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
                    <Button label={t('InventoryCardInfo.AccessButtonLabel')} onButtonClick={handleAccederClick} />
                    <div className="flex justify-center space-x-4 mt-4 gap-4">
                        <div
                            onClick={handleClickExport}
                            className="cursor-pointer flex items-center text-[#217346] font-bold hover:text-[#3c8031] transition-colors"
                        >
                            {t('RemoveInventory.ExportButtonLabel')}
                        </div>
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
