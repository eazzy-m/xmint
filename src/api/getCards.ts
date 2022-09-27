import Fetcher from "./fetcher";
const fetcher = new Fetcher({});

const headersHandler = (token: unknown) => {
    return {
        Authorization: `Bearer ${token}`
    }
}

export const getBanner = (token: unknown) => {
    return fetcher.request<any, any>({
        url: "/drops/nearest_drop_banner/",
        headers: headersHandler(token)
    });
 };
 
 export const getCards = (limit: number, offset: number, token: unknown) => {
     return fetcher.request<any, any>({
         url: `/drops/?limit=${limit}&offset=${offset}`,
         headers: headersHandler(token)
     });
 };
 
 export const getFirst = (token: unknown) => {
     return fetcher.request<any, any>({
         url: "/drops/?limit=1&offset=0",
         headers: headersHandler(token)
     });
 };
 
 
 export const getCardById = (id: unknown, token: unknown) => {
     return fetcher.request<any, any>({
         url: `/drops/${id}/`,
         headers: headersHandler(token)
     });
 };