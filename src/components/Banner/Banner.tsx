import {useEffect, useState} from 'react';
import { getBanner } from "../../api/getCards";
import defaultImage from "../../assets/default-image/XMint1_Pack_Logo_001.png";

import "./Banner.scss";

const Banner = () => {
    const [banner, setBanner] = useState("");
    const [error, setError] = useState("");
    
    useEffect(() => {
        getBanner()
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