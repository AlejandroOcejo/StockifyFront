import React, { useState } from 'react'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'

const AddCategoryForm = () => {
    const [formData, setFormData] = useState({
        categoryName: ''
    })

    const [errors, setErrors] = useState({
        categoryName: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value === ''
        }));
    }

    return (
        <div>
            <FloatLabel>
                <InputText
                    id="categoryName"
                    value={formData.categoryName}
                    name="categoryName"
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${errors.categoryName ? 'border-red-500' : 'border-[#A0AFFF]'
                        }`}
                />
                <label htmlFor="categoryName">Nombre de categoría</label>
            </FloatLabel>
            {errors.categoryName && <div style={{ color: 'red' }}>Rellene todos los campos</div>}
        </div>
    )
}

export default AddCategoryForm
