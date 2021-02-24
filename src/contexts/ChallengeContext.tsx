import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengeCompeted: number;
    experienceToNextLevel: number;
    actveChallenge: Challenge;
    levelUp: () => void,
    startNewChalenge: () => void,
    resetChalleng: () => void,
    challengeSucceeded: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengeProvider({ children }: ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengeCompeted, setChallengeCompeted] = useState(0);

    const [actveChallenge, setActveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChalenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActveChallenge(challenge);
    }

    function resetChalleng() {
        setActveChallenge(null);
    }

    function challengeSucceeded() {
        setChallengeCompeted(challengeCompeted + 1);
        debugger;
        if ((currentExperience + actveChallenge.amount) >= experienceToNextLevel) {
            levelUp();
            setCurrentExperience((currentExperience + actveChallenge.amount) - experienceToNextLevel);
        }
        else {
            setCurrentExperience(currentExperience + actveChallenge.amount);
        }

        setActveChallenge(null);
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengeCompeted,
            levelUp,
            startNewChalenge,
            actveChallenge,
            resetChalleng,
            experienceToNextLevel,
            challengeSucceeded
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}