import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    registerStart(state, action) {
        state.loading = true;
        state.error = null;
        state.user = action.payload
      },
      registerSuccess(state, action) {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      },
      registerFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure,loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
