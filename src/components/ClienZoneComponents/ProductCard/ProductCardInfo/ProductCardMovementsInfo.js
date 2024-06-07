import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { getTransactions } from '../../../../state/transactionSlicer';

Chart.register(...registerables);

const ProductCardMovementsInfo = ({ id }) => {
    const dispatch = useDispatch();
    const { transactions, loading, error } = useSelector((state) => state.transaction);

    useEffect(() => {
        dispatch(getTransactions(id));
    }, [dispatch, id]);

    const chartData = {
        labels: transactions ? transactions.map(transaction => new Date(transaction.date).toLocaleDateString()) : [],
        datasets: [
            {
                label: 'Total',
                data: transactions ? transactions.map(transaction => transaction.total) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                type: 'bar',
            },
            {
                label: 'Price',
                data: transactions ? transactions.map(transaction => transaction.price) : [],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                type: 'line',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ height: '400px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ProductCardMovementsInfo;
