import {useEffect, useState} from 'react';
import moment from "moment/moment";
import { Typography } from '@mui/material';

import "./Countdown.scss";

const Countdown = (props: {mode: boolean, releaseDate: string | undefined}) => {
    const {releaseDate, mode} = props;
    const [countdownTime, setCountdownTime] = useState( {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    let interval: NodeJS.Timer;

    const release = moment(releaseDate).valueOf();
    const now = new Date().getTime();
    const isReleased = release > now;

    const countDownTimer = () => {
        if (releaseDate) {
            const release = moment(releaseDate).valueOf();
            interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = release - now;
                const days = Math.floor(distance / (24 * 60 * 60 * 1000));
                const hours = Math.floor(distance % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
                const minutes = Math.floor(distance % (60 * 60 * 1000) / (60 * 1000));
                const seconds = Math.floor(distance % (60 * 1000) / 1000);

                if (distance < 0) {
                    //stop
                    clearInterval(interval);

                } else {
                    // update timer
                    setCountdownTime({...countdownTime, days, hours, minutes, seconds});
                }
            });
        }
    };

    useEffect(() => {
     countDownTimer();
    });

    return (
        <div className={`countdown ${mode ? "countdown_light-mode" : "countdown_dark-mode"}`}>
            {isReleased
                ?
                <>
                    <div className="countdown__fragment">
                        <span className="countdown__number ">{countdownTime.days}</span>
                        <span className="number-description ">days</span>
                    </div>
                    <div className="countdown__fragment">
                        <span className="countdown__number">{countdownTime.hours}</span>
                        <span className="number-description">hrs</span>
                    </div>
                    <div className="countdown__fragment">
                        <span className="countdown__number">{countdownTime.minutes}</span>
                        <span className="number-description">min</span>
                    </div>
                    <div className="countdown__fragment">
                        <span className="countdown__number">{countdownTime.seconds}</span>
                        <span className="number-description">sec</span>
                    </div>
                </>
                :
                <>
                    <Typography className="release">Released: {moment(releaseDate).format("MMMM DD, YYYY")}</Typography>
                </>
            }
        </div>
    );
};

export default Countdown;