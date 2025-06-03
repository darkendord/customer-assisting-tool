interface CommentProps {
    date: string;
    text: React.ReactNode;
}
const CommentContainer: React.FC<CommentProps> = ({ date, text }) => {

    return (
        <div>
            <p className="text-black w-[100%] bg-gray-200 p-3">
                <span>{date || "[12/01/2024 at 3:25PM]"}</span>
                <br />{
                    text ||
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta sunt, itaque iste deserunt excepturi, explicabo aut eaque vero ipsum nobis, adipisci assumenda nesciunt illo? Expedita deserunt minus explicabo doloribus ipsum."
                }</p>
        </div>
    );
}

export default CommentContainer;
