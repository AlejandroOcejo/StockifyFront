import React, { useState } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './AddProductForm.css';
import Button from '../../../CommonComponents/Button/Button';
import Spacer from '../../../CommonComponents/Spacer/Spacer';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../../state/productSlicer';

const AddProductForm = () => {
    const dispatch = useDispatch();
    const categoriesMock = [
        { name: "Categoria 1", id: "1" },
        { name: "Categoria 2", id: "CAT2" },
        { name: "Categoria 3", id: "CAT3" },
        { name: "Categoria 4", id: "CAT4" },
    ];

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        inventoryId: "",
        categoriesId: []
    });

    const [errors, setErrors] = useState({
        name: false,
        description: false,
        price: false,
        quantity: false,
        inventoryId: false,
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
            categoriesId: selectedCategoryIds.length === 0
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(addProduct(formData));
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
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="quantity"
                            value={formData.quantity}
                            name="quantity"
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.quantity ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="quantity">Cantidad</label>
                    </FloatLabel>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="inventoryId"
                            value={formData.inventoryId}
                            name="inventoryId"
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.inventoryId ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="inventoryId">ID de Inventario</label>
                    </FloatLabel>
                </div>
                <div className="w-full">
                    <MultiSelect
                        value={formData.categoriesId.map(id => categoriesMock.find(category => category.id === id))}
                        options={categoriesMock}
                        onChange={handleCategoryChange}
                        optionLabel="name"
                        filter
                        placeholder="Seleccionar Categorías"
                        maxSelectedLabels={3}
                        className={`rounded-xl fixed-height w-full ${errors.categoriesId ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                    />
                    {errors.categoriesId && <div style={{ color: 'red' }}>Seleccione al menos una categoría</div>}
                </div>
            </div>
            <Spacer height={'4rem'} />
            <div className="flex justify-center">
                <Button width={'10rem'} label={'Crear'} onButtonClick={handleSubmit} />
            </div>
        </div>
    );
};

export default AddProductForm;
