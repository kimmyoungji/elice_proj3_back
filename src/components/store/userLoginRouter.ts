import { createSlice } from '@reduxjs/toolkit';
import { userData } from '@components/pages/my-page/DummyUserData';

const initialState = { username: null, userInfo: userData };

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: initialState,
  reducers: {
    loginUser(state, action) {
      state.username = action.payload;
    },
    logoutUser(state) {
      Object.assign(state, initialState);
    },
    storeUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { loginUser, logoutUser, storeUserInfo } = userLoginSlice.actions;

export default userLoginSlice.reducer;
