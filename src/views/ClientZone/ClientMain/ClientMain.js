import React, { useEffect } from 'react';
import Sidebar from '../../../components/ClienZoneComponents/SideBar/Sidebar';
import { getInventory } from '../../../state/inventorySlicer';
import { useDispatch, useSelector } from 'react-redux';
import AddInventory from '../../../components/ClienZoneComponents/AddInventory/AddInventory';
import InventoryCard from '../../../components/ClienZoneComponents/InventoryCard/InventoryCard';
import { useNavigate } from 'react-router';

const ClientMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inventoryItems = useSelector((state) => state.inventory.inventory);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getInventory());
    } else {
      navigate('/login');
    }
  }, [dispatch]);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="p-28 flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <AddInventory />
          {inventoryItems.map((item) => (
            <InventoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientMain;
