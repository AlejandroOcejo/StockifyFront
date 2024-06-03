import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import Button from '../../CommonComponents/Button/Button';
import Dialog from '../../CommonComponents/Dialog/Dialog';
import { getUsers } from '../../../state/userSlicer';
import { useDispatch, useSelector } from 'react-redux';
import CreateUser from '../CreateUser/CreateUser';

const ClientUserTable = () => {
    const [isActive, setActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const dispatch = useDispatch();
    const userItems = useSelector((state) => state.user.users);

    useEffect(() => {
        const fetchUsers = () => {
            dispatch(getUsers());
            setUsers(userItems);
        };
        fetchUsers();
    }, [dispatch, userItems]);

    const handleAddClick = () => {
        setActive(!isActive);
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
                <DataTable value={users} paginator rows={10} dataKey="id" filters={filters} globalFilterFields={['id', 'name', 'lastName', 'email', 'role']} header={header} emptyMessage="No users found." selectionMode="single" selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value)} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID" sortable style={{ minWidth: '12rem' }} />
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }} />
                    <Column field="lastName" header="Last Name" sortable style={{ minWidth: '12rem' }} />
                    <Column field="email" header="Email" sortable style={{ minWidth: '12rem' }} />
                    <Column field="role" header="Role" sortable style={{ minWidth: '12rem' }} />
                </DataTable>
            </div>
        </>
    );
}

export default ClientUserTable;
