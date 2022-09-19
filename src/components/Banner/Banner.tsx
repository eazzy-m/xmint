import {useEffect, useState} from 'react';
import "./Banner.scss";
import {getBanner} from "../../api/api";
import { useSelector, useDispatch } from 'react-redux';
import { token } from "../../redux/store"
import { useNavigate } from 'react-router';

import { signOutReducer } from '../../redux/slice/auth';

const Banner = () => {
    const [banner, setBanner] = useState("");
    const [error, setError] = useState("");
    const storeToken = useSelector(token)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.clear();
        dispatch(signOutReducer());
        navigate("/sign-in");
    };
    
    useEffect(() => {
        getBanner(storeToken)
            .then(res => setBanner(res.data.drop_banner))
            .catch(err => {
                setError(err);
                logout()
            });
    }, []);

    return (
        <div className="banner">
            <img alt={error ? `${error}` : "main banner"} src={banner} className={"banner__image"}/>
        </div>
    );
};

export default Banner;