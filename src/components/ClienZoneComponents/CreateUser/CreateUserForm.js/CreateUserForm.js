import React, { useState } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import Button from '../../../CommonComponents/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserNotTenant } from '../../../../state/registerSlicer';
import emailjs from 'emailjs-com';
import { getUsers } from '../../../../state/userSlicer';
import { useTranslation } from 'react-i18next';

const CreateUserForm = ({ closeDialog }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.register);
    const [t] = useTranslation('global');
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        tenantName: localStorage.getItem('username'),
    });

    const [errors, setErrors] = useState({
        name: false,
        lastName: false,
        email: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value === ''
        }));
    };

    const generateRandomPassword = (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    };

    const sendMail = (email, name, password, tenantName) => {
        const templateParams = {
            user_name: name,
            user_email: email,
            user_password: password,
            tenant_name: tenantName,
        };

        emailjs.send('service_gyf1sf9', 'template_buvq5ss', templateParams, 'orgiuFcj7SzraGVMv')
            .then((response) => {
            }, (error) => {
                console.error('Error al enviar el correo:', error);
            });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const randomPassword = generateRandomPassword(12);
        const updatedFormData = { ...formData, password: randomPassword };

        try {
            const response = await dispatch(registerUserNotTenant(updatedFormData)).unwrap();
            if (response && response.success) {
                sendMail(updatedFormData.email, updatedFormData.name, randomPassword, updatedFormData.tenantName);
                dispatch(getUsers())
                closeDialog();
            } else {
                console.error('Error al crear la cuenta:', response.error);
            }
        } catch (error) {
            console.error('Error al crear la cuenta:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="name"
                            value={formData.name}
                            name="name"
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.name ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="name">{t('CreateUserForm.NameLabel')}</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="lastname"
                            value={formData.lastName}
                            name="lastName"
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.lastName ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="lastname">{t('CreateUserForm.LastNameLabel')}</label>
                    </FloatLabel>
                </div>
            </div>
            <div className="md:grid-cols-2 gap-6 my-6">
                <div>
                    <FloatLabel className="w-full">
                        <InputText
                            id="email"
                            value={formData.email}
                            name="email"
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-none focus:ring-0 ${errors.email ? 'border-red-500' : 'border-[#A0AFFF]'}`}
                        />
                        <label htmlFor="email">{t('CreateUserForm.EmailLabel')}</label>
                    </FloatLabel>
                </div>
            </div>
            <div className="flex justify-center">
                <Button width={'10rem'} label={t('CreateUserForm.CreateButtonLabel')} onButtonClick={handleSubmit} disabled={loading} />
            </div>
        </div>
    );
};

export default CreateUserForm;
