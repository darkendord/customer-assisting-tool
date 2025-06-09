import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatMessage from "../Components/ChatMessage";
import ChatInput from "../Components/ChatInput";
const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;
const BACKEND_URL = import.meta.env.VITE_AI_CHATBOT_URL;

const GetAssistance = () => {
    const [messages, setMessages] = useState<{ from: "user" | "bot" | "system"; text: string }[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [{ from: "system", text: "New conversation started." }];
    });
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    // Save messages to localStorage on every update
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    // Optionally, only call /start if conversation is new
    useEffect(() => {
        if (messages.length === 1 && messages[0].from === "system") {
            axios.get(`${BACKEND_URL}/start`);
        }
    }, []);

    // Scroll to bottom on new message
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        setMessages((msgs) => [...msgs, { from: "user", text: input }]);
        setLoading(true);
        // Show waiting message
        setMessages((msgs) => [...msgs, { from: "bot", text: "..." }]);
        try {
            const res = await axios.post(`${BACKEND_URL}/chat`, { message: input });
            setMessages((msgs) => [
                ...msgs.slice(0, -1), // Remove the last "..." message
                { from: "bot", text: res.data.response },
            ]);
        } catch (err) {
            setMessages((msgs) => [
                ...msgs.slice(0, -1),
                { from: "bot", text: "Sorry, there was an error." },
            ]);
        }
        setInput("");
        setLoading(false);
    };

    // Add a button to end the conversation
    const endConversation = () => {
        setMessages([{ from: "system", text: "New conversation started." }]);
        localStorage.removeItem(STORAGE_KEY);
        axios.get(`${BACKEND_URL}/start`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
            <h1 className="text-2xl font-bold mb-4 text-[#3a1b10]">Get Assistance</h1>
            <button
                className="mb-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={endConversation}
            >
                End Conversation
            </button>
            <div
                ref={chatRef}
                className="w-full max-w-xl h-96 bg-[#fbf4e9] rounded-2xl shadow p-4 mb-4 overflow-y-auto"
            >
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} from={msg.from} text={msg.text} />
                ))}
            </div>
            <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSend={sendMessage}
                loading={loading}
            />
        </div>
    );
};

export default GetAssistance;