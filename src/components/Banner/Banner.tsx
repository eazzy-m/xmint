import {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';
import { getBanner } from "../../api/api";
import { token } from "../../redux/store"
import defaultImage from "../../assets/default-image/XMint1_Pack_Logo_001.png";

import "./Banner.scss";

const Banner = () => {
    const [banner, setBanner] = useState("");
    const [error, setError] = useState("");
    const storeToken = useSelector(token);
    
    useEffect(() => {
        getBanner(storeToken)
            .then(res => setBanner(res.data.drop_banner))
            .catch(err => {
                setError(err);
                setBanner(defaultImage);
            });
    }, []);

    return (
        <div className="banner">
            <img alt={error ? `${error}` : "main banner"} src={banner} className={"banner__image"}/>
        </div>
    );
};

export default Banner;