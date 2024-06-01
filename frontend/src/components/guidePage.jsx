import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Profilepage from './profilepage';
import { addUser } from '../redux/userSlice';
import axios from 'axios'
import { useDispatch } from 'react-redux';

const GuideProfile = () => {
  const dispatch = useDispatch()
  const email = useSelector((state) => state.user.userEmail)
  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/guide/getguidedata', { email: email })
       dispatch(addUser(response.data.user))
      }
      catch (err) {
        console.log(err)
      }
      fetchGuideData()
    }
  }, [])
  const data = useSelector((state) => state.user.user)
  return (
    <Profilepage data={data} heading='Trips Allocated' />
  );
};

export default GuideProfile;
