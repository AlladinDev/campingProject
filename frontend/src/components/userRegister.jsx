import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import validator from './customformvalidator'
import api from './baseApi';
const Form = () => {
    const navigate = useNavigate()
    const fingerprint = useSelector((state) => state.user.deviceID)
    const [errors, setErrors] = useState({});
    const [statusMessages, setStatusMessages] = useState({
        apiErr: '',
        apiSuccess: '',
        submittingMsg: ''
    });
    const deleteStatusMessages = () => {
        setStatusMessages({})
    }
    const [isSubmitting, setSubmitting] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        deleteStatusMessages()
        errors[e.target.name] = ""
    };
    const handleFileChange = (e) => {
        setErrors({ ...errors, photo: '' })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        deleteStatusMessages()
        const formDataObj = new FormData(e.target)
        const formData = {}
        formDataObj.entries().forEach(([key, value]) => {
            formData[key] = value
        });
        formData.userType='user'
        const { err, errors, data } = validator(formData)
        if (err) {
            setErrors(errors)
            return
        }
        setSubmitting(true)
        setStatusMessages(prevState => ({ ...prevState, submittingMsg: 'Submitting form data plz wait' }))
        try {
            const dataReceived = await api.post('/api/user/register', formData, {
                headers: {
                    'deviceId': fingerprint,//send device unique id,
                    'Content-Type': "multipart/form-data"
                }
            })
            setSubmitting(false)
            deleteStatusMessages()
            setStatusMessages((prevState => ({ ...prevState, apiSuccess: 'Form Submitted Successfully' })))
            console.log('data received is', dataReceived)
            setTimeout(() => navigate('/userlogin'), 2000)
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
    }
    return (
        <div className=" formcontainer mx-auto bg-cover bg-center bg-[url('../../registerpics.jpg')] flex  justify-center items-center p-4 min-h-[92vh]">
            <form onSubmit={handleSubmit} className='rounded-md shadow-lg bg-white bg-opacity-15 backdrop-blur-lg border-2 border-gray p-5 mt-2 '>
                <h4 className='text-center text-black font-serif font-semibold text-2xl my-1'>Registration Form</h4>
                <div className='text-center bg-white rounded-full text-green-600 uppercase font-serif animate-pulse'>{statusMessages.apiSuccess}</div>
                <div className='text-center text-white uppercase'>{statusMessages.apiErr}</div>
                <div className='text-center text-black uppercase'>{statusMessages.submittingMsg}</div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="Username"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                    />
                    {errors.username && <div className="text-white">{errors.username}</div>}
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name="age"
                        onChange={handleChange}
                        placeholder="Age"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                    />
                    {errors.age && <div className="text-white">{errors.age}</div>}
                </div>

                <div className="mb-4">
                    <select name="gender" id="" onChange={handleChange} className="border appearance-none border-gray-400 rounded px-3 py-2 w-full">
                        <option value=''>select gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                    {errors.gender && <div className="text-white">{errors.gender}</div>}
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                    />
                    {errors.email && <div className="text-white">{errors.email}</div>}
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                    />
                    {errors.password && <div className="text-white">{errors.password}</div>}
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        name="mobile"
                        onChange={handleChange}
                        placeholder="enter a valid mobile number"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                    />
                    {errors.mobile && <div className="text-white">{errors.mobile}</div>}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        placeholder="Address"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                    />
                    {errors.address && <div className="text-white">{errors.address}</div>}
                </div>

                <div className="mb-4">
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                    />
                    {errors.photo && <div className="text-white">{errors.photo}</div>}
                </div>
                <div className="mb-4">
                    <input hidden
                        type="text"
                        name="userType"
                        onChange={handleChange}
                        placeholder="userType"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                        readOnly={true}
                    />
                </div>

                <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white btn rounded w-full block mx-auto hover:bg-blue-600">
                    {isSubmitting ? 'Submitting' : "Submit"}
                </button>
                <button className="bg-green-600 my-2  text-white btn rounded w-full hover:bg-green-600 mx-auto " onClick={() => navigate('/userlogin')}>
                    Already have an account..
                </button>
            </form>
        </div>


    );
};

export default Form;
