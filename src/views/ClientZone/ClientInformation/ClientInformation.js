import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ClientLayout from '../../../components/Layouts/ClientLayout/ClientLayout';
import ClientInfoCards from '../../../components/ClienZoneComponents/ClientInfoCards/ClientInfoCards';

const ClientInformation = () => {
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
            <ClientInfoCards />
        </ClientLayout>
    );
};

export default ClientInformation;
