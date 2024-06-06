import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const ProductCard = ({ product, inventoryId, closeDialog }) => {
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

    const handleDelete = () => {
        let id = product.id
        dispatch(removeProduct({ id, inventoryId }))
        closeDialog();
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

    const handleSubmit = (event) => {
        event.preventDefault();
        let id = product.id;
        try {
            dispatch(updateProduct({ id, formData, inventoryId })).then(() => {
                closeDialog();
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col gap-5'>
            {view === 'details' && (
                <>
                    <div className='flex items-center justify-center text-3xl font-bold'>{product.name}</div>
                    <div className="flex flex-col justify-center h-full w-full">
                        <div>
                            <p><strong>ID:</strong> {product.id}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Price:</strong> {product.price}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Categories:</strong> {product.categories ? product.categories.map(cat => cat.name).join(', ') : ''}</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-3'>
                        <Button width={'8rem'} onButtonClick={handleMovements} label={"Movimientos"} />
                        <Button width={'8rem'} onButtonClick={handleUpdateOptions} label={"Actualizar"} />
                        <RemoveButton width={'8rem'} onButtonClick={handleDelete} label={"Borrar"} />
                    </div>
                </>
            )}
            {view === 'updateOptions' && (
                <>
                    <div className='flex items-center justify-center text-3xl font-bold'>Actualizar {product.name}</div>
                    <div className="flex flex-col justify-center h-full w-full">
                        <div>
                            <p><strong>ID:</strong> {product.id}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Price:</strong> {product.price}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Categories:</strong> {product.categories ? product.categories.map(cat => cat.name).join(', ') : ''}</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-3'>
                        <Button width={'8rem'} onButtonClick={() => setView('details')} label={"Volver"} />
                        <Button width={'8rem'} onButtonClick={handleQuantityUpdate} label={"Cantidad"} />
                        <Button width={'8rem'} onButtonClick={handleInfoUpdate} label={"Información"} />
                    </div>
                </>
            )}
            {view === 'movements' && (
                <div className='flex flex-col justify-center items-center'>
                    <h3>Movimientos</h3>
                    <ProductCardMovementsInfo id={product.id} />
                    <Button width={'7rem'} onButtonClick={() => setView('details')} label={"Volver"} />
                </div>
            )}
            {view === 'update' && step === '0' && (
                <>
                    <div className='flex items-center justify-center text-3xl font-bold'>Actualizar cantidad</div>
                    <Spacer />
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <span className={`text-xl font-semibold ${switchIsOn ? 'text-gray-500' : 'text-red-500'}`}>Retirar</span>
                        <Switch isOn={switchIsOn} handleToggle={() => setSwitchIsOn(!switchIsOn)} offColor="bg-red-500" />
                        <span className={`text-xl font-semibold ${switchIsOn ? 'text-green-500' : 'text-gray-500'}`}>Añadir</span>
                    </div>
                    <FloatLabel className="w-full mt-4">
                        <InputText
                            id="quantity"
                            value={quantityInput}
                            name="quantity"
                            onChange={handleQuantityInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.quantity ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="quantity">Cantidad</label>
                    </FloatLabel>
                    <Spacer />
                    <div className='flex flex-row gap-3'>
                        <Button width={'8rem'} onButtonClick={handleUpdateOptions} label={"Cancelar"} />
                        <Button width={'8rem'} onButtonClick={handleSubmit} label={"Actualizar"} />
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
                                <label htmlFor="name">Nombre</label>
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
                                <label htmlFor="description">Descripción</label>
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
                                <label htmlFor="price">Precio</label>
                            </FloatLabel>
                        </div>
                        <div className="flex justify-center flex-col">
                            <MultiSelect
                                value={availableCategories.filter(cat => formData.categoryNames.includes(cat.name))}
                                options={availableCategories}
                                onChange={handleCategoryChange}
                                optionLabel="name"
                                filter
                                placeholder="Seleccionar Categorías"
                                maxSelectedLabels={3}
                                className={`rounded-xl fixed-height ${errors.categoryNames ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                            />
                            {errors.categoryNames && <div style={{ color: 'red' }}>Seleccione al menos una categoría</div>}
                        </div>
                    </div>
                    <Spacer height={'2rem'} />
                    <div className="flex justify-center gap-2">
                        <Button width={'8rem'} onButtonClick={() => setView('updateOptions')} label={"Cancelar"} />
                        <Button width={'8rem'} onButtonClick={handleSubmit} label={'Guardar'} type="submit" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProductCard;
