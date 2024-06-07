import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import Button from '../../CommonComponents/Button/Button';
import Dialog from '../../CommonComponents/Dialog/Dialog';
import AddProduct from '../AddProduct/AddProduct';
import { getProducts } from '../../../state/productSlicer';
import { useDispatch, useSelector } from 'react-redux';
import './ClientProductsTable.css';
import { useParams, useLocation, useNavigate } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';
import { useTranslation } from 'react-i18next';

const ClientProductsTable = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const [t] = useTranslation('global');

    useEffect(() => {
        if (!state || !state.fromInventoryCard) {
            navigate('/client');
        }
    }, [state, navigate]);

    const [isActive, setActive] = useState(false);
    const [isProductActive, setisProductActive] = useState(false);
    const [products, setProducts] = useState();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filters, setFilters] = useState({
        'id': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'description': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'price': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'quantity': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'categories': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const { id: inventoryId } = useParams();

    const handleAddClick = () => {
        setActive(!isActive);
    };

    const dispatch = useDispatch();
    const inventoryItems = useSelector((state) => state.product.products);

    useEffect(() => {
        const fetchProducts = () => {
            dispatch(getProducts(inventoryId));
        };
        fetchProducts();
    }, [dispatch, inventoryId]);

    useEffect(() => {
        setProducts(inventoryItems);
    }, [inventoryItems]);

    useEffect(() => {
        if (selectedProduct !== null) {
            setisProductActive(true);
        }
    }, [selectedProduct]);

    const onFilterChange = (e, field) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters[field].value = value;
        setFilters(_filters);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between">
                <Button label={t('ClientProductsTable.AddProductButtonLabel')} onButtonClick={handleAddClick} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className='rounded-xl' type="search" onInput={onGlobalFilterChange} placeholder={t('ClientProductsTable.SearchPlaceholder')} style={{ maxWidth: '8rem' }} />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <>
            {isActive ? (
                <Dialog
                    closeDialog={handleAddClick}
                    content={<AddProduct inventoryId={inventoryId} onClose={handleAddClick} />}
                />
            ) : null}
            {isProductActive && selectedProduct ? (
                <Dialog
                    closeDialog={() => setisProductActive(false)}
                    content={<ProductCard product={selectedProduct} inventoryId={inventoryId} closeDialog={() => setisProductActive(false)} />}
                />
            ) : null}
            <div className="flex justify-center items-center h-full w-full p-4">
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <div className="card w-full">
                        <DataTable removableSort value={products} paginator rows={10} dataKey="id" filters={filters} header={header} emptyMessage={t('ClientProductsTable.EmptyMessage')} selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} className="w-full">
                            <Column field="id" header={t('ClientProductsTable.IDHeader')} sortable filter filterPlaceholder={t('ClientProductsTable.SearchByIDPlaceholder')} className="w-full md:w-auto" onFilterChange={(e) => onFilterChange(e, 'id')} body={(data) => <span className="block md:inline" data-header="ID">{data.id}</span>} />
                            <Column field="name" header={t('ClientProductsTable.NameHeader')} sortable filter filterPlaceholder={t('ClientProductsTable.SearchByNamePlaceholder')} className="w-full md:w-auto" onFilterChange={(e) => onFilterChange(e, 'name')} body={(data) => <span className="block md:inline" data-header="Name">{data.name}</span>} />
                            <Column field="description" header={t('ClientProductsTable.DescriptionHeader')} sortable filter filterPlaceholder={t('ClientProductsTable.SearchByDescriptionPlaceholder')} className="w-full md:w-auto" onFilterChange={(e) => onFilterChange(e, 'description')} body={(data) => <span className="block md:inline" data-header="Description">{data.description}</span>} />
                            <Column field="categories" header={t('ClientProductsTable.CategoriesHeader')} sortable filter filterPlaceholder={t('ClientProductsTable.SearchByCategoriesPlaceholder')} className="w-full md:w-auto" onFilterChange={(e) => onFilterChange(e, 'categories')} body={(data) => <span className="block md:inline" data-header="Categories">{data.categories ? data.categories.map(cat => cat.name).join(', ') : ''}</span>} />
                            <Column field="price" header={t('ClientProductsTable.PriceHeader')} sortable filter filterPlaceholder={t('ClientProductsTable.SearchByPricePlaceholder')} className="w-full md:w-auto" onFilterChange={(e) => onFilterChange(e, 'price')} body={(data) => <span className="block md:inline" data-header="Price">{data.price}</span>} />
                            <Column field="quantity" header={t('ClientProductsTable.QuantityHeader')} sortable filter filterPlaceholder={t('ClientProductsTable.SearchByQuantityPlaceholder')} className="w-full md:w-auto" onFilterChange={(e) => onFilterChange(e, 'quantity')} body={(data) => <span className="block md:inline" data-header="Quantity">{data.quantity}</span>} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientProductsTable;
