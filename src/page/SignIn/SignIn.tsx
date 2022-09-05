import React, {FC, FormEvent, ChangeEvent, useState, MouseEventHandler} from 'react';
import {AxiosError} from "axios";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import FormInput from "../../components/FormInput/FormInput";
import { signIn } from "../../api/api";
import { ISignIn } from "../../interfaces/ISignIn";
import {useNavigate} from "react-router-dom";
import "./SignIn.scss";
import {useDispatch} from "react-redux";
import {signInReducer} from "../../redux/slice/auth";

const SignIn:FC = () => {

    const initialData: ISignIn = {
        email: '',
        password: ''
    };

    const [error, setError] = useState<AxiosError>()
    const [data, setData] = useState<ISignIn>(initialData);
    const [type, setType] = useState<boolean>(true);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setData(initialData);
        signIn(data)
            .then(res => {
                localStorage.setItem('accessToken', res.data.access)
                const token = localStorage.getItem('accessToken');
                if (token) {
                    dispatch(signInReducer())
                }
                navigate("/")
            })
            .catch((err) => setError(err))
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData({...data, [name]: value});
    };

    const showPassword: MouseEventHandler = (): void => {
        setType(!type);
    };

    return (
        <div className="page">
            <div className="container">
                <h2 className="container__title">Please sign in.</h2>

                    <form className="form" onSubmit={handleSubmit} noValidate>

                        <FormInput id="username"
                                   error={error}
                                   type="text"
                                   name="email"
                                   className="form__input"
                                   onChange={handleInput}
                                   placeholder="Username or email"/>
                        <FormInput id="password"
                                   error={error}
                                   type={type ? "password" : "text"}
                                   name="password"
                                   className="form__input"
                                   onChange={handleInput}
                                   placeholder="Password"/>

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