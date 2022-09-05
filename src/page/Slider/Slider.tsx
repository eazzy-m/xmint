import React, { useState } from 'react';
import { useTransition, animated, easings } from 'react-spring';
import {IImg} from "../../interfaces/IImg";

import "./Slider.scss";


const Slider = (props: {slides: IImg[]}) => {

    const [currentInd, setCurrentInd] = useState<number>(0);
    const slides = props.slides;

    const transitions = useTransition(currentInd, {
        key: currentInd,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
        config: { duration: 3000, easing: easings.easeOutSine},
        onRest: (_a, _b, item) => {
            if (currentInd === item) {
                setCurrentInd(state => (state + 1) % slides.length);
            }
        },
        exitBeforeEnter: true,
    });

    const goToSlide = (slideIndex: number): void => {
        setCurrentInd(slideIndex);
    };

    return (
        <div className="slider">
                 <h1 className="slider__title">Collect and sell iconic board sports NFTs.</h1>
                 <h2 className="slider__subtitle">Don't miss the next drop.</h2>

            {transitions((styles, item) =>
                <animated.div className="slide" style={styles}>
                    <img src={slides[item].image} alt={slides[item].alt} className="slide__img"/>
                    <div className="slider__partnership">
                        <div className="logo">
                            <img src={slides[item].logos[0]} alt="" className="logo__img"/>
                        </div>
                        <div className="logo">
                            <img src={slides[item].logos[1]} alt="" className="logo__img"/>
                        </div>
                        <div className="logo">
                            <img src={slides[item].logos[2]} alt="" className="logo__img"/>
                        </div>
                    </div>
                </animated.div>
            )}
            <div className="dots-container">
                 {slides.map((slide, slideIndex) => (
                         <div key={slideIndex}
                              onClick={() => goToSlide(slideIndex)}
                              className={slideIndex === currentInd ? "dot" : "dot active"}
                              ></div>
                 ))}
            </div>
        </div>
    );
};

export default Slider;
