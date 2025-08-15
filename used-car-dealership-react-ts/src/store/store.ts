import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
}); 

// ✅ Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
