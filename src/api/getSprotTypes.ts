import Fetcher from "./fetcher";
const fetcher = new Fetcher({});

const headersHandler = (token: unknown) => {
    return {
        Authorization: `Bearer ${token}`
    }
}

//http://localhost:3001/api/v1/sport_types/
export const getSportTypes= (token: unknown) => {
    return fetcher.request<any, any>({
        url: `/sport_types/`,
        headers: headersHandler(token)
    });
};