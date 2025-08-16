import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
}); 
//Define types for `useSelector` and `useDispatch`
export type RootState = ReturnType<typeof store.getState>; //`store.getState` - fn that returns the entire`Redux state`. We've type with structure our `Redux State`
export type AppDispatch = typeof store.dispatch; //`store.dispatch`- fn(dispatch fn) to send actions
