import * as Sentry from '@sentry/react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method, CancelToken, AxiosError } from 'axios';
import { toCapitalizeChart1 } from '../external/method';



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
        this.instance = axios.create({
            baseURL,
            timeout,
        });

        this.instance.interceptors.request.use(config => {
            const token ='';
            
           
                //       const token = getLocalAccessToken();

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

// import * as Sentry from '@sentry/react';
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method, CancelToken, AxiosError } from 'axios';

// import { baseRoutes, routes } from 'router';
// import {
//   cleanUpPrivateStorage,
//   getLocalAccessToken,
//   getNewAccessToken,
//   getTokenStatus,
//   removeTokenStatus,
//   setTokenStatus,
//   toCapitalizeChart1,
// } from '../helper/common';

// interface IConfig {
//   baseURL?: string;
//   timeout?: number;
// }

// interface IRequest<TData> {
//   url: string;
//   baseURL?: string;
//   method?: Method;
//   payload?: object;
//   params?: object;
//   cancelToken?: CancelToken;
//   data?: TData;
//   paramsSerializer?: AxiosRequestConfig['paramsSerializer'];
//   headers?: { [key: string]: string | number | undefined | null };
//   isNotificationError?: boolean;
// }

// export const API_HOST = process.env.NODE_ENV === 'development' ? (window as Window).API_HOST : document.location.origin;
// export const WS_API_HOST = API_HOST?.replace(/^https?/g, 'wss');
// export const API_URL = '/api/v1/';
// export const API_URL_WS = '/ws/v1/';

// class Fetcher {
//   private instance: AxiosInstance;

//   constructor({ baseURL = `${API_HOST}${API_URL}`, timeout = 120 * 1000 }: IConfig) {
//     this.instance = axios.create({
//       baseURL,
//       timeout,
//     });

//     this.instance.interceptors.request.use(config => {
//       const token = getLocalAccessToken();

//       if (!token) {
//         return config;
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       return { ...config, headers };
//     });

//     this.instance.interceptors.response.use(
//       response => response,
//       error => {
//         Sentry.captureException(error);
//         return Promise.reject(error);
//       }
//     );
//   }

//   handleErrorData = <TResponse>(data: any) => {
//     let htmlError = '';
//     const prepareError = (obj: any) => {
//       if (typeof obj === 'string') {
//         htmlError = obj;
//       } else {
//         Object.keys(obj).forEach((i: any) => {
//           if ((Array.isArray(obj[i]) && typeof obj[i][0] === 'object') || Array.isArray(obj)) prepareError(obj[i]);
//           else if (typeof obj[i] === 'object') prepareError(obj[i]);
//           else if (i === 'non_field_errors') htmlError += `${obj[i]}</br>`;
//           else htmlError += `<strong>${toCapitalizeChart1(i)}</strong>: ${obj[i]}</br>`;
//         });
//       }
//     };
//     prepareError(data);
//   };

//   handlerCatch = <TResponse>(e: any, isNotificationError: boolean = true) => {
//     const { response } = e;
//     const { status, data } = response;
//     if (status === 401) {
//       if (response?.config.url.includes('refresh')) {
//         setTokenStatus('declined');
//       }
//       const statusToken = getTokenStatus();
//       return new Promise((resolve, reject) => {
//         if (!statusToken) {
//           getNewAccessToken();
//         }
//         const interval = setInterval(() => {
//           const tokenNew = getTokenStatus();
//           if (!tokenNew || tokenNew === 'refreshed') {
//             clearInterval(interval);
//             removeTokenStatus();
//             const configData =
//               response?.config.data instanceof FormData || !response.config.data
//                 ? response.config.data
//                 : JSON.parse(response.config.data);
//             resolve(this.request({ ...response.config, data: configData }));
//           } else if (tokenNew === 'declined') {
//             // eslint-disable-next-line no-restricted-globals
//             if (!location.pathname.includes(baseRoutes.landing) && location.pathname !== routes.signIn)
//               // eslint-disable-next-line no-restricted-globals
//               location.replace(baseRoutes.landing);
//             cleanUpPrivateStorage();
//             clearInterval(interval);
//             reject(e);
//           }
//         }, 1000);
//         if (statusToken === 'declined') {
//           // eslint-disable-next-line no-restricted-globals
//           if (!location.pathname.includes(baseRoutes.landing) && location.pathname !== routes.signIn)
//             // eslint-disable-next-line no-restricted-globals
//             location.replace(baseRoutes.landing);
//           cleanUpPrivateStorage();
//           clearInterval(interval);
//           reject(e);
//         }
//       });
//     }
//     if (status === 404) {
//       // eslint-disable-next-line no-restricted-globals
//       if (!location.pathname.includes(baseRoutes.landing) && location.pathname !== routes.signIn)
//         // eslint-disable-next-line no-restricted-globals
//         location.replace(routes.pageNotFount);
//     }
//     if (status !== 409 && isNotificationError && (status !== 404 || status !== 500)) {
//       this.handleErrorData<TResponse>(data);
//     }
//     throw e;
//   };

//   request = <TData = undefined, TResponse = any>({
//     method = 'GET',
//     url,
//     params,
//     cancelToken,
//     headers,
//     baseURL,
//     data,
//     paramsSerializer,
//     isNotificationError,
//   }: IRequest<TData>): Promise<AxiosResponse<TResponse>> =>
//     // @ts-ignore
//     this.instance
//       .request({
//         url,
//         method,
//         params,
//         headers,
//         cancelToken,
//         baseURL,
//         data,
//         paramsSerializer,
//       })
//       .catch((e: AxiosError) => this.handlerCatch<TResponse>(e, isNotificationError));
// }

// export default Fetcher;

// export const cleanUpPrivateStorage = () => {
//   Object.values(WEB_STORAGE).forEach(item => {
//     localStorage.removeItem(item);
//     sessionStorage.removeItem(item);
//   });
// };