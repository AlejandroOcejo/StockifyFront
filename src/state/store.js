import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlicer';
import registerSlicer from './registerSlicer';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerSlicer,
  },
});
