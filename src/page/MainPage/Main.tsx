import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutReducer } from "../../redux/slice/auth";
import { isAuth } from '../../redux/store';
import Banner from "../../components/Banner/Banner";
import MainCard from "../../components/MainCard/MainCard";
import SmallCardsList from "../../components/SmallCardsList/SmallCardsList";
import Footer from "../Footer/Footer";
import "./MainPage.scss";

const Main = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(isAuth);

    const logout = () => {
        localStorage.clear();
        dispatch(signOutReducer());
        navigate("/sign-in");
    };

    useEffect(() => { 
        if (!auth) {
            logout();
    }
}, [auth]);

    return (
        <>
            <div className="main-page">
                <Banner/>
                <MainCard/>
                <SmallCardsList/>
            </div>
            <button style={{width: "40px"}} onClick={logout}>exit</button>
            <Footer/>
        </>
    );
};

export default Main;