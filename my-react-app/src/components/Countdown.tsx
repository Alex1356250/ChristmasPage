import '../index.css';
import { useState, useEffect } from 'react';
import gift from '../../public/gift.png';

function Countdown() {
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    const [distance, setDistance] = useState(0);
    const [isChristmas, setIsChristmas] = useState(false);

    useEffect(() => {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, "0")
        const mm = String(today.getMonth() + 1).padStart(2, "0")
        const yyyy = today.getFullYear()
        const nextYear = yyyy + 1
        const dayMonth = "12/24/"
        let christmas = dayMonth + yyyy

        const todayString = `${mm}/${dd}/${yyyy}`
        if (todayString > christmas) {
            christmas = dayMonth + nextYear;
        }

        const countDown = new Date(christmas).getTime();

        const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDown - now;

        setDistance(distance);

        if (distance < 0) {
            setIsChristmas(true);
            clearInterval(interval);
        }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Bouton vers gift
   
    function monTimer(event: React.MouseEvent<HTMLButtonElement>) {
           event.preventDefault();
        alert("Et le compteur il sert à quoi?? Revenez quand il sera l'heure d'être sage!");
    }


    return (
        <div>
            {isChristmas ? (
                <h1>It's Christmas Time!</h1>
            ) : (
                <div className="countdown-container">
                    <div className="gift-container">
                    <button type="button" className="button" onClick={monTimer}><img src={gift} alt="gift" className="gift" id="gift"/></button>
                    </div>
                <div className="countdown">
                    <div id="days">{days} jours</div>
                    <div id="hours">{hours} heures</div>
                    <div id="minutes">{minutes} minutes</div>
                    <div id="seconds">{seconds} secondes</div>
                </div>
                </div>
            )}
        </div>
    );
};

export default Countdown;
