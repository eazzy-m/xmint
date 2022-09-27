import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import { auth } from "./slice/auth";
import { user } from "./slice/user";
import { modal } from"./slice/headerModal";
export const store = configureStore({
    reducer: {
        auth: auth.reducer,
        user: user.reducer,
        modal: modal.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //   serializableCheck: false
    // })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const isAuth = (state: RootState) => state.auth.isAuth;
export const token = (state: RootState) => state.auth.token;

export const userdata = (state: RootState) => state.user;

export const isModalOpen = (state: RootState) => state.modal.isOpen;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
