import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlicer';
import registerSlicer from './registerSlicer';
import inventorySlicer from './inventorySlicer';
import productSlicer from './productSlicer';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerSlicer,
    inventory: inventorySlicer,
    product: productSlicer
  },
});
