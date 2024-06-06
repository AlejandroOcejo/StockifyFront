import React from 'react'
import CreateUserForm from './CreateUserForm.js/CreateUserForm'

const CreateUser = ({ closeDialog }) => {
    return (
        <div className='flex flex-col items-center gap-8'>
            <span className='text-2xl items-center font-semibold'>
                Crear Usuario
            </span>
            <CreateUserForm closeDialog={closeDialog} />
        </div>
    );
};

export default CreateUser;
