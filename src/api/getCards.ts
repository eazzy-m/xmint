import Fetcher from "./fetcher";
const fetcher = new Fetcher({});

export const getBanner = (token: unknown) => {
    return fetcher.request<any, any>({
        url: "/drops/nearest_drop_banner/",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
 };
 
 export const getCards = (limit: number, offset: number, token: unknown) => {
     return fetcher.request<any, any>({
         url: `/drops/?limit=${limit}&offset=${offset}`,
         method: "GET",
         headers: {
             Authorization: `Bearer ${token}`
         }
     });
 };
 
 export const getFirst = (token: unknown) => {
     return fetcher.request<any, any>({
         url: "/drops/?limit=1&offset=0",
         method: "GET",
         headers: {
             Authorization: `Bearer ${token}`
         }
     });
 };
 
 
 export const getCardById = (id: unknown, token: unknown) => {
     return fetcher.request<any, any>({
         url: `/drops/${id}/`,
         method: "GET",
         headers: {
             Authorization: `Bearer ${token}`
         }
     });
 };