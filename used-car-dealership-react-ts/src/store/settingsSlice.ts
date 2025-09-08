import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Settings } from "../types/settings";

interface SettingsState {
    allSettings: Settings | null;
    loading: boolean;
}

const initialState: SettingsState = {
    allSettings: null,
    loading: false,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettings(state, action: PayloadAction<Settings>) {
        state.allSettings = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
    },
    },
});
export const { setSettings, setLoading } = settingsSlice.actions;
export default settingsSlice.reducer;