import React from 'react';
import './App.css';
import SignIn from "./page/SignIn/SignIn";
import Header from "./page/Header/Header";
import Slider from "./page/Slider/Slider";
function App() {
  return (
    <div>
        <div className="App">
            <Header/>
            <SignIn/>
        </div>
        <Slider/>
    </div>
  );
}

export default App;
