import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import Button from '../../CommonComponents/Button/Button';
import Dialog from '../../CommonComponents/Dialog/Dialog';
import { getProducts } from '../../../state/productSlicer';
import { useDispatch, useSelector } from 'react-redux';
import CreateUser from '../CreateUser/CreateUser';

const ClientUserTable = () => {
    const [isActive, setActive] = useState(false)
    const handleAddClick = () => {
        setActive(!isActive);
    };
    const inventoryItems = useSelector((state) => state.product.products);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchProducts = () => {
            dispatch(getProducts())
            setUsers(inventoryItems);
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
                <Button label={'Añadir Usuario'} onButtonClick={handleAddClick} />
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
                    content={<CreateUser />}
                />
            ) : null}
            <div className="card">
                <DataTable value={users} paginator rows={10} dataKey="id" filters={filters} globalFilterFields={['id', 'name', 'description', 'price', 'quantity', 'quantity']} header={header} emptyMessage="No products found." selectionMode="single" selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value)} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="id" sortable style={{ minWidth: '12rem' }} />
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }} />
                    <Column field="description" header="description" sortable style={{ minWidth: '12rem' }} />
                    <Column field="price" header="price" sortable style={{ minWidth: '12rem' }} />
                    <Column field="quantity" header="quantity" sortable style={{ minWidth: '12rem' }} />
                </DataTable>
            </div>
        </>
    );
}

export default ClientUserTable;
