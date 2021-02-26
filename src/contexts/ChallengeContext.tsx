import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengeCompleted: number
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengeCompleted: number;
    experienceToNextLevel: number;
    actveChallenge: Challenge;
    levelUp: () => void,
    startNewChalenge: () => void,
    resetChalleng: () => void,
    completedChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setchallengeCompleted] = useState(rest.challengeCompleted ?? 0);

    const [actveChallenge, setActveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));

    }, [level, currentExperience, challengeCompleted]);

    function levelUp() {
        setLevel(level + 1);
    }


    function startNewChalenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActveChallenge(challenge);
        debugger;

        if (Notification.permission === 'granted') {
            new Audio('/notification.mp3').play();
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`,
                icon: 'favicon.png'
            });
        }
    }

    function resetChalleng() {
        setActveChallenge(null);
    }

    function completedChallenge() {
        if (!actveChallenge) {
            return;
        }
        const { amount } = actveChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActveChallenge(null);
        setchallengeCompleted(challengeCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengeCompleted,
            levelUp,
            startNewChalenge,
            actveChallenge,
            resetChalleng,
            experienceToNextLevel,
            completedChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}