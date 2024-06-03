import React, { useState } from 'react';
import axios from 'axios';
import validator from './customformvalidator';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { addAnotherMember } from '../redux/teamMemberSlice';
const Form = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    address: '',
    photo: null,
    mobile: '',
    userType: '',
    qualification: ''
  });
  const [errors, setErrors] = useState({});
  const [apiErr, setApiErr] = useState('')
  const [apiSuccess, setApiSuccess] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [submittingMsg, setSubmittingMsg] = useState('')//submitting message
  const handleChange = (e) => {
    const { name, value } = e.target;
    setApiErr('')//delete api error
    setApiSuccess('')//delete api success messages
    setSubmittingMsg('')//delete submission messages
    //console.log(errors)
    setErrors({ ...errors, [name]: "" })//delete error message for field where user is typing
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setApiErr('')//delete api error
    setApiSuccess('')//delete api success messages
    setSubmittingMsg('')//delete submission messages
    setErrors({ ...errors, photo: '' })
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    setApiSuccess('')
    
    setErrors()
    e.preventDefault()
    console.log('data received in handlesubmit  function is', formData)
    formData.userType='guide'
    const { err, errors, data } = validator(formData)//returns err:boolean,errors:object,data:actual data
    console.log(errors)
    setErrors(errors)//set error messages if any
    if (err)
      return//if error dont make any api call just return back
    if (formData.userType !== 'guide')
    {//registration should be of guide here if not return with error
      setApiErr('register as guide only')
      return
    }
    setSubmitting(true)
    try {
      setSubmittingMsg('submitting form data')
      const result = await axios.post('http://localhost:8000/api/guide/register', data, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })
      setSubmittingMsg('')
      setApiSuccess('Guide registered successfully')
      console.log('api response is', result)
      setSubmitting(false)
      dispatch(addAnotherMember(result.data.user))//add member added to redux store
    }
    catch (error) {
      setSubmitting(false)
      setSubmittingMsg('')
      setApiSuccess('')
      if(err.request)
      return setApiErr('oops server shutdown')
        console.log('error message from backend is', error.response.data.message)
        setApiErr(error.response.data.message)
        console.log('api error is', error)
    }
    //console.log('data received from custom validator is',err,errors,data)


  }

  return (
    <div className=" formcontainer mx-auto bg-cover bg-center  flex  justify-center items-center min-h-[92vh]">
      <form onSubmit={handleSubmit} className='rounded-md shadow-lg bg-white border border-black bg-opacity-15 backdrop-blur-lg text-black  p-5 md:px-9 mt-2 '>
        <h4 className='text-center text-black font-serif font-semibold text-2xl my-1'>Registration Form</h4>
        <div className='text-center my-1 bg-white rounded-full text-green-600 uppercase font-serif animate-pulse'>{apiSuccess}</div>
        <div className='text-center my-1 text-red-600 uppercase'>{apiErr}</div>
        <div className='text-center my-1 text-black uppercase'>{submittingMsg}</div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.username && <div className="text-red-500">{errors.username}</div>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.age && <div className="text-red-500">{errors.age}</div>}
        </div>

        <div className="mb-4">
          <select name="gender" value={formData.gender} onChange={handleChange} className="border appearance-none border-gray-400 rounded px-3 py-2 w-full">
            <option value=''>select gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          {errors.gender && <div className="text-red-500">{errors.gender}</div>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.password && <div className="text-red-500">{errors.password}</div>}
        </div>
        <div className="mb-4">
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="enter a valid mobile number"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.mobile && <div className="text-red-500">{errors.mobile}</div>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.address && <div className="text-red-500">{errors.address}</div>}
        </div>
        <div className="mb-4">
          <select name="qualification" required value={formData.qualification} onChange={handleChange} className='border border-gray-400 rounded px-3 py-2 w-full'>
            <option value="">enter your qualification</option>
            <option value="Undergraduate">Ug</option>
            <option value="PostGraduate">Pg</option>
            <option value="phd">Phd</option>
          </select>
          {errors.qualification && <div className="text-red-500">{errors.qualification}</div>}
        </div>

        <div className="mb-4">
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.photo && <div className="text-red-500">{errors.photo}</div>}
        </div>
        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded w-[100%] block mx-auto hover:bg-blue-600">
          {isSubmitting ? 'Submitting' : "Submit"}
        </button>
      </form>
    </div>

  );
};

export default Form;
