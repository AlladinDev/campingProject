import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
function AllMembers() {
  const [userData, setUserData] = useState()
  const users = useSelector((state) => state.allMembers.memberData)
  useEffect(() => {
    // add users fetched from redux to useState variable userData
    setUserData(users)
  }, [])
  return (
    <div className='flex justify-around  flex-wrap'>
      {
        userData && userData.map((item, keys) => (
          <div key={keys} className="w-full  bg-white bg-opacity-15 backdrop-blur-lg max-w-sm border border-black rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ease-in-out hover:scale-105 hover:bg-blue-300">
            <img className="w-[60%] rounded-full my-1 aspect-square mx-auto" src={item.photo} alt="User profile" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.username}</div>
              <p className=" text-white ">Email: {item.email}</p>
              <p className="text-white">Age: {item.age}</p>
              <p className="text-white">Gender: {item.gender}</p>
              <p className="text-white">Trip: {item.trip}</p>
              <p className="text-white">Address: {item.address}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default AllMembers

