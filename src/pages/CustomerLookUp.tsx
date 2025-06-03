import CommentIntput from "../Components/CommentIntput"
import CusotmerInformation from "../Components/CusotmerInformation"
import SearchCustomer from "../Components/SearchChustomer"
import CommentList from "../Components/CommentList";

function CustomerLookUp() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <SearchCustomer />
      <CusotmerInformation />
      <CommentList />
      <CommentIntput />
    </div>
  )
}

export default CustomerLookUp