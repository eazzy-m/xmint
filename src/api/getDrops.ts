import Fetcher from "./fetcher";
const fetcher = new Fetcher({});

const headersHandler = (token: unknown) => {
    return {
        Authorization: `Bearer ${token}`
    }
}

export const getSaved = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/saved/?limit=20&offset=0`,
        headers: headersHandler(token)
    });
};

export const getEditions = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/editions/?limit=20&offset=0`,
        headers: headersHandler(token)
    });
};

export const getOnSale = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/editions/?limit=20&offset=0&is_on_sale=True`,
        headers: headersHandler(token)
    });
};

export const getDrops = (id: unknown, token: unknown) => {
    return fetcher.request<any, any>({
        url: `/users/${id}/drops/?limit=20&offset=0`,
        headers: headersHandler(token)
    });
};

//https://dev.xmint.co/api/v1/moments/?limit=9&offset=0&
export const getMoments = (token: unknown, category?: string | null, limit=9, offset=0, place?: string | undefined, brand?: string | undefined, athletes?: string | undefined) => {

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
        url: url,
        headers: headersHandler(token)
    });
};


export const getFilteres = (endpoint: string, token: unknown) => {
    return fetcher.request<any, any>({
        url: `${endpoint}/`,
        headers: headersHandler(token)
    });
};
