import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

interface TimeProps {
    aux: string;
    auxStorageKey?: string;
    auxTimeKey?: string;
}

const DEFAULT_AUX_STORAGE_KEY = "cat_agent_aux";
const DEFAULT_AUX_TIME_KEY = "cat_agent_aux_start_time";

export default function Time({
    aux,
    auxStorageKey = DEFAULT_AUX_STORAGE_KEY,
    auxTimeKey = DEFAULT_AUX_TIME_KEY,
}: TimeProps) {
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // On mount, set timer based on localStorage or initialize if missing
    useEffect(() => {
        // const storedAux = localStorage.getItem(auxStorageKey) || "Out Of Work";
        const storedStart = localStorage.getItem(auxTimeKey);

        let initialSeconds = 0;
        if (storedStart) {
            const start = parseInt(storedStart, 10);
            initialSeconds = Math.floor((Date.now() - start) / 1000);
        } else {
            localStorage.setItem(auxTimeKey, Date.now().toString());
        }
        setSeconds(initialSeconds);

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
        // eslint-disable-next-line
    }, []);

    // On AUX change, reset timer and store new start time
    useEffect(() => {
        localStorage.setItem(auxStorageKey, aux);
        localStorage.setItem(auxTimeKey, Date.now().toString());
        setSeconds(0);

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
        // eslint-disable-next-line
    }, [aux]);

    return <span className="font-mono">{formatTime(seconds)}</span>;
}