import { useEffect, useState } from "react";

export default function ScreenSizeWarning() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const checkSize = () => setShow(window.innerWidth < 770);
        checkSize();
        window.addEventListener("resize", checkSize);
        return () => window.removeEventListener("resize", checkSize);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xs text-center">
                <h2 className="text-xl font-bold mb-2 text-[#3a1b10]">Screen Too Small</h2>
                <p className="mb-4 text-[#3a1b10]">
                    Please use a larger screen or rotate your device to landscape mode for the best experience.
                </p>
            </div>
        </div>
    );
}