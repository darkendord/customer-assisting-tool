import { motion } from "framer-motion";

interface ChatMessageProps {
    from: "user" | "bot" | "system";
    text: string;
}

const ChatMessage = ({ from, text }: ChatMessageProps) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={`mb-2 ${from === "user" ? "text-right" : "text-left"}`}
    >
        {from === "system" ? (
            <em className="text-gray-500">{text}</em>
        ) : (
            <span>
                <b className={from === "user" ? "text-[#3a1b10]" : "text-[#5c3a23]"}>
                    {from === "user" ? "You" : "Virtual Assistant"}:
                </b>{" "}
                {text}
            </span>
        )}
    </motion.div>
);

export default ChatMessage;