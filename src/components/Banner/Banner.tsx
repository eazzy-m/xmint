import React, {useEffect, useState} from 'react';
import "./Banner.scss";
import {getBanner} from "../../api/api";


const Banner = () => {
    const [banner, setBanner] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getBanner()
            .then(res =>  setBanner(res.data.drop_banner))
            .catch(err => {setError(err)});
    }, [])

    return (
        <div className="banner">
            <img alt={error ? `${error}` : "main banner"} src={banner} className={"banner__image"}/>
        </div>
    );
};

export default Banner;