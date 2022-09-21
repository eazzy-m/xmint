import {createSlice} from "@reduxjs/toolkit";
import { IUserData } from "../../interfaces/IUserData";

const rawUserData = localStorage.getItem("userData");

const userData = rawUserData ? JSON.parse(rawUserData) : {
    email: "",
    username: "",
    id: "",
    is_mfaEnable: false,
    about: null,
    logo: null,
    name: null,
};

const initialState: IUserData = {
    ...userData
};

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        fillUsersData: (state, {payload}) => {
           // state = {state, ...payload};
            // experimental mode
            state.username = payload.username;
            state.id = payload.id;
            state.email = payload.email;
            state.about = payload.about;
            state.logo = payload.logo;
            state.name = payload.name;
            state.is_mfaEnable = payload.is_mfaEnable;
        }, 
        setUsersData: (state, {payload}) => {
            state.username = payload.username;
            state.about = payload.about;
            state.name = payload.name;
        }
    }
});

export const { fillUsersData, setUsersData } = user.actions;
