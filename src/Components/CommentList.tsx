import React from "react";
import { useAppSelector } from "../hooks/useTypedHooks";
import CommentContainer from "./CommentContainer";

const CommentList = () => {
    const { data: comments } = useAppSelector((state) => state.comments);

    return (
        <div className="comment-container">
            {[...comments]
                .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
                .map((comment, idx) => (
                    <CommentContainer
                        key={comment.created_at || idx}
                        date={
                            comment.created_at
                                ? new Date(comment.created_at).toLocaleString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : ""
                        }
                        text={
                            <span>
                                <span className="font-bold">{comment.employee_username}:</span> {comment.comment_text}
                            </span>
                        }
                    />
                ))}
        </div>
    );
};

export default React.memo(CommentList);