import React, { useEffect, useState } from 'react';
import InfoCardPrice from './InfoCardxs/InfoCardPrice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../state/productSlicer';
import { getAllTransactions } from '../../../state/transactionSlicer';
import { format } from 'date-fns';
import InventoryProductDistribution from './Graphs/InventoryProductDistribution';
import InventoryProduct from './Graphs/InventoryProducts';
import ProductByInventory from './Graphs/ProductByInventory';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
const ClientInfoCards = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const transactions = useSelector((state) => state.transaction.transactions);
  const [t] = useTranslation('global');

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [dailyTransactions, setDailyTransactions] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const isTenant = localStorage.getItem('isTenant') === 'Tenant';
    if (!isTenant) {
      navigate('/client')
    }
  })

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const totalPrice = products.reduce((sum, product) => sum + product.quantity * product.price, 0);
      const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
      setTotalPrice(totalPrice);
      setTotalQuantity(totalQuantity);
    }
  }, [products]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const today = format(new Date(), 'yyyy-MM-dd');
      const dailyTransactions = transactions.filter(transaction =>
        format(new Date(transaction.date), 'yyyy-MM-dd') === today
      ).length;
      setDailyTransactions(dailyTransactions);
      setTotalTransactions(transactions.length);
    }
  }, [transactions]);

  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row justify-between gap-12 md:gap-4'>
        <InfoCardPrice title={t('ClientInfoCards.ProductPriceTitle')} content={`$${totalPrice.toFixed(2)}`} />
        <InfoCardPrice title={t('ClientInfoCards.TotalProductsTitle')} content={`${totalQuantity}`} />
        <InfoCardPrice title={t('ClientInfoCards.DailyTransactionsTitle')} content={`${dailyTransactions}`} />
        <InfoCardPrice title={t('ClientInfoCards.TotalTransactionsTitle')} content={`${totalTransactions}`} />
      </div>
      <div className='hidden md:flex flex-col md:flex-row justify-around gap-4 mt-8'>
        <InventoryProductDistribution />
        <InventoryProduct />
      </div>
      <div className='hidden md:block mt-8'>
        <ProductByInventory />
      </div>
    </div>
  );
};

export default ClientInfoCards;
