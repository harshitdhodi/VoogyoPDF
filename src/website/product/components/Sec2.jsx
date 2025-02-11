import React from 'react'
import login from "../../images/login.png"
const Sec2 = () => {
  return (
    <div className='max-w-[83rem]'>
    <div className='my-16 gap-12 flex justify-center items-center'>
        {/* //image section */}
      <div className='w-1/3'>
        <img src={login} alt="" />
      </div>

        {/* content sec  */}
      <div className='flex flex-col gap-3'>
        <h2 className='text-4xl text-[#9f54bd] font-semibold'>Voogyo Software ___</h2>
        <p className='text-md font-medium text-gray-500'>Unlock Your Dream Destinations with Seamless Travel Solutions!</p>
      </div>
    </div>
    </div>
  )
}

export default Sec2
