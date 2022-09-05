import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isAuth: false,
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInReducer: (state) => {
            state.isAuth = true;
        },
        signOutReducer: (state) => {
            state.isAuth = false;
        }
    }
});

export const {signInReducer, signOutReducer} = auth.actions;
