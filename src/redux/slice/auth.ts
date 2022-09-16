import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    token: ''
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInReducer: (state, {payload}) => {
            state.isAuth = true;
            state.token = payload;
        },
        signOutReducer: (state) => {
            state.isAuth = false;
            state.token = ''
        }
    }
});

export const {signInReducer, signOutReducer} = auth.actions;
