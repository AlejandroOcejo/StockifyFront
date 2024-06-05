import React, { useState } from 'react'
import Button from '../../CommonComponents/Button/Button'
import AddCategoryForm from '../AddCategory/AddCategoryForm'
import AddProductForm from './AddProductForm/AddProductForm'
const AddProduct = () => {

    const [isNew, setNew] = useState(false)
    const [isNotNew, setNotNew] = useState(false)

    const handleNewButtonClick = () => {
        setNew(true)
        setNotNew(false)
    }

    const handleNotNewButtonClick = () => {
        setNew(false)
        setNotNew(true)
    }

    return (
        <div className='flex flex-col items-center gap-8'>
            {isNotNew === false ? <span className='text-2xl items-center font-semibold'>
                Categoría
            </span> : <span className='text-2xl items-center font-semibold'>
                Producto
            </span>}
            {isNew === false && isNotNew === false ? <div className='flex flex-row gap-4'>
                <Button width={'8rem'} label={'Nueva'} onButtonClick={handleNewButtonClick} />
                <Button width={'8rem'} label={'Existente'} onButtonClick={handleNotNewButtonClick} />
            </div> : null}
            {isNew && <div className='flex flex-col gap-6 items-center'>
                <AddCategoryForm />
            </div>}
            {isNotNew && <AddProductForm />}
        </div>
    )
}

export default AddProduct
