import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompletedChalleng.module.css'

export function CompletedChalleng() {
    const { challengeCompleted } = useContext(ChallengesContext)
    return (
        <div className={styles.completedChallengContainer}>
            <span>Desafios completos</span>
            <span>{challengeCompleted}</span>
        </div>
    );
}