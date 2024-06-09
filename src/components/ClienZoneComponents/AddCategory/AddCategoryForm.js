import React, { useState } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import Button from '../../CommonComponents/Button/Button';
import { addCategory } from '../../../state/categorySlicer';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const AddCategoryForm = ({ inventoryId, onSubmit }) => {
    const dispatch = useDispatch();
    const [t] = useTranslation('global');

    const [formData, setFormData] = useState({
        name: '',
        inventoryId: inventoryId
    });

    const [errors, setErrors] = useState({
        name: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value === ''
        }));
    };

    const handleSubmit = async () => {
        if (formData.name === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: true
            }));
            return;
        }

        try {
            await dispatch(addCategory({ formData })).unwrap();
            toast.success('Categoría creada con éxito');
            onSubmit();
        } catch (error) {
            toast.error('Error al crear la categoría');
        }
    };

    return (
        <div className='flex flex-col items-center gap-5'>
            <FloatLabel>
                <InputText
                    id="name"
                    value={formData.name}
                    name="name"
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${errors.name ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                />
                <label htmlFor="name">{t('AddCategoryForm.CategoryNameLabel')}</label>
            </FloatLabel>
            <Button width={'7rem'} label={t('AddCategoryForm.CreateButtonLabel')} onButtonClick={handleSubmit} />
            {errors.name && <div style={{ color: 'red' }}>{t('AddCategoryForm.ErrorMessage')}</div>}
        </div>
    );
};

export default AddCategoryForm;
