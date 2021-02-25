import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdonwContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { actveChallenge, resetChalleng, completedChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdonwContext);

    function handleChallengeSucceeded() {
        completedChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChalleng();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {actveChallenge ?
                (
                    <div className={styles.challengeActive}>
                        <header>Ganhe {actveChallenge.amount} xp</header>

                        <main>
                            <img src={`icons/${actveChallenge.type}.svg`} alt="teste" />
                            <strong>Novo desafio</strong>
                            <p>{actveChallenge.description}s</p>
                        </main>
                        <footer>
                            <button
                                type="button"
                                onClick={handleChallengeFailed}
                                className={styles.challengeFailedButton}>
                                Falhei
                            </button>
                            <button
                                type="button"
                                onClick={handleChallengeSucceeded}
                                className={styles.challengeSucceededButton}>
                                Completei
                            </button>

                        </footer>
                    </div>
                ) :
                (
                    <div className={styles.challengeNotActive}>
                        <strong>FInalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level up" />
                    Avance de level completando desafios
                </p>
                    </div>
                )
            }
        </div >
    );
}