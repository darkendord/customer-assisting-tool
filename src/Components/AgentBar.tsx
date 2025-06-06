import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../hooks/useTypedHooks";

const AUX_OPTIONS = [
    { value: "Ready", label: "Ready", color: "bg-green-500" },
    { value: "After Call", label: "After Call", color: "bg-yellow-400" },
    { value: "System Issue", label: "System Issue", color: "bg-red-500" },
    { value: "Break", label: "Break", color: "bg-yellow-500" },
    { value: "Lunch", label: "Lunch", color: "bg-yellow-400" },
    { value: "Out Of Work", label: "Out Of Work (OOW)", color: "bg-orange-400" },
];

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

const AgentBar = () => {
    // Get employee name from Redux (adjust path as needed)
    // @ts-ignore
    const employee = useAppSelector((state) => state.employee.current?.items?.[0]);
    const [aux, setAux] = useState("Out Of Work");
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Reset timer on AUX change
    useEffect(() => {
        setSeconds(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [aux]);

    const auxOption = AUX_OPTIONS.find(opt => opt.value === aux);

    return (
        <header className="w-full bg-[#fbf4e9] shadow flex items-center px-8 py-3 fixed top-0 left-0 z-50 h-20">
            <div className="flex-1 flex items-center gap-10 justify-center">
                <span className="text-[#3a1b10] font-bold text-lg">
                    Agent: {employee?.employee_name || employee?.username || "Unknown"}
                </span>
                <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${auxOption?.color} inline-block border border-gray-300`} />
                    <select
                        className="rounded px-3 py-1 border border-gray-300 focus:outline-none font-semibold"
                        value={aux}
                        onChange={e => setAux(e.target.value)}
                    >
                        {AUX_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <span className="ml-4 text-[#3a1b10] font-medium">
                    In <span className="font-bold">{aux}</span> for <span className="font-mono">{formatTime(seconds)}</span>
                </span>
            </div>
        </header>
    );
};

export default AgentBar;