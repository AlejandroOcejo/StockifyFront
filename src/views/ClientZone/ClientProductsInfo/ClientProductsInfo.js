import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ClientLayout from '../../../components/Layouts/ClientLayout/ClientLayout';
import ClientProductsTable from '../../../components/ClienZoneComponents/ClientProductsTable/ClientProductsTable';
const ClientProductsInfo = () => {
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
            <ClientProductsTable />
        </ClientLayout>
    );
};

export default ClientProductsInfo;
