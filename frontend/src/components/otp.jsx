import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addAuthStatus ,addUser, addUserType} from '../redux/userSlice';
const OtpForm = () => {
    const [data, setData] = useState({ otp: '', email: ''})//otp
    const [err, setError] = useState('')//otp invalid  error
    const [apiError, setApiError] = useState('')//api error message
    const [apiSuccess, setApiSuccess] = useState('')//api success message
    const [isSubmitting, setSubmitting] = useState(false)//flag for submit button status
    const [fingerprint, setFingerprint] = useState('')
    const { email: userEmail } = useParams()
    const dispatch = useDispatch()
    const deviceid = useSelector((state) => state.user.deviceID)//get device id from redux store
    const username=useSelector((state) => state.user.username)
    const userType=useSelector((state) => state.user.userType)
    const handleChange = (e) => {
        setApiError('')//set api error message if any
        setApiSuccess('')//reset api success message if any
        setError('')
        const { name, value } = e.target
        setError('')//remove corresponding error msg 
        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        setFingerprint(deviceid)//set device id in usestate variable fingerprint
        setData({ ...data, email: userEmail,username,userType })
    }, [deviceid])

    const handleSubmit = async (event) => {
        event.preventDefault();
        //otp type validation
        console.log('otp data is', data.otp)
        const pattern = /^[0-9]+$/
        const matchResult = pattern.test(data.otp)
        console.log(matchResult)
        if (matchResult)
            console.log('otp matched successfully in otp from')
        if (!matchResult)
            return setError('invalid otp entered ')
        //now api calls

        setApiError('')//set api error message if any
        setApiSuccess('')//reset api success message if any
        try {
         console.log(userType)
            data.userType=userType//set userType to data.userType
            console.log('final data to be sent for backend is ',data)
            setSubmitting(true)//set submit button status to true
            const response = await axios.post(`http://localhost:8000/api/${userType}/tokengeneration`, data, {
                headers: {
                    deviceId: fingerprint//sent deviceuniqueid with post request
                },
                withCredentials: true
            })
            console.log('response is',response.data)
            dispatch(addAuthStatus(true))//add auth status true to user
            setApiSuccess(response.data.message)
            setSubmitting(false)
            setData({ otp: '' })
        }
        catch (err) {
            setData({ otp: '' })
            setSubmitting(false)//set submit button status to false or reset it 
            if (err.response.request.status == 500) {
                setApiError("oops server error happened")
                console.log(err)
                return

            }
            setApiError(err.response.data.message)
            console.log('error from login page catch block', err)
            return
        }
        // Handle form submission here
    }

    return (
        <div className="flex justify-center items-center min-h-[92vh] bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white font-serif shadow-md shadow-black rounded px-9 pt-6 pb-8  mb-4">
                <h3 className='mx-auto text-2xl text-black text-center my-2 '>Otp Validation Form</h3>
                <h3 className='apiError text-red-600 text-center uppercase'>{apiError}</h3>
                <h3 className='optError text-red-600 text-center uppercase'>{err}</h3>
                <h3 className='apiSuccess text-green-600 text-center uppercase'>{apiSuccess}</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold py-4 " htmlFor="otp">
                        Enter Otp sent to registered email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="otp" type="tel" name='otp' value={data.otp} onChange={handleChange} required />

                    {err.otp && <div className='text-red-700 text-center '>Invalid Otp</div>}
                </div>
                <div>
                    <input type='hidden' readOnly={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name='email' value={data.email} />
                </div>
                <div>
                    <input type='hidden' readOnly={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name='username' value={data.username} />
                </div>
                <div>
                    <input type='hidden' readOnly={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userType" name='userType' value={data.userType} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {isSubmitting ? 'Submitting...' : "Sign In"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OtpForm;
