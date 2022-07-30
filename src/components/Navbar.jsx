

export default function Navbar() {
  return (
    <>
      <div className="navbar flex justify-between bg-primary text-primary-content">
        <a className="btn btn-ghost normal-case text-xl">Customer Assiting Tool</a>
        <input type="text" placeholder="Type here" className="input mr-[20px] input-bordered w-full max-w-xs" />
      </div>
    </>
  )
}