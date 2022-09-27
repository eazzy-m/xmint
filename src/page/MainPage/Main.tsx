
import Banner from "../../components/Banner/Banner";
import MainCard from "../../components/MainCard/MainCard";
import SmallCardsList from "../../components/SmallCardsList/SmallCardsList";
import Footer from "../Footer/Footer";
import "./MainPage.scss";

const Main = () => {
    return (
        <>
            <div className="main-page">
                <Banner/>
                <MainCard/>
                <SmallCardsList/>
            </div>
            <Footer/>
        </>
    );
};

export default Main;