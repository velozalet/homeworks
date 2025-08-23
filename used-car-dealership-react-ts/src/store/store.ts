import { configureStore } from '@reduxjs/toolkit';
import carsSliceReducer from './carsSlice'; 
import favoritesReducer from "./favoritesSlice";

 //=> Export
export const store = configureStore({
    reducer: {
        cars: carsSliceReducer, //using reducer`cars` from `carsSlice`(`carsSlice.ts`) -> It manages State - `state.cars`
        favorites: favoritesReducer, //using reducer`favorites` from `favoritesSlice`(`favoritesSlice.ts`) -> It manages State - `state.favorites`
    },
}); 
//Define types for `useSelector` and `useDispatch`
export type RootState = ReturnType<typeof store.getState>; //`store.getState` - fn that returns the entire`Redux state`. We've type with structure our `Redux State`
export type AppDispatch = typeof store.dispatch; //`store.dispatch`- fn(dispatch fn) to send actions
