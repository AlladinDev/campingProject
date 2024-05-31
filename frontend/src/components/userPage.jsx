// UserPage.js
import React from 'react';
import { useSelector } from 'react-redux';


const UserPage = () => {
  const user=useSelector((state)=>state.user.user)
  console.log(user)
  return (
    <div className="p-12">
      {
        Object.keys(user).length!==0 && <div className="bg-white rounded-lg overflow-hidden">
        <img src={user.photo} alt={user.username} className="w-[6rem]  border-[#4FB6B9] border-2 rounded-full aspect-square mx-auto mt-5" />
        <div className="p-1 text-center">
          <h2 className=" text-2xl font-semibold mb-2 text-[#4FB6B9]">{user.username}</h2>
          <p className="text-gray-600 text-sm"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-600 text-sm"><strong>Mobile:</strong> {user.mobile}</p>
          <p className="text-gray-600 text-sm"><strong>Address:</strong> {user.address}</p>
          <div className="mt-4">
            <p className="text-gray-700"><strong>Trips:</strong> {user.trips ? 'yes' :'No'}</p>
            <p className="text-gray-700"><strong>Guide:</strong> {user.guide ? 'Yes' : 'No'}</p>
            <p className="text-gray-700"><strong>Age:</strong> {user.age}</p>
            <p className="text-gray-700"><strong>Gender:</strong> {user.gender}</p>
          </div>
        </div>
      </div>
      }
     
    </div>
  );
};

export default UserPage;

