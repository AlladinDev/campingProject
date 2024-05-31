import React from 'react'
import { useSelector } from 'react-redux'
function Dashboard() {
const totalUSers=useSelector((state)=>state.allUsers.userData.length)
const totalMembers=useSelector((state)=>state.allMembers.memberData.length)
    return (
        <div>
            <div className=' flex justify-evenly text-2xl text-black my-5 items-center gap-4 flex-wrap'>
                <div className='p-12 w-[12rem] hover:bg-blue-500 hover:scale-125 transition duration-700 bg-white bg-opacity-15 backdrop-blur-lg aspect-square border border-white'>Total Users: {totalUSers}</div>
                <div className='p-12 w-[12rem]  hover:bg-blue-500 hover:scale-125 transition duration-700 bg-white bg-opacity-15 backdrop-blur-lg aspect-square border border-white'>Total Members: {totalMembers}</div>
            </div>
        </div>
    )
}

export default Dashboard
