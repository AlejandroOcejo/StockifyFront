import React, { useState, useEffect } from 'react';
import Button from '../../../CommonComponents/Button/Button';
import Spacer from '../../../CommonComponents/Spacer/Spacer';
import { addInventory } from '../../../../state/inventorySlicer';
import { addProduct } from '../../../../state/productSlicer';
import { ColorPicker } from 'primereact/colorpicker';
import { useDispatch } from 'react-redux';
import { uploadImageToS3 } from '../../../../awsS3';
import { FileUpload } from 'primereact/fileupload';
import * as XLSX from 'xlsx';
import './AddInventoryForm.css';
import { addCategory } from '../../../../state/categorySlicer';

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
  const [excelData, setExcelData] = useState([]);

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

  const handleExcelUpload = (event) => {
    const file = event.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        setExcelData(jsonData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };
    reader.onerror = (error) => {
      console.error('Error loading the file:', error);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString();
    let inventoryId = null;

    if (imageFile) {
      uploadImageToS3(imageFile, async (err, location) => {
        if (!err) {
          const newInventory = await dispatch(addInventory({ ...formData, image: location, creationDate: currentDate }));
          inventoryId = newInventory.payload.id;
          await uploadProducts(inventoryId);
          closeDialog();
        }
      });
    } else {
      const newInventory = await dispatch(addInventory({ ...formData, creationDate: currentDate }));
      inventoryId = newInventory.payload.id;
      await uploadProducts(inventoryId);
      closeDialog();
    }
  };

  const uploadProducts = async (inventoryId) => {
    const categorySet = new Set();
    const categoryMap = {};

    for (const product of excelData) {
      const category = product.category;
      if (!categorySet.has(category)) {
        categorySet.add(category);
        const categories = {
          name: category,
          inventoryId: inventoryId
        };
        const result = await dispatch(addCategory(categories));
        categoryMap[category] = result.payload.id;
      }
    }

    for (const product of excelData) {
      const productData = {
        name: product.product || 'No especificado en la exportación',
        description: product.description || 'No especificado en la exportación',
        price: parseFloat(product.price?.replace('$', '')) || 0,
        quantity: product.quantity || 0,
        inventoryId: inventoryId,
        categoriesId: product.category ? [categoryMap[product.category]] : [],
      };
      dispatch(addProduct(productData));
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className='flex items-center justify-center text-3xl font-bold'>Creación de inventario</div>
      <div className="flex flex-row items-center justify-center gap-8 ">
        <div
          className="flex w-32 h-32 flex-col border-4 border-dashed gap-6 bg-[#F3F3F3] text-center rounded-full justify-center items-center cursor-pointer"
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
        <div className="flex flex-col gap-7">
          <input
            className="p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
            placeholder="Nombre del inventario"
            name="name"
            value={formData.name}
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
      <Spacer height={"1rem"} />
      <div className='flex flex-row justify-between '>
        <div className="flex flex-row items-center gap-4">
          <span>Color:</span>
          <ColorPicker value={color} onChange={(e) => setColor(e.value)} />
        </div>
        <div className="flex justify-center self-center">
          <FileUpload mode="basic" name="demo[]" accept=".xlsx, .xls" maxFileSize={1000000} onSelect={handleExcelUpload} chooseLabel="Importar" />
        </div>
      </div>
      <Spacer height={"1rem"} />
      <div className="flex justify-center">
        <Button width={'14rem'} label={'Continuar'} onButtonClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddInventoryForm;
