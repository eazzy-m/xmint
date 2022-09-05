import {WEB_STORAGE} from "./externalProperties";

export const toCapitalizeChart1 = (str: string) => {
    const strArr = str.replace(/_/g, ' ').split('');
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join('');
};



export const getLocalAccessToken = () => localStorage.getItem(WEB_STORAGE.ACCESS_TOKEN);