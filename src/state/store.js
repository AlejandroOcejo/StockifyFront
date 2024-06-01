import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlicer';
import registerSlicer from './registerSlicer';
import inventorySlicer from './inventorySlicer';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerSlicer,
    inventory: inventorySlicer,
  },
});
