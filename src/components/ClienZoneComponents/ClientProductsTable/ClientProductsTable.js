import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import './ClientProductsTable.css';
import Button from '../../CommonComponents/Button/Button';
import Dialog from '../../CommonComponents/Dialog/Dialog';
import AddProduct from '../AddProduct/AddProduct';
const ClientProductsTable = () => {
    const [isActive, setActive] = useState(false)
    const handleAddClick = () => {
        setActive(!isActive);
    };
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
        const fetchProducts = () => {
            const hardcodedProducts = [
                { id: '1', code: 'P001', name: 'Product 1', category: 'Category 1', quantity: 10 },
                { id: '2', code: 'P002', name: 'Product 2', category: 'Category 2', quantity: 20 },
                { id: '3', code: 'P003', name: 'Product 3', category: 'Category 3', quantity: 30 },
                { id: '4', code: 'P004', name: 'Product 4', category: 'Category 4', quantity: 40 },
                { id: '5', code: 'P005', name: 'Product 5', category: 'Category 5', quantity: 50 },
                { id: '6', code: 'P006', name: 'Product 6', category: 'Category 6', quantity: 60 },
                { id: '7', code: 'P007', name: 'Product 7', category: 'Category 7', quantity: 70 },
                { id: '8', code: 'P008', name: 'Product 8', category: 'Category 8', quantity: 80 },
                { id: '9', code: 'P009', name: 'Product 9', category: 'Category 9', quantity: 90 },
                { id: '10', code: 'P010', name: 'Product 10', category: 'Category 10', quantity: 100 },
                { id: '11', code: 'P011', name: 'Product 11', category: 'Category 11', quantity: 110 },
                { id: '12', code: 'P012', name: 'Product 12', category: 'Category 12', quantity: 120 },
                { id: '13', code: 'P013', name: 'Product 13', category: 'Category 13', quantity: 130 },
                { id: '14', code: 'P014', name: 'Product 14', category: 'Category 14', quantity: 140 },
                { id: '15', code: 'P015', name: 'Product 15', category: 'Category 15', quantity: 150 },
                { id: '16', code: 'P016', name: 'Product 16', category: 'Category 16', quantity: 160 },
                { id: '17', code: 'P017', name: 'Product 17', category: 'Category 17', quantity: 170 },
                { id: '18', code: 'P018', name: 'Product 18', category: 'Category 18', quantity: 180 },
                { id: '19', code: 'P019', name: 'Product 19', category: 'Category 19', quantity: 190 },
                { id: '20', code: 'P020', name: 'Product 20', category: 'Category 20', quantity: 200 },
            ];
            setProducts(hardcodedProducts);
        };

        fetchProducts();
    }, []);


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between">
                <Button label={'Añadir producto'} onButtonClick={handleAddClick} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className='rounded-xl' type="search" onInput={onGlobalFilterChange} placeholder="Search..." />
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
                    content={<AddProduct />}
                />
            ) : null}
            <div className="card">
                <DataTable value={products} paginator rows={10} dataKey="id" filters={filters} globalFilterFields={['code', 'name', 'category', 'quantity']} header={header} emptyMessage="No products found." selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }} />
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }} />
                    <Column field="category" header="Category" sortable style={{ minWidth: '12rem' }} />
                    <Column field="quantity" header="Quantity" sortable style={{ minWidth: '12rem' }} />
                </DataTable>
            </div>
        </>
    );
}

export default ClientProductsTable;
