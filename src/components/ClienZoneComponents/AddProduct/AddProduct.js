import React, { useState } from 'react';
import Button from '../../CommonComponents/Button/Button';
import AddCategoryForm from '../AddCategory/AddCategoryForm';
import AddProductForm from './AddProductForm/AddProductForm';

const AddProduct = ({ inventoryId, onClose }) => {
    const [isNew, setNew] = useState(false);
    const [isNotNew, setNotNew] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);

    const handleNewButtonClick = () => {
        setNew(true);
        setNotNew(false);
        setShowProductForm(false);
    };

    const handleNotNewButtonClick = () => {
        setNew(false);
        setNotNew(true);
        setShowProductForm(true);
    };

    const handleCategorySubmit = () => {
        setShowProductForm(true);
    };

    return (
        <div className='flex flex-col items-center gap-8'>
            {!isNew && !isNotNew ? (
                <span className='text-2xl items-center font-semibold'>Categoría</span>
            ) : showProductForm ? (
                <span className='text-2xl items-center font-semibold'>Producto</span>
            ) : (
                <span className='text-2xl items-center font-semibold'>Categoría</span>
            )}

            {!isNew && !isNotNew ? (
                <div className='flex flex-row gap-4'>
                    <Button width={'8rem'} label={'Nueva'} onButtonClick={handleNewButtonClick} />
                    <Button width={'8rem'} label={'Existente'} onButtonClick={handleNotNewButtonClick} />
                </div>
            ) : null}

            {isNew && !showProductForm && (
                <div className='flex flex-col gap-6 items-center'>
                    <AddCategoryForm inventoryId={inventoryId} onSubmit={handleCategorySubmit} />
                </div>
            )}

            {(isNotNew || showProductForm) && <AddProductForm inventoryId={inventoryId} onClose={onClose} />}
        </div>
    );
};

export default AddProduct;
