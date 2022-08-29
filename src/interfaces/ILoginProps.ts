import {ChangeEvent} from "react";

export interface ILoginProps {
    className: string;
    placeholder: string;
    name: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}