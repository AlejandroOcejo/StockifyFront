import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { getInventory } from '../../../../state/inventorySlicer';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

const hexToHsl = (hex) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(h => h + h).join('');
    }

    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}

const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

const generateGradientColors = (baseColor, numColors, range = 30) => {
    const [h, s, l] = hexToHsl(baseColor);
    const startHue = (h - range / 2 + 360) % 360;
    const endHue = (h + range / 2) % 360;
    const step = range / (numColors - 1);
    const colors = [];

    for (let i = 0; i < numColors; i++) {
        const newHue = (startHue + i * step) % 360;
        colors.push(hslToHex(newHue, s, l));
    }
    return colors;
}

const InventoryProduct = () => {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const [chartsData, setChartsData] = useState([]);
    const [t] = useTranslation('global');

    useEffect(() => {
        dispatch(getInventory());
    }, [dispatch]);

    useEffect(() => {
        if (inventory && inventory.inventory && inventory.inventory.length > 0) {
            const newChartsData = inventory.inventory.map(inv => {
                const productMap = {};

                if (inv && inv.products && Array.isArray(inv.products)) {
                    inv.products.forEach(product => {
                        if (productMap[product.name]) {
                            productMap[product.name] += product.quantity;
                        } else {
                            productMap[product.name] = product.quantity;
                        }
                    });

                    const productNames = Object.keys(productMap);
                    const productQuantities = productNames.map(name => productMap[name]);

                    const baseColor = inv.color.startsWith('#') ? inv.color : `#${inv.color}`;
                    const derivedColors = generateGradientColors(baseColor, productNames.length, 60);

                    console.log(`Inventory: ${inv.name}, Base Color: ${baseColor}, Derived Colors:`, derivedColors);

                    const data = {
                        labels: productNames,
                        datasets: [{
                            label: 'Product Distribution',
                            data: productQuantities,
                            backgroundColor: derivedColors,
                            offset: productNames.map(() => 5)
                        }]
                    };

                    return { name: inv.name, data };
                }
                return null;
            }).filter(chart => chart !== null);

            setChartsData(newChartsData);
        }
    }, [inventory]);

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.raw !== null) {
                            label += context.raw;
                        }
                        return label;
                    }
                }
            }
        },
        cutout: '70%'
    };

    return (
        <div className='flex flex-wrap justify-center'>
            {chartsData.length > 0 ? chartsData.map((chart, index) => (
                <div key={index} className='bg-white w-1/3 p-4 m-2 rounded-3xl'>
                    <span className='text-xl font-bold'>{chart.name}</span>
                    <div style={{ width: '80%', margin: '0 auto' }}>
                        <Doughnut data={chart.data} options={options} />
                    </div>
                </div>
            )) : <p>{t('InventoryProduct.LoadingMessage')}</p>}
        </div>
    );
}

export default InventoryProduct;
