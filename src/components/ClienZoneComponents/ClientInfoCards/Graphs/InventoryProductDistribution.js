import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { getInventory } from '../../../../state/inventorySlicer';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryProductDistribution = () => {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const [chartData, setChartData] = useState({});
    const [t] = useTranslation('global');

    useEffect(() => {
        dispatch(getInventory());
    }, [dispatch]);

    useEffect(() => {
        console.log('Inventory:', inventory);

        if (inventory && inventory.inventory && inventory.inventory.length > 0) {
            const inventoryData = inventory.inventory.map(inv => {
                if (inv && inv.products && Array.isArray(inv.products)) {
                    return inv.products.reduce((sum, product) => sum + product.quantity, 0);
                }
                return 0;
            });
            const inventoryLabels = inventory.inventory.map((inv, index) => `Inventory ${index + 1}`);

            const totalQuantity = inventoryData.reduce((sum, quantity) => sum + quantity, 0);
            const percentageData = totalQuantity > 0 ? inventoryData.map(quantity => (quantity / totalQuantity) * 100) : [];

            const formatColor = (color) => color.startsWith('#') ? color : `#${color}`;

            const backgroundColors = inventory.inventory.map(inv => formatColor(inv.color));
            const borderColors = inventory.inventory.map(inv => formatColor(inv.color));

            console.log(backgroundColors);
            console.log(borderColors);

            const data = {
                labels: inventoryLabels,
                datasets: [{
                    label: 'Inventory Distribution',
                    data: percentageData,
                    backgroundColor: backgroundColors,
                    borderColor: "FFFFFF",
                    borderWidth: 1
                }]
            };

            setChartData(data);
        }
    }, [inventory]);

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className='bg-white w-2/3 p-4 rounded-3xl'>
            <span className='text-2xl font-bold'>{t('InventoryProductDistribution.Title')}</span>
            {chartData.datasets ? (
                <div style={{ width: '60%', margin: '0 auto' }}>
                    <Pie data={chartData} options={options} />
                </div>
            ) : (
                <p>{t('InventoryProductDistribution.LoadingMessage')}</p>
            )}
        </div>
    );
}

export default InventoryProductDistribution;
