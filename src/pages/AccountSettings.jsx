export default function AccountSettings() {
  return (
    <>
      <div className="bg-base-200 w-[100%] max-h-full flex flex-col justfy-center items-center ml-[30px] rounded-box mb-[20px] mt-[20px] mr-[20px]">

        <div className="bg-base-200 w-[75%] md:w-[100%] flex flex-col justfy-center ml-[20px] rounded-box mb-[20px] mt-[20px] mr-[20px]">

          <div className="mb-7 flex justify-center gap-[80px] md:gap-[15px] border-8 p-3">
            <div className="text-center">
              <h1 className="font-bold text-xl">Account settings</h1>

            </div>
          </div>

          <form id="input-container" className="flex flex-col w-[75%] ml-3">

            <p>Name:</p>
            <input className="border-2 mb-2"
              id="name"
              placeholder="Update name:"
            />
            <p>Age:</p>
            <input className
              ="border-2 mb-2"
              id="age"
              placeholder="age:"
            />
            <p>SSN:</p>
            <input className
              ="border-2 mb-2"
              id="ssn"
              placeholder="Update ssn:"
            />
            <p>Email:</p>
            <input className
              ="border-2 mb-2"
              id="email"
              type="email"
              placeholder="Update email:"
            />
            <p>Phone number:</p>
            <input className
              ="border-2 mb-2"
              id="phoneNumber"
              placeholder="Update Phone number:"
            />
            <p>Tyoe of customer:</p>
            <input className
              ="border-2 mb-2"
              id="type"
              placeholder="Update type:"
            />
            <p>Address:</p>
            <input className
              ="border-2 mb-2"
              id="address"
              placeholder="Update address:"
            />
            <input type="file" className

              ="border-2 mb-2"
              id="address"
              placeholder="Update address:"
            />
            <button class="btn btn-primary"
              type="submit"
            >Submit</button>
          </form>


        </div>
      </div>

    </>

  )
}