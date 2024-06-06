import React, { useState } from 'react'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import Button from '../../CommonComponents/Button/Button'
import { addCategory } from '../../../state/categorySlicer'
import { useDispatch } from 'react-redux'

const AddCategoryForm = ({ inventoryId, onSubmit }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: '',
        inventoryId: inventoryId
    })

    const [errors, setErrors] = useState({
        name: false,
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value === ''
        }))
    }

    const handleSubmit = () => {
        if (formData.name === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: true
            }))
            return
        }
        dispatch(addCategory({ formData }))
        onSubmit()
    }

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
                <label htmlFor="name">Nombre de categoría</label>
            </FloatLabel>
            <Button width={'7rem'} label={'Crear'} onButtonClick={handleSubmit} />
            {errors.name && <div style={{ color: 'red' }}>Rellene todos los campos</div>}
        </div>
    )
}

export default AddCategoryForm