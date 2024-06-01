import React, { useState } from 'react'
import RemoveInventory from '../../RemoveInventory/RemoveInventory'
import Button from '../../../CommonComponents/Button/Button'

const InventoryCardInfo = props => {
    const id = props.item.id

    const [isRemove, setIsremove] = useState(false)

    const handleClickRemove = () => {
        setIsremove(true)
        console.log(id);
    }


    return (
        <>
            {isRemove ? <RemoveInventory id={id} /> : <div className='flex flex-col p-4'>
                <div>Nombre: {props.item.name}</div>
                <div>Descrición: {props.item.description}</div>
                <div>Localización: {props.item.location}</div>
                <Button label={'Acceder'} />
                <div onClick={handleClickRemove} className='hover:text-red-700 font-bold'>Eliminar</div>
            </div>}
        </>
    )
}

export default InventoryCardInfo