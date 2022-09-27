import { IUpdateUserData } from '../interfaces/IUpdateUserData';
import { ISignIn } from "../interfaces/ISignIn";
import Fetcher from "./fetcher"

const fetcher = new Fetcher({});

const headersHandler = (token: unknown) => {
    return {
        Authorization: `Bearer ${token}`
    }
}

export const getUser = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/`,
        headers: headersHandler(token)
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

export const updateUser = (data: IUpdateUserData, id: string, token: unknown ) => {
    return fetcher.request<any, any>({
            url: `/users/${id}/`,
            method: 'PATCH',
            data: {...data},
            headers: headersHandler(token)
        }
    );
};