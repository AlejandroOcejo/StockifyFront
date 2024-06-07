import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { getInventory } from '../../../../state/inventorySlicer';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryProduct = () => {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const [chartData, setChartData] = useState({});
    const [t] = useTranslation('global');

    useEffect(() => {
        dispatch(getInventory());
    }, [dispatch]);

    useEffect(() => {
        if (inventory && inventory.inventory && inventory.inventory.length > 0) {
            const productMap = {};

            inventory.inventory.forEach(inv => {
                if (inv && inv.products && Array.isArray(inv.products)) {
                    inv.products.forEach(product => {
                        if (productMap[product.name]) {
                            productMap[product.name] += product.quantity;
                        } else {
                            productMap[product.name] = product.quantity;
                        }
                    });
                }
            });

            const productNames = Object.keys(productMap);
            const productQuantities = productNames.map(name => productMap[name]);

            const totalQuantity = productQuantities.reduce((sum, quantity) => sum + quantity, 0);
            const percentageData = totalQuantity > 0 ? productQuantities.map(quantity => (quantity / totalQuantity) * 100) : [];

            const solidColors = [
                '#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD',
                '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF',
                '#AEC7E8', '#FFBB78', '#98DF8A', '#FF9896', '#C5B0D5',
                '#C49C94', '#F7B6D2', '#C7C7C7', '#DBDB8D', '#9EDAE5'
            ];

            const data = {
                labels: productNames,
                datasets: [{
                    label: 'Product Distribution',
                    data: percentageData,
                    backgroundColor: productNames.map((_, index) => solidColors[index % solidColors.length]),
                    borderColor: "FFFFFF",
                    borderWidth: 0.3
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
            <span className='text-2xl font-bold'>{t('InventoryProduct.Title')}</span>
            {chartData.datasets ? (
                <div style={{ width: '60%', margin: '0 auto' }}>
                    <Pie data={chartData} options={options} />
                </div>
            ) : (
                <p>{t('InventoryProduct.LoadingMessage')}</p>
            )}
        </div>
    );
}

export default InventoryProduct;
