import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
function AllUsers() {
  const users = useSelector((state) => state.allUsers.users)
  return (
    <div className='flex justify-around flex-wrap text-white'>
      {
        users ? users.map((item, keys) => (
          <div key={keys} className="w-full max-w-sm  bg-white bg-opacity-15 backdrop-blur-lg border border-black rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ease-in-out hover:scale-105">
            <img className="w-[60%] rounded-full my-1 aspect-square mx-auto" src={item.photo} alt="User profile" />
            <div className="px-6 py-4 text-white">
              <div className="font-bold text-xl mb-2">{item.username}</div>
              <p className=" text-base">Email: {item.email}</p>
              <p className=" text-base">Age: {item.age}</p>
              <p className=" text-base">Gender: {item.gender}</p>
              <p className=" text-base">Trip: {item.trip}</p>
              <p className=" text-base">Address: {item.address}</p>
            </div>
          </div>
        )) 
        : <div className='min-h-[90vh] flex justify-center items-center'>
        <h3 className='text-2xl text-center text-black p-9 shadow-lg rounded-md flex justify-center items-center  min-h-[12rem] hover:scale-105 transition-all duration-500 bg-white'>No User Joined Yet</h3>
      </div>
      }
    </div>
  )
}
export default AllUsers
