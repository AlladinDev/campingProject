import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import validator from './customformvalidator'
const Form = () => {
    const navigate = useNavigate()
    const id = useSelector((state) => state.user.deviceID)
    const [fingerprint, setFingerPrint] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        age: '',
        gender: '',
        email: '',
        password: '',
        address: '',
        photo: null,
        mobile: '',
        userType: 'user'
    });

    useEffect(() => {//useEffect for getting fingerprint from redux and storing locally in above useState
        setFingerPrint(id)
    }, [])
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

        errors[e.target.name] = ""
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        setErrors({ ...errors, photo: '' })
        setFormData({
            ...formData,
            photo: e.target.files[0],
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { err, errors, data } = validator(formData)
        if (err) {
            setErrors(errors)
            return
        }
        setSubmitting(true)    
        setSubmittingMsg('submitting form data plz wait')
        console.log('all validations passed printing from data')
        console.log('final data ready to be registered from register page is', formData)
        try {
            const dataReceived = await axios.post('http://localhost:8000/api/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'deviceId': fingerprint//send device unique id,

                }, withCredentials: true
            })
            setSubmitting(false)
            setSubmittingMsg('')
            setApiSuccess('user Registered successfully')
            console.log('data received is', dataReceived)
            setTimeout(() => navigate('/userlogin'), 2000)
        }
        catch (err) {
            console.log('api error is', err)
            setSubmitting(false)
            setSubmittingMsg('')
            setApiSuccess('')
            setApiErr(err.response.data.message)
            console.log(err.response.data.message)
        }

    }
    return (
        <div className=" formcontainer mx-auto bg-cover bg-center bg-[url('../../registerpics.jpg')] flex  justify-center items-center p-4 min-h-[92vh]">
            <form onSubmit={handleSubmit} className='rounded-md shadow-lg bg-white bg-opacity-15 backdrop-blur-lg border-2 border-gray p-5 mt-2 '>
                <h4 className='text-center text-black font-serif font-semibold text-2xl my-1'>Registration Form</h4>
                <div className='text-center bg-white rounded-full text-green-600 uppercase font-serif animate-pulse'>{apiSuccess}</div>
                <div className='text-center text-white uppercase'>{apiErr}</div>
                <div className='text-center text-black uppercase'>{submittingMsg}</div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
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
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                    />
                    {errors.age && <div className="text-white">{errors.age}</div>}
                </div>

                <div className="mb-4">
                    <select name="gender" id="" value={formData.gender} onChange={handleChange} className="border appearance-none border-gray-400 rounded px-3 py-2 w-full">
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
                        value={formData.email}
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
                        value={formData.password}
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
                        value={formData.mobile}
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
                        value={formData.address}
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
                        value={formData.userType}
                        onChange={handleChange}
                        placeholder="userType"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                        readOnly={true}
                    />

                </div>

                <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded w-[100%] block mx-auto hover:bg-blue-600">
                    {isSubmitting ? 'Submitting' : "Submit"}
                </button>
                <button className="bg-green-600 my-2  text-white px-4 py-2 rounded w-[100%] block mx-auto " onClick={() => navigate('/userlogin')}>
                    Already have an account..
                </button>
            </form>
        </div>

    );
};

export default Form;
