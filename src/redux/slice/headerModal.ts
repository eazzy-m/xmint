import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
};

export const modal = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
});

export const {openModal, closeModal} = modal.actions;