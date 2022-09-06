import React, {FC, FormEvent, ChangeEvent, useState, MouseEventHandler} from 'react';
import {AxiosError} from "axios";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import FormInput from "../../components/FormInput/FormInput";
import { signIn } from "../../api/api";
import { ISignIn } from "../../interfaces/ISignIn";
import {Link, useNavigate} from "react-router-dom";
import "./SignIn.scss";
import {useDispatch} from "react-redux";
import {saveUser, signInReducer} from "../../redux/slice/auth";
import Slider from "../Slider/Slider";
import {IImg} from "../../interfaces/IImg";
import slideOne from "../../assets/slider/up-top-overcoming-challenges.jpg";
import quiksilver from "../../assets/partnership/quiksilver-12-logo-svg-vector 1.svg";
import dg from "../../assets/partnership/Asset 1 3.svg";
import billabong from "../../assets/partnership/Billabong_Logo_neu 1.svg";
import slideTwo from "../../assets/slider/portrait-young-sportive-girl-training-with-dumbbells-isolated-blue-background-neon.jpg";
import ride from "../../assets/partnership/Asset 1 5.svg";
import burton from "../../assets/partnership/burton-2-logo-svg-vector 1.svg";
import roxy from "../../assets/partnership/Frame 8.svg";
import slideThree from "../../assets/slider/pensive-man-riding-down-hill.jpg";
import element from "../../assets/partnership/element-logo 1.svg";
import bones from "../../assets/partnership/Asset 1 6.svg";
import powelPeralta from "../../assets/partnership/Layer 2.svg";

const SignIn:FC = () => {

    const imageArray: IImg[] = [
        {image: slideOne, ind: 0, alt: "up top overcoming challenges", logos: [quiksilver, dg, billabong]},
        {image: slideTwo, ind: 1, alt: "portrait young sportive girl training with dumbbells", logos: [ride, burton, roxy]},
        {image: slideThree, ind: 2, alt: "pensive man riding down hill", logos: [element, bones, powelPeralta]},
    ];

    const initialData: ISignIn = {
        email: '',
        password: ''
    };

    const [error, setError] = useState<AxiosError>();
    const [data, setData] = useState<ISignIn>(initialData);
    const [type, setType] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setData(initialData);
        // {email: "mikalai.kozich@leverx.com", password: "@left4teamportal3A!"}
        signIn(data)
            .then(res => {
                localStorage.setItem('accessToken', res.data.access);
                dispatch(saveUser(res.data.email));
                const token = localStorage.getItem('accessToken');
                if (token) {
                    dispatch(signInReducer());
                }
                navigate("/");
            })
            .catch((err) => setError(err));
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData({...data, [name]: value});
    };

    const showPassword: MouseEventHandler = (): void => {
        setType(!type);
    };

    return (
        <>
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
                            <Link to="#" className="form__link"> Forgot your password? </Link>
                        </div>

                        <SubmitButton className="button button_submit"> Sign In </SubmitButton>
                    </form>

                <p className="form__paragraph">
                    By signing in you agree to our
                    <Link className="form__link" to="#"> Privacy Police </Link>
                     and
                    <Link className="form__link" to="#"> Terms of Service. </Link>
                </p>
            </div>
        </div>
            <Slider slides={imageArray}/>
        </>
    );
};

export default SignIn;