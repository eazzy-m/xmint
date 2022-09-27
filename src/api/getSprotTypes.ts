import Fetcher from "./fetcher";
const fetcher = new Fetcher({});


//http://localhost:3001/api/v1/sport_types/

export const getSportTypes= (token: unknown) => {
    return fetcher.request<any, any>({
        url: `/sport_types/`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};