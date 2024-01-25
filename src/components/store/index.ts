import { configureStore } from '@reduxjs/toolkit';
import userLoginSlice from './userLoginRouter';

const store = configureStore({
  reducer: {
    user: userLoginSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
