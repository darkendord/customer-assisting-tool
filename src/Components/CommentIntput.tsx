import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedHooks";
import { addComment } from "../features/comments/commentThunk";

const CommentInput = () => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState("");
    const { selectedCustomer } = useAppSelector((state) => state.customers);
    const employeeData = useAppSelector((state) => state.employee.current);
    //@ts-ignore
    const employee = Array.isArray(employeeData?.items) && employeeData.items.length > 0
        ? employeeData.items[0]
        : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCustomer?.customer_id || !employee?.username || !text.trim()) return;
        dispatch(addComment({
            customer_id: selectedCustomer.customer_id,
            employee_username: employee.username,
            comment_text: text.trim(),
            type: "comment",
        }));
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center gap-4 bg-[#fbf4e9] p-4 rounded-2xl shadow w-full max-w-2xl mx-auto mb-4">
            <textarea
                className="resize-none flex-1 min-h-[48px] max-h-40 border border-gray-300 rounded-lg p-3 text-[#3a1b10] bg-white focus:outline-none focus:ring-2 focus:ring-[#3a1b10] transition"
                placeholder="Write a comment..."
                value={text}
                onChange={e => setText(e.target.value)}

            />
            <button
                type="submit"
                className="bg-[#3a1b10] text-white font-semibold rounded-lg px-6 py-2 h-12 hover:bg-[#5c3a23] transition disabled:opacity-60"
                disabled={!text.trim()}
            >
                Comment
            </button>
        </form>
    );
};

export default React.memo(CommentInput);