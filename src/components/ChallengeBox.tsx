import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { actveChallenge, resetChalleng, challengeSucceeded } = useContext(ChallengesContext);


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
                                onClick={resetChalleng}
                                className={styles.challengeFailedButton}>
                                Falhei
                            </button>
                            <button
                                type="button"
                                onClick={challengeSucceeded}
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