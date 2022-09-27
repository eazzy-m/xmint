
import './App.css';
import Header from "./page/Header/Header";
import AppRout from "./routes/AppRout";
import "./constants/MuiStylesProperties.scss"

const App = () => {
    return (
        <div>
            <div className="App">
                <Header/>
                <AppRout/>
            </div>
        </div>
  );
};

export default App;
