import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedHooks";
import { getComments } from "../features/comments/commentThunk";
import CommentContainer from "../Components/CommentContainer"
import CommentIntput from "../Components/CommentIntput"
import CusotmerInformation from "../Components/CusotmerInformation"
import SearchCustomer from "../Components/SearchChustomer"

function CustomerLookUp() {
  const dispatch = useAppDispatch();
  const { selectedCustomer } = useAppSelector((state) => state.customers);

  const { data: comments, isLoading, error } = useAppSelector((state) => state.comments);


  useEffect(() => {
    if (selectedCustomer?.customer_id) {
      dispatch(getComments(selectedCustomer.customer_id));
    }
  }, [dispatch, selectedCustomer]);

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  return (
    <div className="w-full max-w-5xl mx-auto">
      <SearchCustomer />

      <CusotmerInformation />

      <div className="comment-container">
        {[...comments]
          .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
          .map((comment, idx) => (
            <CommentContainer
              key={idx}
              date={
                comment.created_at
                  ? new Date(comment.created_at).toLocaleString()
                  : ""
              }
              text={`${comment.employee_username}: ${comment.comment_text}`}
            />
          ))}
      </div>
      <CommentIntput />
    </div>
  )
}

export default CustomerLookUp