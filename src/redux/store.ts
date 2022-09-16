import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import { auth } from "./slice/auth";
import { user } from "./slice/user";

export const store = configureStore({
    reducer: {
        auth: auth.reducer,
        user: user.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //   serializableCheck: false
    // })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const isAuth = (state: RootState) => state.auth.isAuth;
export const token = (state: RootState) => state.auth.token;

export const userName = (state: RootState) => state.user.username;
export const email = (state: RootState) => state.user.email;
export const id = (state: RootState) => state.user.id;
export const isMaEnable = (state: RootState) => state.user.is_mfaEnable;
export const about = (state: RootState) => state.user.about;
export const logo = (state: RootState) => state.user.logo;
export const name = (state: RootState) => state.user.name;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
