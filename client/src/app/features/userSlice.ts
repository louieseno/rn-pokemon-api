import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const initialState = {
  user: {
    isLoggedIn: false,
    email: '',
    id: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user.isLoggedIn = true;
      state.user.id = action.payload.id;
      state.user.email = action.payload.email;
    },
    logout(state) {
      state.user.isLoggedIn = false;
      state.user.id = null;
      state.user.email = '';
    },
  },
});

export const { login, logout } = userSlice.actions;

export const userSelectors = {
  getUser: (state: RootState) => state.user.user,
};

export default userSlice.reducer;
