import React, {FC} from 'react';
import "./SignIn.scss"


const SignIn:FC = () => {
    return (
        <div className="page">
            <div className="container">
                <h2 className="container__title">Please sign in.</h2>
                    <form className="form">
                        <input className="form__input"/>
                        <input className="form__input"/>
                        <button className="input__button">Show</button>
                        <div className="form__wrapper">
                            <label className="input__label">
                                <input className="form__input form__input_type_checkbox" type={"checkbox"}/>
                                Remember me
                            </label>
                            <a href={"#"} className="form__link">Forgot your password?</a>
                        </div>
                        <button type={"submit"} className="form__submit-button">Sign in</button>
                    </form>
                <p className="form__paragraph">
                    By signing in you agree to our
                    <a className="form__link" href={"#"}>Privacy Police</a>
                    and
                    <a className="form__link" href={"#"}> Terms of Service.</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;