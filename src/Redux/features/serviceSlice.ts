import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceData } from "../../utils";

const initialState: ServiceData[] = [];

const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        setServices: (_state, action: PayloadAction<ServiceData[]>) => {
            return action.payload;
        }
    }
});

export const { setServices } = serviceSlice.actions;

export default serviceSlice.reducer;