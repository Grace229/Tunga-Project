import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postReducer from './postSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
  },
});

export default store;
