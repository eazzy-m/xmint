import Fetcher from "./fetcher";
const fetcher = new Fetcher({});


export const getSaved = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/saved/?limit=20&offset=0`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getEditions = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/editions/?limit=20&offset=0`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getOnSale = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/editions/?limit=20&offset=0&is_on_sale=True`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getDrops = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/drops/?limit=20&offset=0`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};