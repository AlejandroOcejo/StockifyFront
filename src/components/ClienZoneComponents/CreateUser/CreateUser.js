import React from 'react'
import CreateUserForm from './CreateUserForm.js/CreateUserForm'
import { useTranslation } from 'react-i18next'

const CreateUser = ({ closeDialog }) => {
    const [t] = useTranslation('global');

    return (
        <div className='flex flex-col items-center gap-8'>
            <span className='text-2xl items-center font-semibold'>
                {t('CreateUser.Title')}
            </span>
            <CreateUserForm closeDialog={closeDialog} />
        </div>
    );
};

export default CreateUser;
