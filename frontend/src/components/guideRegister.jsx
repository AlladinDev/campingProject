import React, { useState } from 'react';
import validator from './customformvalidator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addAnotherMember } from '../redux/teamMemberSlice';
import api from './baseApi';
const Form = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false)
  const [statusMessages, setStatusMessages] = useState({
    apiErr: '',
    apiSuccess: '',
    submittingMsg: ''
  });
  const deleteStatusMessages = () => {
    setStatusMessages({})
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    deleteStatusMessages()
    setErrors({ ...errors, [name]: "" })//delete error message for field where user is typing
  };
  const handleFileChange = (e) => {
    deleteStatusMessages()
    setErrors({ ...errors, photo: '' })
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    deleteStatusMessages()
    const formDataObj = new FormData(e.target)
    const formData = {}
    formDataObj.entries().forEach(([key, value]) => {
      formData[key] = value
    });
    formData.userType = 'guide'
    const { err, errors, data } = validator(formData)//returns err:boolean,errors:object,data:actual data
    console.log(errors)
    setErrors(errors)//set error messages if any
    if (err)
      return//if error dont make any api call just return back
    if (formData.userType !== 'guide') {//registration should be of guide here if not return with error
      setStatusMessages({ ...statusMessages, apiErr: "Register as Guide Only" })
      return
    }
    setSubmitting(true)
    try {
      setStatusMessages({ ...statusMessages, submittingMsg: "Submitting Data..." })
      const result = await api.post('/api/guide/register', data, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })
      deleteStatusMessages()
      setStatusMessages({ ...statusMessages, apiSuccess: "Form Submitted Successfully" })
      console.log('api response is', result)
      setSubmitting(false)
      dispatch(addAnotherMember(result.data.user))//add member added to redux store
    }
    catch (err) {
      console.log('api error is', err);
      setSubmitting(false);
      deleteStatusMessages();
      if (err.response) {
          setStatusMessages(prevState => ({ ...prevState, apiErr: err.response.data.message }));
      } else if (err.request) {
          setStatusMessages(prevState => ({ ...prevState, apiErr: 'Server Error' }));
      } else {
          setStatusMessages(prevState => ({ ...prevState, apiErr: 'Something Went Wrong' }));
      }
  }
    //console.log('data received from custom validator is',err,errors,data)


  }

  return (
    <div className=" formcontainer mx-auto bg-cover bg-center  flex  justify-center items-center min-h-[92vh]">
      <form onSubmit={handleSubmit} className='rounded-md shadow-lg bg-white border border-black bg-opacity-15 backdrop-blur-lg text-black  p-5 md:px-9 mt-2 '>
        <h4 className='text-center text-black font-serif font-semibold text-2xl my-1'>Registration Form</h4>
        <div className='text-center my-1 bg-white rounded-full text-green-600 uppercase font-serif animate-pulse'>{statusMessages.apiSuccess}</div>
        <div className='text-center my-1 text-red-600 uppercase'>{statusMessages.apiErr}</div>
        <div className='text-center my-1 text-black uppercase'>{statusMessages.submittingMsg}</div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
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
            onChange={handleChange}
            placeholder="Age"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.age && <div className="text-red-500">{errors.age}</div>}
        </div>

        <div className="mb-4">
          <select name="gender" onChange={handleChange} className="border appearance-none border-gray-400 rounded px-3 py-2 w-full">
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
           
            onChange={handleChange}
            placeholder="Address"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          {errors.address && <div className="text-red-500">{errors.address}</div>}
        </div>
        <div className="mb-4">
          <select name="qualification" required  onChange={handleChange} className='border border-gray-400 rounded px-3 py-2 w-full'>
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
