import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../CommonComponents/Button/Button';
import RemoveButton from '../../CommonComponents/RemoveButton/RemoveButton';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import Spacer from '../../CommonComponents/Spacer/Spacer';
import { getCategories } from '../../../state/categorySlicer';
import { removeProduct, updateProduct } from '../../../state/productSlicer';
import Switch from '../../CommonComponents/Switch/Switch';
import ProductCardMovementsInfo from './ProductCardInfo/ProductCardMovementsInfo';
import UpdateButton from '../../CommonComponents/UpdateButton/UpdateButton';
import { toast } from 'react-toastify';

const ProductCard = ({ product, inventoryId, closeDialog }) => {
    const { t } = useTranslation('global');
    const dispatch = useDispatch();
    const availableCategories = useSelector(state => state.category.categories);
    const [view, setView] = useState('details');
    const [step, setStep] = useState('0');
    const [formData, setFormData] = useState({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: 0,
        categoryNames: product.categories ? product.categories.map(cat => cat.name) : []
    });
    const [quantityInput, setQuantityInput] = useState(0);
    const [switchIsOn, setSwitchIsOn] = useState(false);
    const [errors, setErrors] = useState({
        name: false,
        description: false,
        price: false,
        categoryNames: false
    });

    useEffect(() => {
        dispatch(getCategories(inventoryId));
    }, [dispatch, inventoryId]);

    const handleDelete = async () => {
        let id = product.id;
        try {
            await dispatch(removeProduct({ id, inventoryId })).unwrap();
            toast.success(t('toast.product_delete_success'));
            closeDialog();
        } catch (error) {
            toast.error(t('toast.product_delete_error'));
        }
    };

    const handleUpdateOptions = () => {
        setView('updateOptions');
    };

    const handleQuantityUpdate = () => {
        setStep('0');
        setView('update');
    };

    const handleInfoUpdate = () => {
        setStep('1');
        setView('update');
    };

    const handleMovements = () => {
        setView('movements');
    };

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

    const handleQuantityInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantityInput(value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            quantity: switchIsOn ? value : -value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            quantity: isNaN(value)
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryNames = e.value.map(category => category.name);
        setFormData((prevFormData) => ({
            ...prevFormData,
            categoryNames: selectedCategoryNames,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            categoryNames: selectedCategoryNames.length === 0
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let id = product.id;

        try {
            await dispatch(updateProduct({ id, formData, inventoryId })).unwrap();
            toast.success(t('toast.product_update_success'));
            closeDialog();
        } catch (error) {
            toast.error(t('toast.product_update_error'));
        }
    };

    return (
        <div className='flex flex-col gap-5'>
            {view === 'details' && (
                <>
                    <div className='flex items-center justify-center text-3xl font-bold'>{product.name}</div>
                    <div className="flex flex-col justify-center h-full w-full">
                        <div>
                            <p><strong>{t('product.id')}:</strong> {product.id}</p>
                            <p><strong>{t('product.description')}:</strong> {product.description}</p>
                            <p><strong>{t('product.price')}:</strong> {product.price}</p>
                            <p><strong>{t('product.quantity')}:</strong> {product.quantity}</p>
                            <p><strong>{t('product.categories')}:</strong> {product.categories ? product.categories.map(cat => cat.name).join(', ') : ''}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-3 items-center md:items-start'>
                        <Button width={'8rem'} onButtonClick={handleMovements} label={t('product.movements')} />
                        <UpdateButton width={'8rem'} onButtonClick={handleUpdateOptions} label={t('product.update')} />
                        <RemoveButton width={'8rem'} onButtonClick={handleDelete} label={t('product.delete')} />
                    </div>
                </>
            )}
            {view === 'updateOptions' && (
                <>
                    <div className='flex items-center justify-center text-3xl font-bold'>{t('product.update')} {product.name}</div>
                    <div className="flex flex-col justify-center h-full w-full">
                        <div>
                            <p><strong>{t('product.id')}:</strong> {product.id}</p>
                            <p><strong>{t('product.description')}:</strong> {product.description}</p>
                            <p><strong>{t('product.price')}:</strong> {product.price}</p>
                            <p><strong>{t('product.quantity')}:</strong> {product.quantity}</p>
                            <p><strong>{t('product.categories')}:</strong> {product.categories ? product.categories.map(cat => cat.name).join(', ') : ''}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-3 items-center md:items-start'>
                        <Button width={'8rem'} onButtonClick={() => setView('details')} icon={'/flecha.png'} label={t('product.return')} />
                        <Button width={'8rem'} onButtonClick={handleQuantityUpdate} label={t('product.update_quantity')} />
                        <Button width={'8rem'} onButtonClick={handleInfoUpdate} label={t('product.update_information')} />
                    </div>
                </>
            )}
            {view === 'movements' && (
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex items-center justify-center text-3xl font-bold mb-8'>{t('product.movements')}</div>
                    <ProductCardMovementsInfo id={product.id} style />
                    <Button width={'7rem'} onButtonClick={() => setView('details')} icon={'/flecha.png'} label={t('product.return')} />
                </div>
            )}
            {view === 'update' && step === '0' && (
                <>
                    <div className='flex items-center justify-center text-3xl font-bold'>{t('product.update_quantity')}</div>
                    <Spacer />
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <span className={`text-xl font-semibold ${switchIsOn ? 'text-gray-500' : 'text-red-500'}`}>{t('product.remove')}</span>
                        <Switch isOn={switchIsOn} handleToggle={() => setSwitchIsOn(!switchIsOn)} offColor="bg-red-500" />
                        <span className={`text-xl font-semibold ${switchIsOn ? 'text-green-500' : 'text-gray-500'}`}>{t('product.add')}</span>
                    </div>
                    <FloatLabel className="w-full mt-4">
                        <InputText
                            id="quantity"
                            value={quantityInput}
                            name="quantity"
                            onChange={handleQuantityInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.quantity ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="quantity">{t('product.quantity')}</label>
                    </FloatLabel>
                    <Spacer />
                    <div className='flex flex-col md:flex-row gap-3 items-center md:items-start'>
                        <Button width={'8rem'} onButtonClick={handleUpdateOptions} icon={'/flecha.png'} label={t('product.return')} />
                        <UpdateButton width={'8rem'} onButtonClick={handleSubmit} label={t('product.update')} />
                    </div>
                </>
            )}
            {view === 'update' && step === '1' && (
                <form onSubmit={handleSubmit} className="container mx-auto p-4">
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
                                <label htmlFor="name">{t('product.name')}</label>
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
                                <label htmlFor="description">{t('product.description')}</label>
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
                                    className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.price ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                                />
                                <label htmlFor="price">{t('product.price')}</label>
                            </FloatLabel>
                        </div>
                        <div className="flex justify-center flex-col">
                            <MultiSelect
                                value={availableCategories.filter(cat => formData.categoryNames.includes(cat.name))}
                                options={availableCategories}
                                onChange={handleCategoryChange}
                                optionLabel="name"
                                filter
                                placeholder={t('product.select_categories')}
                                maxSelectedLabels={3}
                                className={`rounded-xl fixed-height ${errors.categoryNames ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                            />
                            {errors.categoryNames && <div style={{ color: 'red' }}>{t('product.select_at_least_one_category')}</div>}
                        </div>
                    </div>
                    <Spacer height={'2rem'} />
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-center md:items-start">
                        <Button width={'8rem'} onButtonClick={() => setView('updateOptions')} icon={'/flecha.png'} label={t('product.return')} />
                        <Button width={'8rem'} onButtonClick={handleSubmit} label={t('product.save')} type="submit" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProductCard;
