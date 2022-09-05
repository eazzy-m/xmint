import React from 'react';

import {ILoginProps} from "../../interfaces/ILoginProps";

const FormInput = (props: ILoginProps) => {
    const {className, name, onChange, placeholder, type, error, id} = props;

    const errorHandler = (): boolean => {
        //@ts-ignore
        return error && Object.keys(error?.response?.data).includes(id);
    };

    return (
        <>
            <label className="custom-field">
                <input id={id}
                       type={type}
                       required
                       name={name}
                       className={className}
                       onChange={onChange}
                       style={errorHandler() ? {borderColor: "red"} : {borderColor: "#D0D2D2"}}/>
                <span className="placeholder">{placeholder}</span>
            </label>
            {errorHandler() && <span className="error-message">{error?.response?.data[id]}</span>}
        </>
    );
}

export default FormInput;