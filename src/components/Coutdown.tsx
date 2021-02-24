import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
    const { startNewChalenge } = useContext(ChallengesContext);
    const timeTotal = 0.1;
    const [time, setTime] = useState(timeTotal * 60);
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
        setTime(timeTotal * 60);
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
            startNewChalenge();
        }
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