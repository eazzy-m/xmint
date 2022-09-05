import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signOutReducer} from "../../redux/slice/auth";

const About = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.clear()
        dispatch(signOutReducer())
        navigate("/sign-in")
    }

    return (
            <div className="page">
                <div className="container">
                    <h1 className="container__title">About</h1>
                    <p className="form__paragraph">
                        hello we are glad to see you here!
                    </p>
                    <button className="form__submit-button" onClick={logout}>logout</button>
                </div>
            </div>
    );
};

export default About;