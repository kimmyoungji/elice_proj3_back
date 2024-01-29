import { createSlice } from '@reduxjs/toolkit';

interface UserInfo {
  dietGoal: string;
  activityAmount: string;
  height?: number;
  weight?: number;
  username?: string;
  gender?: string;
  profileImage?: string;
  targetCalories?: number;
}

const initialState: { userInfo: UserInfo } = {
  userInfo: {
    username: '데이터 없음',
    dietGoal: '1',
    activityAmount: ' 1',
    height: 0,
    weight: 0,
    gender: '1',
    profileImage: '',
    targetCalories: 0,
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
