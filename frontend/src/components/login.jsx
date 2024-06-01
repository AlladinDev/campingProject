import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  addUserType } from '../redux/userSlice'
import axios from 'axios';
const LoginForm = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState({ email: '', password: '' })
  const [err, setError] = useState({ email: "", password: "" })//login validation error
  const [apiError, setApiError] = useState('')//api error message
  const [apiSuccess, setApiSuccess] = useState('')//api success message
  const [isSubmitting, setSubmitting] = useState(false)//flag for submit button status
  const navigate = useNavigate()
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const handleChange = (e) => {
    setApiError('')//set api error message if any
    setApiSuccess('')//reset api success message if any
    const { name, value } = e.target
    setError({ ...err, [name]: "" })//remove corresponding error msg 
    setData({ ...data, [name]: value })
  }
  const handleSubmit = async (event) => {
    const errors = {}
    event.preventDefault();
    if (!validateEmail(data.email)) {//check email validation
      errors.email = "Invalid Email Address"//enter email error message
    }
    if (data.password.length < 8) {//check password validation
      errors.password = 'minimum 8 digits password required'//password error message
    }
    console.log(Object.keys(errors).length)
    if (data.userType == '') {
      errors.userType = 'userType is required'//userType error message
    }
    if (Object.keys(errors).length > 0) { //if error object created above then return and dont go for api call
      setError(errors)//set error object
      console.log('error created is', err)
      return //return back 
    }
    //now api calls
    console.log('final valid data is', data)
    setApiError('')//set api error message if any
    // setApiSuccess('')//reset api success message if any
    try {
      setSubmitting(true)//set submit button status to true
      const response = await axios.post(`http://localhost:8000/api/${data.userType}/login`, data)
      dispatch(addUserType(data.userType))
      // dispatch(addUserName(response.data.username))
      navigate({ pathname: '/otpform'},{state: { userType: data.userType, email: data.email } })
    }
    catch (err) {
      console.log('error from login page catch block', err)
      setSubmitting(false)//set submit button status to false or reset it 
      if (err.response.request.status == 500) {//if invalid password response comes status 401
        setApiError("oops server error happened")
        console.log('err is', err)
        return
      }
      setApiError(err.response.data.message)
      
      return
    }
    // Handle form submission here
  }

  return (
    <div className="flex justify-center flex-col min-[670px]:flex-row items-center min-h-[92vh] bg-gray-200">

      <div className='min-h-[50vh]  min-[670px]:h-[90vh] w-full min-[670px]:w-[50%] flex justify-center items-center ' >
        <img src="../../loginformpic.png" alt="" className='bg-cover bg-no-repeat' />
      </div>
      <div className='w-full border min-[670px]:w-[50%] flex justify-center items-center  min-h-[90vh]'>
        <form onSubmit={handleSubmit} className="bg-white font-serif shadow-md shadow-black rounded w-full max-w-[480px] px-9 pt-6 pb-8 mb-4">
          <h3 className='mx-auto text-2xl text-black text-center my-2 '>Login Form</h3>
          <h3 className='apiError text-red-600 text-center uppercase'>{apiError}</h3>
          <h3 className='apiSuccess text-green-600 text-center uppercase'>{apiSuccess}</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name='email' value={data.email} onChange={handleChange} required />
            {err.email && <div className='text-red-700 text-center '>Invalid Email Address</div>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name='password' type="password" value={data.password} required onChange={handleChange} />
            {err.password && <div className='text-red-700 text-center '>8 digit password required</div>}
          </div>
          <div className="mb-6">
            <select name="userType" id="" value={data.userType} onChange={handleChange} className="border appearance-none border-gray-400 rounded px-3 py-2 w-full">
              <option value=''>User Type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guide">Guide</option>
            </select>
            {err.userType && <div className="text-red-500">{err.userType}</div>}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isSubmitting ? 'Submitting...' : "Sign In"}
            </button>
          </div>
          <div className='w-full text-center my-2 text-black curser-pointer'><Link to='/userregister'>Create an account ...</Link></div>
        </form></div>
    </div>
  );
}

export default LoginForm;
