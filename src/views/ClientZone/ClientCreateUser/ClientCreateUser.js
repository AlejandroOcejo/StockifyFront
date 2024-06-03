import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ClientLayout from '../../../components/Layouts/ClientLayout/ClientLayout';

const ClientCreateUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            //dispatch(añadir usuario);
        } else {
            navigate('/login');
        }
    }, [dispatch]);

    return (
        <ClientLayout>
        </ClientLayout>
    );
};

export default ClientCreateUser;
