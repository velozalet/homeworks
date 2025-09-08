import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "../types/contact";

interface ContactState {
    allContacts: Contact[];
    loading: boolean;
}

const initialState: ContactState = {
    allContacts: [],
    loading: false,
};

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) {
        state.allContacts = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
    },
    },
});
export const { setContacts, setLoading } = contactSlice.actions;
export default contactSlice.reducer;