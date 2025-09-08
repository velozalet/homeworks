import { configureStore } from '@reduxjs/toolkit';
import carsSliceReducer from './carsSlice'; 
import favoritesReducer from "./favoritesSlice";
import bookingsReducer from "./bookingSlice";
import contactsReducer from "./contactSlice";
import settingsReducer from "./settingsSlice";

 //=> Export
export const store = configureStore({ 
    reducer: {
        cars: carsSliceReducer, //using reducer`cars` from `carsSlice`(`carsSlice.ts`) -> It manages State - `state.cars`
        favorites: favoritesReducer, //using reducer`favorites` from `favoritesSlice`(`favoritesSlice.ts`) -> It manages State - `state.favorites`
        bookings: bookingsReducer, //using reducer`bookings` from `bookingSlice`(`bookingSlice.ts`) -> It manages State - `state.bookings`
        contacts: contactsReducer, //using reducer`contacts` from `contactSlice`(`contactSlice.ts`) -> It manages State - `state.contacts`
        settings: settingsReducer, //using reducer`settings` from `settingsSlice`(`settingsSlice.ts`) -> It manages State - `state.settings`
    },
}); 
//Define types for `useSelector` and `useDispatch`
export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
