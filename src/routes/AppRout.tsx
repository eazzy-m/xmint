import React from 'react';
import {Route, Routes} from "react-router-dom";
import {isAuth} from "../redux/store";
import { useSelector, useDispatch} from "react-redux";
import {signInReducer, signOutReducer} from "../redux/slice/auth";
import {privateRoutes, publicRoutes} from "./index";


const AppRout = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken');

    if (token) {
       dispatch(signInReducer());
    } else {
        dispatch(signOutReducer());
    }

    const auth = useSelector(isAuth);

    return (
        auth ?
        <Routes>
            {privateRoutes.map(route => <Route key={route.path} element={<route.component/>} path={route.path} index={route.index}/>)}
        </Routes>
            :
        <Routes>
            {publicRoutes.map(route => <Route key={route.path} element={<route.component/>} path={route.path}/>)}
        </Routes>
    );
};

export default AppRout;