import React, { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedHooks";
import { getMoreComments } from "../features/comments/commentThunk";
import CommentContainer from "./CommentContainer";
import PageWrapper from "./PageWrapper";

const CommentList = () => {
    const dispatch = useAppDispatch();
    const { data: comments, offset, hasMore, isLoadingMore } = useAppSelector((state) => state.comments);
    const { selectedCustomer } = useAppSelector((state) => state.customers);
    const loader = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !isLoadingMore) {
                if (selectedCustomer && typeof selectedCustomer.customer_id === "number") {
                    dispatch(getMoreComments({ customer_id: selectedCustomer.customer_id, offset }));
                }
            }
        },
        [dispatch, hasMore, isLoadingMore, offset, selectedCustomer]
    );

    useEffect(() => {
        const option = { root: null, rootMargin: "20px", threshold: 1.0 };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [handleObserver]);

    return (
        <PageWrapper>
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
                <div ref={loader} />
                {isLoadingMore && <div className="text-center py-2">Loading more...</div>}
            </div>
        </PageWrapper>
    );
};

export default React.memo(CommentList);