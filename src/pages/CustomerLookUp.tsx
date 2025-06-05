import CommentIntput from "../Components/CommentIntput"
import CustomerInformation from "../Components/CustomerInformation"
import SearchCustomer from "../Components/SearchChustomer"
import CommentList from "../Components/CommentList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedHooks";
import { getComments } from "../features/comments/commentThunk";

function CustomerLookUp() {
  const dispatch = useAppDispatch();
  const { selectedCustomer } = useAppSelector((state) => state.customers);

  useEffect(() => {
    if (selectedCustomer?.customer_id) {
      dispatch(getComments(selectedCustomer.customer_id));
    }
  }, [dispatch, selectedCustomer]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <SearchCustomer />
      <CustomerInformation />
      <CommentList />
      <CommentIntput />
    </div>
  )
}

export default CustomerLookUp