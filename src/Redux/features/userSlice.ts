import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type UserData = {
    _id: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    address: string,
};

type User = {
    isLoggedIn: boolean,
    user: UserData
};

const initialState: User = {
    isLoggedIn: false,
    user: {
        _id: '',
        name: '',
        email: '',
        phone: '',
        role: '',
        address: ''
    }
};

export const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const data = action.payload;
            state.isLoggedIn = true;
            state.user._id = data._id;
            state.user.name = data.name;
            state.user.email = data.email;
            state.user.phone = data.phone;
            state.user.role = data.role;
            state.user.address = data.address;
        },
        setLogOut: (state) => {
            state.isLoggedIn = false;
            state.user._id = '';
            state.user.name = '';
            state.user.email = '';
            state.user.phone = '';
            state.user.role = '';
            state.user.address = '';
        }
    }
});

export const { setUser, setLogOut } = userSlice.actions;

export default userSlice.reducer;