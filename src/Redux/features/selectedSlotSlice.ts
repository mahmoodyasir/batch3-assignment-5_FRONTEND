import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type BookingData = {
    serviceId: string;
    slotId: string;
    date: string;
    startTime: string;
    endTime: string;

    name: string,
    price: number | null,
    duration: number | null,
};



const initialState: BookingData = {
    serviceId: "",
    slotId: "",
    date: "",
    startTime: "",
    endTime: "",
    name: "",
    price: null,
    duration: null,
}


const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setBookings: (_state, action: PayloadAction<BookingData>) => {
            return action.payload;
        },

        clearBooking: (state) => {
            state.serviceId = "";
            state.slotId = "";
            state.date = "";
            state.startTime = "";
            state.endTime = "";
            state.name = "";
            state.price = null;
            state.duration = null;
        }
    }
});


export const { setBookings, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;