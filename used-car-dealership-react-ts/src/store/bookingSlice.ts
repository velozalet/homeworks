import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Booking } from "../types/booking";

interface BookingState {
    allBookings: Booking[];
    loading: boolean;
}

const initialState: BookingState = {
    allBookings: [],
    loading: false,
};

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
    setBookings(state, action: PayloadAction<Booking[]>) {
        state.allBookings = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
    },
    },
});
export const { setBookings, setLoading } = bookingSlice.actions;
export default bookingSlice.reducer;