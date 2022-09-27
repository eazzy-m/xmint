import {ChangeEvent} from "react";
import {AxiosError} from "axios";

export interface ILoginProps {
    id: string;
    className: string;
    placeholder: string;
    name: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: AxiosError | undefined;
}