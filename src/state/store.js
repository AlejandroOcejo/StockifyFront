import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlicer';
import registerSlicer from './registerSlicer';
import inventorySlicer from './inventorySlicer';
import productSlicer from './productSlicer';
import userSlicer from './userSlicer';
import categorySlicer from './categorySlicer';
import transactionSlicer from './transactionSlicer';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerSlicer,
    inventory: inventorySlicer,
    product: productSlicer,
    user: userSlicer,
    category: categorySlicer,
    transaction: transactionSlicer
  },
});
