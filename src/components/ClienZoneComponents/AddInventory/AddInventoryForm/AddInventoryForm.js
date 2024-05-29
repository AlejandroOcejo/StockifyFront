import React, { useState, useEffect } from 'react';
import Button from '../../../CommonComponents/Button/Button';
import Spacer from '../../../CommonComponents/Spacer/Spacer';
import { ColorPicker } from 'primereact/colorpicker';

const AddInventoryForm = () => {
  const [color, setColor] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    contact: {
      surname: '',
      email: '',
      country: '',
      city: '',
      direction: '',
      postalCode: '',
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      if (name in prevFormData) {
        return {
          ...prevFormData,
          [name]: value,
        };
      } else if (name in prevFormData.contact) {
        return {
          ...prevFormData,
          contact: {
            ...prevFormData.contact,
            [name]: value,
          },
        };
      }
      return prevFormData;
    });
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex flex-row items-center justify-center gap-8">
        <div
          className="flex w-32 h-32 flex-col border-4 border-dashed gap-8 bg-[#F3F3F3] text-center rounded-full justify-center items-center cursor-pointer"
          style={{ borderColor: color ? `#${color}` : '#4c51bf' }} // Using inline style for border color
        >
          <img className="w-14 h-auto" alt="añadir" src="anadirBlack.png" />
        </div>
        <div className="flex flex-col gap-3">
          <input
            className="p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
            placeholder="Nombre del inventario"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            className="p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
            placeholder="Imagen"
            type="text"
            name="surname"
            value={formData.contact.surname}
            onChange={handleInputChange}
          />
          <div className="flex flex-row items-center gap-4">
            <span>Color:</span>
            <ColorPicker value={color} onChange={(e) => setColor(e.value)} />
          </div>
        </div>
      </div>
      <input
        className="p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
        placeholder="Descripción"
        type="text"
        name="surname"
        value={formData.contact.surname}
        onChange={handleInputChange}
      />
      <Spacer height={'3rem'} />
      <div className="flex justify-center">
        <Button width={'14rem'} label={'Continuar'} />
      </div>
    </div>
  );
};

export default AddInventoryForm;
