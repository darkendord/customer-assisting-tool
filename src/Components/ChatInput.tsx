import React from "react";

interface ChatInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
    loading: boolean;
}

const ChatInput = ({ value, onChange, onSend, loading }: ChatInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onSend();
    };

    return (
        <div className="flex w-full max-w-xl">
            <input
                className="flex-1 p-3 border border-gray-300 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3a1b10] transition"
                type="text"
                placeholder="Type your message..."
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                disabled={loading}
            />
            <button
                className="bg-[#3a1b10] text-white font-semibold rounded-r-lg px-6 py-3 ml-0 hover:bg-[#5c3a23] transition disabled:opacity-60"
                onClick={onSend}
                disabled={loading || !value.trim()}
            >
                {loading ? "..." : "Send"}
            </button>
        </div>
    );
};

export default ChatInput;