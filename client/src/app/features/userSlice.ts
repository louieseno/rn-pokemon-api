import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const initialState = {
  isLoggedIn: false,
  user: {
    email: '',
    id: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user.id = action.payload.id;
      state.user.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user.id = null;
      state.user.email = '';
    },
  },
});

export const { login, logout } = userSlice.actions;

export const userSelectors = {
  getUser: (state: RootState) => state.user.user,
  isLoggedIn: (state: RootState) => state.user.isLoggedIn,
};

export default userSlice.reducer;
