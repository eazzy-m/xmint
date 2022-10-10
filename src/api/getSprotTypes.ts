import Fetcher from "./fetcher";
const fetcher = new Fetcher({});

//http://localhost:3001/api/v1/sport_types/
export const getSportTypes = () => {
    return fetcher.request<any, any>({
        url: `/sport_types/`
    });
};