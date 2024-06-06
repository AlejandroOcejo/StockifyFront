import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import Button from '../../CommonComponents/Button/Button';
import Dialog from '../../CommonComponents/Dialog/Dialog';
import RemoveButton from '../../CommonComponents/RemoveButton/RemoveButton';
import { getUsers, updateUser, deleteUser } from '../../../state/userSlicer';
import { useDispatch, useSelector } from 'react-redux';
import CreateUser from '../CreateUser/CreateUser';

const ClientUserTable = () => {
    const [isActive, setActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [editingRows, setEditingRows] = useState({});
    const dispatch = useDispatch();
    const userItems = useSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        setUsers(userItems);
    }, [userItems]);

    const handleAddClick = () => {
        setActive(!isActive);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const onRowEditChange = (e) => {
        setEditingRows(e.data);
    };

    const onRowEditComplete = (e) => {
        let _users = [...users];
        let { newData, index } = e;
        _users[index] = newData;
        setUsers(_users);
        dispatch(updateUser(newData));
    };

    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    };

    const deleteButtonTemplate = (rowData) => {
        return (
            <RemoveButton
                label="Borrar"
                onButtonClick={() => handleDelete(rowData.id)}
                width={'6rem'}
            />
        );
    };

    const roleEditor = (options) => {
        const roles = [
            { label: 'admin', value: 'admin' },
            { label: 'reader', value: 'reader' }
        ];

        return (
            <Dropdown value={options.value} options={roles} onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Role" />
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between">
                <Button label={'Añadir Usuario'} onButtonClick={handleAddClick} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className="rounded-xl" type="search" onInput={onGlobalFilterChange} placeholder="Search..." style={{ maxWidth: '10rem' }} />
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
                    content={<CreateUser closeDialog={handleAddClick} />}
                />
            ) : null}
            <div className="w-full overflow-x-auto">
                <DataTable
                    value={users}
                    paginator
                    rows={10}
                    dataKey="id"
                    filters={filters}
                    globalFilterFields={['id', 'name', 'lastName', 'email', 'role']}
                    header={header}
                    emptyMessage="No users found."
                    selectionMode="single"
                    selection={selectedUser}
                    onSelectionChange={(e) => setSelectedUser(e.value)}
                    className="w-full"
                    editMode="row"
                    editingRows={editingRows}
                    onRowEditChange={onRowEditChange}
                    onRowEditComplete={onRowEditComplete}
                >
                    <Column field="id" header="ID" sortable style={{ minWidth: '6rem' }} className="min-w-24" />
                    <Column field="name" header="Name" sortable style={{ minWidth: '8rem' }} className="min-w-32" />
                    <Column field="lastName" header="Last Name" sortable style={{ minWidth: '8rem' }} className="min-w-32" />
                    <Column field="email" header="Email" sortable style={{ minWidth: '10rem' }} className="min-w-40" />
                    <Column field="role" header="Role" sortable style={{ minWidth: '6rem' }} className="min-w-24" editor={roleEditor} />
                    <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }} />
                    <Column body={deleteButtonTemplate} headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }} />
                </DataTable>
            </div>
        </>
    );
}

export default ClientUserTable;
