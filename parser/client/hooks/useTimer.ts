import { useRef, useState } from "react"

interface IUseTimer {
    count: number;
    startTimer: (s: number) => void;
    resetTimer: (s: number) => void;
    clearTimer: () => void;
}

export const useTimer = (action: () => void): IUseTimer => {
    const timer = useRef<NodeJS.Timer>();
    const [count, setCount] = useState<number>(0);

    const startTimer = (s: number) => {
        setCount(s)

        timer.current = setInterval(() => {
            setCount(c => {
                c -= 1;

                if (c <= 0) {
                    clearTimer();
                    action();
                }

                return c
            })
        }, 1000);
    }

    const clearTimer = () => {
        clearInterval(timer.current);
    }

    const resetTimer = (s: number) => {
        clearTimer();
        startTimer(s);
    }

    return { count, startTimer, clearTimer, resetTimer }
}