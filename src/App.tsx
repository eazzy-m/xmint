import React from 'react';
import './App.css';
import Header from "./page/Header/Header";
import Slider from "./page/Slider/Slider";
import {IImg} from "./interfaces/IImg";

import slideOne from "./assets/slider/up-top-overcoming-challenges.jpg"
import slideTwo from "./assets/slider/portrait-young-sportive-girl-training-with-dumbbells-isolated-blue-background-neon.jpg"
import slideThree from "./assets/slider/pensive-man-riding-down-hill.jpg"
import dg from "./assets/partnership/Asset 1 3.svg";
import ride from "./assets/partnership/Asset 1 5.svg";
import bones from "./assets/partnership/Asset 1 6.svg";
import billabong from "./assets/partnership/Billabong_Logo_neu 1.svg";
import burton from "./assets/partnership/burton-2-logo-svg-vector 1.svg";
import element from "./assets/partnership/element-logo 1.svg";
import roxy from "./assets/partnership/Frame 8.svg";
import powelPeralta from "./assets/partnership/Layer 2.svg";
import quiksilver from "./assets/partnership/quiksilver-12-logo-svg-vector 1.svg";
import AppRout from "./routes/AppRout";

const imageArray: IImg[] = [
    {image: slideOne, ind: 0, alt: "up top overcoming challenges", logos: [quiksilver, dg, billabong]},
    {image: slideTwo, ind: 1, alt: "portrait young sportive girl training with dumbbells", logos: [ride, burton, roxy]},
    {image: slideThree, ind: 2, alt: "pensive man riding down hill", logos: [element, bones, powelPeralta]},
];

const App = () => {
    return (
        <div>
            <div className="App">
                <Header/>
                <AppRout/>
            </div>
            <Slider slides={imageArray}/>
        </div>
  );
};

export default App;
