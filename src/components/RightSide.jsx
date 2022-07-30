import Customer from './Customer';

export default function RightSide() {
  return (
    <>
    <div className="bg-base-200 w-[100%] flex  ml-[30px] rounded-box mb-[20px] mt-[20px] mr-[20px]">

      <div className="bg-primary-900 h-creen flex justify-center w-[50%]">
        <Customer/>
      </div>

    </div>
    <div className="bg-base-200 w-[100%] flex justify-between gap-[20px] rounded-box mb-[20px] mt-[20px] mr-[20px]">
      <div className="bg-primary-900 h-creen border-black w-[50%]">
        <h1>Customer Products</h1>
      </div>

    </div>
    </>
  )
}