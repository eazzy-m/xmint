import React, {FC, FormEvent, ChangeEvent, useState, MouseEventHandler} from 'react';
import "./SignIn.scss";

import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {handlerLogin} from "../../api/api";
import {ISignIn} from "../../interfaces/ISignIn";

import FormInput from "../../components/FormInput/FormInput";

const SignIn:FC = () => {

    const initialData: ISignIn = {
        login: '',
        password: ''
    };

    // email: "goodguytoni@gmail.com"
    // password: "Password1!"

    const [data, setData] = useState<ISignIn>(initialData);
    const [type, setType] = useState<boolean>(true);
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setData(initialData);
        handlerLogin(data);
    };


    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData({...data, [name]: value});
        //value ? classList.add('filled') :  classList.remove('filled')
    };

    const showPassword: MouseEventHandler = (): void => {
        setType(!type);
    }

    return (
        <div className="page">
            <div className="container">
                <h2 className="container__title">Please sign in.</h2>

                    <form className="form" onSubmit={handleSubmit}>

                        <FormInput type="text" name="login" className="form__input" onChange={handleInput} placeholder="Username or email"/>
                        <FormInput type={type ? "password" : "text"} name="password" className="form__input" onChange={handleInput} placeholder="Password"/>
                        <button onClick={showPassword} type="button" className="input__button">{type ? "Show" : "Hide"}</button>

                        <div className="form__wrapper">
                            <label className="input__label">
                                <input className="form__input form__input_type_checkbox" type={"checkbox"}/>
                                <span className="checkbox-label"> Remember me </span>
                            </label>
                            <a href={"#"} className="form__link"> Forgot your password? </a>
                        </div>

                        <SubmitButton className="form__submit-button"> Sign In </SubmitButton>
                    </form>

                <p className="form__paragraph">
                    By signing in you agree to our
                    <a className="form__link" href={"#"}> Privacy Police </a>
                     and
                    <a className="form__link" href={"#"}> Terms of Service. </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;