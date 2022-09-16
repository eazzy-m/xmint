import {createSlice} from "@reduxjs/toolkit";
import { IUserData } from "../../interfaces/IUserData";

const initialState: IUserData = {
    email: "",
    username: "",
    id: "",
    is_mfaEnable: false,
    about: null,
    logo: null,
    name: null,
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
        }
    }
});

export const { fillUsersData } = user.actions;
