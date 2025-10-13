import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedHooks";
import { getComments, getMoreComments } from "../features/comments/commentThunk";
import CommentContainer from "./CommentContainer";
import PageWrapper from "./PageWrapper";

const CommentList = () => {
    const dispatch = useAppDispatch();
    const { data: comments = [], offset, hasMore, isLoadingMore } = useAppSelector((state: any) => state.comments);
    const { selectedCustomer } = useAppSelector((state: any) => state.customers);

    const loader = useRef<HTMLDivElement | null>(null);

    // ✅ Fetch initial comments when customer changes
    useEffect(() => {
        if (selectedCustomer?.customer_id) {
            dispatch(getComments(selectedCustomer.customer_id));
        }
    }, [selectedCustomer, dispatch]);

    // ✅ Infinite scroll observer
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (
                target.isIntersecting &&
                hasMore &&
                !isLoadingMore &&
                selectedCustomer?.customer_id
            ) {
                dispatch(getMoreComments({ customer_id: selectedCustomer.customer_id, offset }));
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

    // ✅ Memoized sorted comments (prevents mutation)
    const sortedComments = useMemo(() => {
        return [...comments].sort(
            (a, b) =>
                new Date(b.created_at || 0).getTime() -
                new Date(a.created_at || 0).getTime()
        );
    }, [comments]);

    return (
        <PageWrapper>
            <div className="comment-container">
                {Array.isArray(sortedComments) && sortedComments.length > 0 ? (
                    sortedComments.map((comment, idx) => (
                        <CommentContainer
                            key={idx}
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
                                    <span className="font-bold">{comment.employee_username}:</span>{" "}
                                    {comment.comment_text}
                                </span>
                            }
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-500">No comments found.</div>
                )}
                <div ref={loader} />
                {isLoadingMore && <div className="text-center py-2">Loading more...</div>}
            </div>
        </PageWrapper>
    );
};

export default React.memo(CommentList);
