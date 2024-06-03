import React, { useState } from 'react'
import Button from '../../CommonComponents/Button/Button'
import CreateUserForm from './CreateUserForm.js/CreateUserForm'

const CreateUser = () => {


    return (
        <div className='flex flex-col items-center gap-8'>
            <span className='text-2xl items-center font-semibold'>
                Crear Usuario
            </span>
            <CreateUserForm />
            <Button width={'7rem'} label={'Crear'} />
        </div>
    )
}

export default CreateUser
