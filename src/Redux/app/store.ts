import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userStateReducer from '../features/userSlice';
import serviceStateReducer from '../features/serviceSlice';
import bookingStateReducer from '../features/selectedSlotSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const reducer = combineReducers({
    userState: userStateReducer,
    serviceState: serviceStateReducer,
    bookingState: bookingStateReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);