import CommentContainer from "../Components/CommentContainer"
import CommentIntput from "../Components/CommentIntput"
import CusotmerInformation from "../Components/CusotmerInformation"
import SearchCustomer from "../Components/SearchChustomer"

function CustomerLookUp() {

  return (
    <div className="w-full max-w-5xl mx-auto">
      <SearchCustomer />

      <CusotmerInformation />

      <div className="comment-container">

        <CommentContainer
          date={""}
          text={""}
        />
        <CommentContainer
          date={""}
          text={""}
        />
        <CommentContainer
          date={""}
          text={""}
        />
        <CommentContainer
          date={""}
          text={""}
        />
        <CommentContainer
          date={""}
          text={""}
        />
        <CommentContainer
          date={""}
          text={""}
        />
      </div>
      <CommentIntput />
    </div>
  )
}

export default CustomerLookUp