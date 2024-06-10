import React, { useState, useEffect } from 'react';
import Button from '../../../CommonComponents/Button/Button';
import Spacer from '../../../CommonComponents/Spacer/Spacer';
import { addInventory } from '../../../../state/inventorySlicer';
import { addProduct } from '../../../../state/productSlicer';
import { ColorPicker } from 'primereact/colorpicker';
import { useDispatch } from 'react-redux';
import { uploadImageToS3 } from '../../../../awsS3';
import { FileUpload } from 'primereact/fileupload';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import * as XLSX from 'xlsx';
import './AddInventoryForm.css';
import { addCategory } from '../../../../state/categorySlicer';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { translateExcelData } from '../../../../openAIServices';

const AddInventoryForm = ({ closeDialog }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation('global');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (loading) {
      toast.info(t('toast.loading'), { toastId: 'loadingToast' });
    } else {
      toast.dismiss('loadingToast');
    }
  }, [loading, t]);

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
    setLoading(true);
    const currentDate = new Date().toISOString();

    const saveInventory = async (imageLocation) => {
      try {
        const newInventory = await dispatch(addInventory({ ...formData, image: imageLocation, creationDate: currentDate }));
        const inventoryId = newInventory.payload.id;
        if (inventoryId !== undefined) {
          await uploadProducts(inventoryId);
          toast.success(t('toast.create_inventory_success'));
          setLoading(false);
          closeDialog();
        }
        toast.error(t('toast.create_inventory_error_max'));
        setLoading(false);
        closeDialog();
      } catch (error) {
        toast.error(t('toast.create_inventory_error_max'));
        setLoading(false);
      }
    };

    if (imageFile) {
      uploadImageToS3(imageFile, async (err, location) => {
        if (!err) {
          await saveInventory(location);
        } else {
          toast.error(t('toast.upload_image_error'));
          setLoading(false);
        }
      });
    } else {
      await saveInventory('');
    }
  };

  const uploadProducts = async (inventoryId) => {
    try {
      const translatedData = await translateExcelData(excelData);
      const AIdata = translatedData.inventory;
      console.log(AIdata);

      const categorySet = new Set();
      const categoryMap = {};

      for (const product of AIdata) {
        const categories = product.categories || [];
        for (const category of categories) {
          if (!categorySet.has(category)) {
            categorySet.add(category);
            const formData = {
              name: category,
              inventoryId: inventoryId,
            };
            const result = await dispatch(addCategory({ formData }));
            categoryMap[category] = result.payload.id;
          }
        }
      }

      for (const product of AIdata) {
        const priceString = product.price ? product.price.replace(/[^\d.]/g, '') : '0';
        const price = parseFloat(priceString) || 0;

        const productData = {
          name: product.product || 'No especificado en la importación',
          description: product.description || 'No especificado en la importación',
          price: price,
          quantity: product.quantity || 0,
          inventoryId: inventoryId,
          categoriesId: product.categories ? product.categories.map(cat => categoryMap[cat]) : [],
        };

        await dispatch(addProduct(productData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className='flex items-center justify-center text-3xl font-bold'>{t('AddInventoryForm.Title')}</div>
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
              <img className="w-14 h-auto" alt={t('AddInventoryForm.AddButtonAlt')} src="anadirBlack.png" />
            )}
          </label>
        </div>
        <div className="flex flex-col gap-7">
          <FloatLabel>
            <InputText
              id="name"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              className="w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
            />
            <label htmlFor="name">{t('AddInventoryForm.NameLabel')}</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="location"
              value={formData.location}
              name="location"
              onChange={handleInputChange}
              className="w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
            />
            <label htmlFor="location">{t('AddInventoryForm.LocationLabel')}</label>
          </FloatLabel>
        </div>
      </div>
      <FloatLabel>
        <InputText
          id="description"
          value={formData.description}
          name="description"
          onChange={handleInputChange}
          className="w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 border-[#A0AFFF]"
        />
        <label htmlFor="description">{t('AddInventoryForm.DescriptionLabel')}</label>
      </FloatLabel>
      <Spacer height={"1rem"} />
      <div className='flex flex-row justify-between '>
        <div className="flex flex-row items-center gap-4">
          <span>{t('AddInventoryForm.ColorLabel')}:</span>
          <ColorPicker value={color} onChange={(e) => setColor(e.value)} />
        </div>
        <div className="flex justify-center self-center">
          <FileUpload mode="basic" name="demo[]" accept=".xlsx, .xls" maxFileSize={1000000} onSelect={handleExcelUpload} chooseLabel={t('AddInventoryForm.ImportLabel')} />
        </div>
      </div>
      <Spacer height={"1rem"} />
      <div className="flex justify-center">
        <Button width={'14rem'} label={t('AddInventoryForm.ContinueButton')} onButtonClick={handleSubmit} disabled={loading} />
      </div>
    </div>
  );
};

export default AddInventoryForm;
