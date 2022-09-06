import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isAuth: false,
    username: ''
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
        },
        saveUser: (state, {payload}) => {
            state.username = payload
        }
    }
});

export const {signInReducer, signOutReducer, saveUser} = auth.actions;
