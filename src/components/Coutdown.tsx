import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFInished, sethasFInished] = useState(false);


    const minutes = Math.floor(time / 60);
    const seconts = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconts).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }
    function resetCountdown() {
        setIsActive(false);
        setTime(25 * 60);
        clearTimeout(countdownTimeOut)
    }
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }
        else if (isActive && time == 0) {
            sethasFInished(true);
            setIsActive(false);
            console.log("acabouuuu");
        }
        console.log(time);
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFInished ? (
                <button
                    disabled
                    type="button"
                    onClick={resetCountdown}
                    className={styles.countdownButton}>
                    Ciclo encerrado
                </button>
            )
                :
                (
                    <>
                        {
                            isActive ?
                                (
                                    <button
                                        type="button"
                                        onClick={resetCountdown}
                                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                                        Abandonar um ciclo
                                    </button>
                                )
                                :
                                (
                                    <button type="button" onClick={startCountdown} className={styles.countdownButton}>
                                        Inicar ciclo
                                    </button>
                                )
                        }
                    </>
                )
            }



        </div>
    );
}