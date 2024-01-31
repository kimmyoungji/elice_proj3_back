import { createSlice } from '@reduxjs/toolkit';

export interface UserInfo {
  username?: string;
  dietGoal: string;
  activityAmount: string;
  height?: number;
  weight?: number;
  gender?: string;
  profileImage?: string;
  targetCalories?: number;
  age?: number;
  birthday?: string;
}

export const initialState: { userInfo: UserInfo } = {
  userInfo: {
    username: '',
    profileImage: '',
    dietGoal: '1',
    activityAmount: ' 1',
    height: 0,
    weight: 0,
    gender: '1',
    targetCalories: 0,
    age: 0,
  },
};

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: initialState,
  reducers: {
    loginUser(state, action) {
      state.userInfo = action.payload;
    },
    logoutUser(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { loginUser, logoutUser } = userLoginSlice.actions;

export default userLoginSlice.reducer;
