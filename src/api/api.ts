import {ISignIn} from "../interfaces/ISignIn";

const url = 'https://dev.xmint.co/api/v1/';


export const handlerLogin = async (data: ISignIn): Promise<any> => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:3000');
        try {
            const res = await fetch(`${url}login/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    ...data
                }),
            });
            const token = await res.json();
            console.log(token);
            return token;
        } catch(err) {
            console.log(`Error: ${err}`);
        }
};

