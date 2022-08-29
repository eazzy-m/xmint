import React, {useEffect, useState} from 'react';
import "./Slider.scss"
import {IImg} from "../../interfaces/IImg";

const Slider = (props: {slides: IImg[]}) => {

    const [currentInd, setCurrentInd] = useState<number>(0);
    const slides = props.slides;
    const slide:IImg = slides[currentInd];

    useEffect(() => {
        const timer:NodeJS.Timeout = setTimeout(() => {
            const newSlideIndex: number = currentInd >= slides.length - 1 ? 0 : currentInd + 1;
            setCurrentInd(newSlideIndex);
        }, 2000);
        return () => clearTimeout(timer);
    }, [currentInd]);

    const goToSlide = (slideIndex: number): void => {
      setCurrentInd(slideIndex);
    };


    return (
        <div className="slider">
            <h1 className="slider__title">Collect and sell iconic board sports NFTs.</h1>
            <h2 className="slider__subtitle">Don't miss the next drop.</h2>
                <div className="slide" >
                    <img src={slide.image} alt={slide.alt} className="slide__img"/>
                    <div className="slider__partnership">
                        <div className="logo">
                            <img src={slide.logos[0]} alt="" className="logo__img"/>
                        </div>
                        <div className="logo">
                            <img src={slide.logos[1]} alt="" className="logo__img"/>
                        </div>
                        <div className="logo">
                            <img src={slide.logos[2]} alt="" className="logo__img"/>
                        </div>
                    </div>
                </div>


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
}

export default Slider;
