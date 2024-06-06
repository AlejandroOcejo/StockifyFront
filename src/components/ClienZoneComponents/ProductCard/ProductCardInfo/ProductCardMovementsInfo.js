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
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
            y: {
                title: {
                    display: true,
                },
            },
        },
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ProductCardMovementsInfo;
