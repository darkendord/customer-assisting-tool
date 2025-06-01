const CommentInput = () => {
    return (
        <div className="flex justify-center items-center gap-4 bg-[#fbf4e9] p-4 rounded-2xl shadow w-full mx-auto mb-4">
            <textarea
                className="resize-none flex-1 min-h-[48px] max-h-40 border border-gray-300 rounded-lg p-3 text-[#3a1b10] bg-white focus:outline-none focus:ring-2 focus:ring-[#3a1b10] transition"
                placeholder="Write a comment..."
            ></textarea>
            <button
                type="submit"
                className="bg-[#3a1b10] text-white font-semibold rounded-lg px-6 py-2 h-12 hover:bg-[#5c3a23] transition disabled:opacity-60"
            >
                Comment
            </button>
        </div>
    );
}

export default CommentInput;