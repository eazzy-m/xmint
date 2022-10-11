import Fetcher from "./fetcher";
const fetcher = new Fetcher({});

export const getBanner = () => {
    return fetcher.request<any, any>({
        url: "/drops/nearest_drop_banner/"
    });
 };
 
 export const getCards = (limit: number, offset: number) => {
     return fetcher.request<any, any>({
         url: `/drops/?limit=${limit}&offset=${offset}`
     });
 };
 
 export const getFirst = () => {
     return fetcher.request<any, any>({
         url: "/drops/?limit=1&offset=0"
     });
 };
 
 
 export const getCardById = (id: unknown) => {
     return fetcher.request<any, any>({
         url: `/drops/${id}/`
     });
 };