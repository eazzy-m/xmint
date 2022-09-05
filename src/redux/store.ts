import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {auth} from "./slice/auth";

export const store = configureStore({
    reducer: {
        auth: auth.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //   serializableCheck: false
    // })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const isAuth = (state: RootState) => state.auth.isAuth;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
