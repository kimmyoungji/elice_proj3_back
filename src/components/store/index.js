import { configureStore } from '@reduxjs/toolkit';
import userLoginRouter from './userLoginRouter';

const store = configureStore({
  reducer: {
    user: userLoginRouter,
  },
});

export default store;
