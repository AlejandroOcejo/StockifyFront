import React, { useState, useEffect } from 'react';
import Button from '../../../CommonComponents/Button/Button';
import Spacer from '../../../CommonComponents/Spacer/Spacer';
import { addInventory } from '../../../../state/inventorySlicer';
import { ColorPicker } from 'primereact/colorpicker';
import { useDispatch } from 'react-redux';
import { uploadImageToS3 } from '../../../../awsS3';

const AddInventoryForm = ({ closeDialog }) => {
  const dispatch = useDispatch();

  const [color, setColor] = useState('#52489C');
  const [formData, setFormData] = useState({
    name: '',
    creationDate: '',
    description: '',
    color: '#52489C',
    image: '',
    location: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: color,
    }));
  }, [color]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString();
    if (imageFile) {
      uploadImageToS3(imageFile, (err, location) => {
        if (!err) {
          dispatch(addInventory({ ...formData, image: location, creationDate: currentDate }));
          closeDialog();
        }
      });
    } else {
      dispatch(addInventory({ ...formData, creationDate: currentDate }));
      closeDialog();
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className='flex items-center justify-center text-3xl font-bold'>Creación de inventario</div>
      <div className="flex flex-row items-center justify-center gap-8 p-2">
        <div
          className="flex w-32 h-32 flex-col border-4 border-dashed gap-8 bg-[#F3F3F3] text-center rounded-full justify-center items-center cursor-pointer"
          style={{ borderColor: color ? `#${color}` : '#4c51bf' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="cursor-pointer flex flex-col justify-center items-center w-full h-full">
            {imagePreview ? (
              <img className="w-28 h-28 rounded-full" alt="preview" src={imagePreview} />
            ) : (
              <img className="w-14 h-auto" alt="añadir" src="anadirBlack.png" />
            )}
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <input
            className="p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
            placeholder="Nombre del inventario"
            name="name"
            value={formData.name}
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
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <input
        className="p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
        placeholder="Localización"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
      />
      <Spacer height={'1rem'} />
      <div className="flex justify-center">
        <Button width={'14rem'} label={'Continuar'} onButtonClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddInventoryForm;
