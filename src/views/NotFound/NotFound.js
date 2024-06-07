import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout/DefaultLayout';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
            </div>
        </DefaultLayout>
    );
};

export default NotFound;
