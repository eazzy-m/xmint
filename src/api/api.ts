import { IUpdateUserData } from '../interfaces/IUpdateUserData';
import { ISignIn } from "../interfaces/ISignIn";
import Fetcher from "./fetcher"

const fetcher = new Fetcher({});


export const signIn = (data: ISignIn) => {
    return fetcher.request<any, any>({
            url: `/login/`,
            method: 'POST',
            data: {...data},
        }
    );
};

export const getUser = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateUser = (data: IUpdateUserData, id: string, token: unknown ) => {
    return fetcher.request<any, any>({
            url: `/users/${id}/`,
            method: 'PATCH',
            data: {...data},
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};