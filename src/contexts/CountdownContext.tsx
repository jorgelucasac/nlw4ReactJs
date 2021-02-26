import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengeContext";

interface CountdonwContextData {
    minutes: number;
    seconts: number;
    hasFInished: boolean;
    isActive: boolean;
    startCountdown: () => void
    resetCountdown: () => void
}


interface CountdonwProviderProps {
    children: ReactNode;
}
let countdownTimeOut: NodeJS.Timeout;

export const CountdonwContext = createContext({} as CountdonwContextData);

export function CountdonwProvider({ children }: CountdonwProviderProps) {
    const { startNewChalenge } = useContext(ChallengesContext);
    const timeTotal = 25;
    const [time, setTime] = useState(timeTotal * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFInished, sethasFInished] = useState(false);


    const minutes = Math.floor(time / 60);
    const seconts = time % 60;

    function startCountdown() {
        setIsActive(true);
    }
    function resetCountdown() {
        clearTimeout(countdownTimeOut);
        setIsActive(false);
        setTime(timeTotal * 60);
        sethasFInished(false)
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
        <CountdonwContext.Provider value={{
            minutes,
            seconts,
            hasFInished,
            startCountdown,
            resetCountdown,
            isActive
        }}>
            {children}
        </CountdonwContext.Provider>
    );
}