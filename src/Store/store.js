// src/Store/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Ensure this matches the slice name in tasksSlice
  },
});

export default store;
