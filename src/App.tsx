import React from 'react';
import './App.css';
import Header from "./page/Header/Header";
import AppRout from "./routes/AppRout";


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
