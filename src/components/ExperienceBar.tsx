import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {

    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentCompleted = Math.round((currentExperience / experienceToNextLevel) * 100);
    console.log(percentCompleted);


    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentCompleted}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percentCompleted}%` }} >{currentExperience} xp</span>
            </div>
            <span>{currentExperience} xp</span>

        </header>
    );
}