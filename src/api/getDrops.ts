import Fetcher from "./fetcher";
const fetcher = new Fetcher({});


export const getSaved = (id: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/saved/?limit=20&offset=0`
    });
};

export const getEditions = (id: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/editions/?limit=20&offset=0`
    });
};

export const getOnSale = (id: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/editions/?limit=20&offset=0&is_on_sale=True`
    });
};

export const getDrops = (id: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/drops/?limit=20&offset=0`
    });
};

//https://dev.xmint.co/api/v1/moments/?limit=9&offset=0&
export const getMoments = (category?: string | null, limit=9, offset=0, place?: string | undefined, brand?: string | undefined, athletes?: string | undefined) => {

    let url = category ? `moments/?limit=${limit}&offset=${offset}&category__in=${category}` : `moments/?limit=${limit}&offset=${offset}`;

    if (place) {
        url = url + `&place__in=${place}`;
    }

    if (brand) {
        url = url + `&brand__in=${brand}`;
    }

    if (athletes) {
        url = url + `&athletes__id__in=${athletes}`;
    }

    return fetcher.request<any, any>({
        url: url
    });
};


export const getFilteres = (endpoint: string) => {
    return fetcher.request<any, any>({
        url: `${endpoint}/`
    });
};
