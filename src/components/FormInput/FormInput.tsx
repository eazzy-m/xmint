import React from 'react';

import {ILoginProps} from "../../interfaces/ILoginProps";

const FormInput = (props: ILoginProps) => {
    const {className, name, onChange, placeholder, type} = props;
    return (
        <label className="custom-field">
            <input type={type} required name={name} className={className} onChange={onChange}/>
            <span className="placeholder">{placeholder}</span>
        </label>
    );
}

export default FormInput;