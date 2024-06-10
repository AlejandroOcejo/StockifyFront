import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './AddProductForm.css';
import Button from '../../../CommonComponents/Button/Button';
import Spacer from '../../../CommonComponents/Spacer/Spacer';
import { addProduct } from '../../../../state/productSlicer';
import { getCategories } from '../../../../state/categorySlicer';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const AddProductForm = ({ inventoryId, onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    const [t] = useTranslation('global');

    useEffect(() => {
        dispatch(getCategories(inventoryId));
    }, [dispatch, inventoryId]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        inventoryId: inventoryId,
        categoriesId: []
    });

    const [errors, setErrors] = useState({
        name: false,
        description: false,
        price: false,
        quantity: false,
        categoriesId: false
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

    const handleCategoryChange = (e) => {
        const selectedCategoryIds = e.value.map(category => category.id);
        setFormData((prevFormData) => ({
            ...prevFormData,
            categoriesId: selectedCategoryIds,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            categoriesId: false
        }));
    };

    const handleNumericInput = (event) => {
        if (!/^\d*\.?\d*$/.test(event.key)) {
            event.preventDefault();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {
            name: formData.name === '',
            description: formData.description === '',
            price: formData.price === '',
            quantity: formData.quantity === '',
            categoriesId: formData.categoriesId.length === 0
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        try {
            await dispatch(addProduct(formData));
            toast.success(t('toast.create_product_success'));
            onClose();
        } catch (error) {
            toast.error(t('toast.create_product_error'));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="name"
                            value={formData.name}
                            name="name"
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.name ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="name">{t('AddProductForm.NameLabel')}</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="description"
                            value={formData.description}
                            name="description"
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.description ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="description">{t('AddProductForm.DescriptionLabel')}</label>
                    </FloatLabel>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="price"
                            value={formData.price}
                            name="price"
                            onChange={handleInputChange}
                            onKeyPress={handleNumericInput}
                            inputMode="decimal"
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.price ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="price">{t('AddProductForm.PriceLabel')}</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="quantity"
                            value={formData.quantity}
                            name="quantity"
                            onChange={handleInputChange}
                            onKeyPress={handleNumericInput}
                            inputMode="numeric"
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.quantity ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="quantity">{t('AddProductForm.QuantityLabel')}</label>
                    </FloatLabel>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div className="w-full">
                    <MultiSelect
                        value={formData.categoriesId.map(id => categories.find(category => category.id === id))}
                        options={categories}
                        onChange={handleCategoryChange}
                        optionLabel="name"
                        filter
                        placeholder={t('AddProductForm.SelectCategoriesPlaceholder')}
                        maxSelectedLabels={3}
                        className={`rounded-xl fixed-height w-full ${errors.categoriesId ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                    />
                    {errors.categoriesId && <div style={{ color: 'red' }}>{t('AddProductForm.SelectAtLeastOneCategoryError')}</div>}
                </div>
            </div>
            <Spacer height={'4rem'} />
            <div className="flex justify-center">
                <Button width={'10rem'} label={t('AddProductForm.CreateButtonLabel')} onButtonClick={handleSubmit} />
            </div>
        </div>
    );
};

export default AddProductForm;
