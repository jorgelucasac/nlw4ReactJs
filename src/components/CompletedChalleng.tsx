import styles from '../styles/components/CompletedChalleng.module.css'

export function CompletedChalleng() {
    return (
        <div className={styles.completedChallengContainer}>
            <span>Desafios completos</span>
            <span>5</span>
        </div>
    );
}