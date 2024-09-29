import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ServiceData = {
    _id: string,
    name: string,
    description: string,
    price: number,
    duration: number,
    isDeleted: boolean,
}

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