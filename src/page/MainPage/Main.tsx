import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signOutReducer} from "../../redux/slice/auth";

import "./MainPage.scss";
import Banner from "../../components/Banner/Banner";
import MainCard from "../../components/MainCard/MainCard";
import SmallCardsList from "../../components/SmallCardsList/SmallCardsList";
import Footer from "../Footer/Footer";


const Main = () => {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.clear();
        dispatch(signOutReducer());
        navigate("/sign-in");
    };

    return (
            <div className="main-page">
                {token ?
                    <>
                        <Banner/>
                        <MainCard/>
                        <SmallCardsList/>
                        <Footer/>
                    </>
                    :
                    <button style={{width: "40px"}} onClick={logout}>exit</button>
                }
            </div>
    );
};

export default Main;