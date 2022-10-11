import { IUpdateUserData } from '../interfaces/IUpdateUserData';
import { ISignIn } from "../interfaces/ISignIn";
import Fetcher from "./fetcher"

const fetcher = new Fetcher({});

export const getUser = (id: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/`
    });
};

export const signIn = (data: ISignIn) => {
    return fetcher.request<any, any>({
            url: `/login/`,
            method: 'POST',
            data: {...data},
        }
    );
};

export const updateUser = (data: IUpdateUserData, id: string ) => {
    return fetcher.request<any, any>({
            url: `/users/${id}/`,
            method: 'PATCH',
            data: {...data}
        }
    );
};