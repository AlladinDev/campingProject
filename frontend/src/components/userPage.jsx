// UserPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import Profilepage from './profilepage';
const UserPage = () => {
  const user=useSelector((state)=>state.user.user)
  console.log(user)
  return (
    <div className="p-12">
      <Profilepage data={user} heading='Trips Joined'/>
    </div>
  );
};

export default UserPage;

