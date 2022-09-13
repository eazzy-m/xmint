import * as Sentry from '@sentry/react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method, CancelToken, AxiosError } from 'axios';
import { toCapitalizeChart1 } from '../external/method';
import {ISignIn} from "../interfaces/ISignIn";



interface IConfig {
    baseURL?: string;
    timeout?: number;
}

interface IRequest<TData> {
    url: string;
    baseURL?: string;
    method?: Method;
    payload?: object;
    params?: object;
    cancelToken?: CancelToken;
    data?: TData;
    paramsSerializer?: AxiosRequestConfig['paramsSerializer'];
    headers?: { [key: string]: string | number | undefined | null };
    isNotificationError?: boolean;
}

export const API_HOST = process.env.NODE_ENV === 'development' ? (window as Window).API_HOST : document.location.origin;
export const WS_API_HOST = API_HOST?.replace(/^https?/g, 'wss');
export const API_URL = '/api/v1/';
export const API_URL_WS = '/ws/v1/';

class Fetcher {
    private instance: AxiosInstance;

    constructor({ baseURL = `${API_HOST}${API_URL}`, timeout = 120 * 1000 }: IConfig) {
        console.log((window as Window).API_HOST);
        this.instance = axios.create({
            baseURL,
            timeout,
        });

        this.instance.interceptors.request.use(config => {
            const token ='';

            if (!token) {
                return config;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            return { ...config, headers };
        });

        this.instance.interceptors.response.use(
            response => response,
            error => {
                Sentry.captureException(error);
                return Promise.reject(error);
            }
        );
    };

    handleErrorData = <TResponse>(data: any) => {
        let htmlError = '';
        const prepareError = (obj: any) => {
            if (typeof obj === 'string') {
                htmlError = obj;
            } else {
                Object.keys(obj).forEach((i: any) => {
                    if ((Array.isArray(obj[i]) && typeof obj[i][0] === 'object') || Array.isArray(obj)) prepareError(obj[i]);
                    else if (typeof obj[i] === 'object') prepareError(obj[i]);
                    else if (i === 'non_field_errors') htmlError += `${obj[i]}</br>`;
                    else htmlError += `<strong>${toCapitalizeChart1(i)}</strong>: ${obj[i]}</br>`;
                });
            }
        };
        prepareError(data);
    };

    handlerCatch = <TResponse>(e: any, isNotificationError: boolean = true) => {
        const { response } = e;
        const { status, data } = response;
        if (status === 401) {


        }
        if (status === 404) {
            // eslint-disable-next-line no-restricted-globals

        }
        if (status !== 409 && isNotificationError && (status !== 404 || status !== 500)) {
            this.handleErrorData<TResponse>(data);
        }
        throw e;
    };

    request = <TData = undefined, TResponse = any>({
                                                       method = 'GET',
                                                       url,
                                                       params,
                                                       cancelToken,
                                                       headers,
                                                       baseURL,
                                                       data,
                                                       paramsSerializer,
                                                       isNotificationError,
                                                   }: IRequest<TData>): Promise<AxiosResponse<TResponse>> =>

        this.instance
            .request({
                url,
                method,
                params,
                headers,
                cancelToken,
                baseURL,
                data,
                paramsSerializer,
            })
            .catch((e: AxiosError) => this.handlerCatch<TResponse>(e, isNotificationError));
}

export default Fetcher;

export const signIn = (data: ISignIn) => {
    return fetcher.request<any, any>({
            url: `/login/`,
            method: 'POST',
            data: {...data},
        }
    );
};

const fetcher = new Fetcher({});

const token = localStorage.getItem('accessToken');

export const getBanner = () => {
   return fetcher.request<any, any>({
       url: "/drops/nearest_drop_banner/",
       method: "GET",
       headers: {
           Authorization: `Bearer ${token}`
       }
   });
};

export const getCards = (limit: number, offset: number) => {
    return fetcher.request<any, any>({
        url: `/drops/?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getFirst = () => {
    return fetcher.request<any, any>({
        url: "/drops/?limit=1&offset=0",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

//https://dev.xmint.co/api/v1/drops/e4abc6f8-f95a-4da5-b4de-b76cc6914189/

export const getCardById = (id: unknown) => {
    return fetcher.request<any, any>({
        url: `/drops/${id}/`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
