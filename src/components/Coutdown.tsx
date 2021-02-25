import { useState, useEffect, useContext } from 'react';
import { CountdonwContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'


export function Countdown() {
    const { minutes, seconts, hasFInished, resetCountdown, startCountdown, isActive } = useContext(CountdonwContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconts).padStart(2, '0').split('');



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