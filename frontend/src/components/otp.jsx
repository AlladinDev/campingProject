import axios from 'axios';
import { React, useState, useEffect } from 'react'
import { FaShieldAlt } from 'react-icons/fa';
import { useLocation, useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { addUserType,addAuthStatus,addUserEmail ,addUser} from '../redux/userSlice';
function EmailOtpVerification() {
    const location = useLocation()
    const dispatch = useDispatch()
    const deviceId=useSelector((state)=>state.user.deviceID)
    const { email, userType } = location.state
    console.log(location)
    const [otp, setOtp] = useState('')
    const [otpErr, setOtpErr] = useState('')
    const [otpMsg, setOtpMsg] = useState('')
    const [otpSuccessMsg, setOtpSuccessMsg] = useState('')
    const [isOtpSent, setOtpSent] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)
    const verifyOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8000/api/${userType}/verifyotp`, { email, userType,otp,deviceId}, { withCredentials: true })
            console.log(response.data)
            setOtpSuccessMsg('User Autheticated')
            setOtp('')
            // since user is now authenticated so add his user type and authstatus to redux store
            dispatch(addAuthStatus(true))
            dispatch(addUserEmail(email))
            dispatch(addUserType(userType))
            dispatch(addUser(response.data.user))
        }
        catch (err) {
            console.log('err is', err)
            if (err.response) {
                setOtpErr(err.response.data.message)
                return
            }
            else if (err.request) {
                setOtpErr('Server Connection Failed')
                return
            }
        }
    }
    const requestOtp = async () => {
        try {
            setOtpErr('')
            setButtonClicked(true)
            setOtpMsg('Requesting Otp')
            const response = await axios.post(`http://localhost:8000/api/${userType}/sendotp`,{email:email,userType:userType})
            console.log(`http://localhost:8000/${userType}/sendotp`)
            console.log(response.data)
            setButtonClicked(false)
            setOtpMsg('')
            setOtpSent(true)
        }
        catch (err) {
            console.log('err is', err)
            setButtonClicked(false)
            setOtpSuccessMsg('')
            setOtpMsg('')
            if (err.response) {
                setOtpErr(err.response.data.message)
                return
            }
            else if (err.request) {
                setOtpErr('Server Connection Failed')
                return
            }
        }
    }
    const requestOtpAgain = () => {//if any error occurs in case of otp request otp again here
        setOtp('')
        requestOtp()
    }

    const handleChange = (e) => {
        const { value } = e.target;//extract otp from form input tag
        setOtpErr('')
        setOtpMsg('')
        setOtp(value)
        setOtpSuccessMsg('')

    }
    console.log('err set', otpErr)

    return (
        <div className='w-full flex flex-col sm:flex-row gap-5 justify-center items-center px-4 min-h-[90vh]'>
            <div className='w-full flex justify-center items-center sm:w-[50%] h-[70vh] sm:h-[90vh] '>
                <img src="../../otpdesignpic.png" alt="" className='bg-cover bg-no-repeat' />
            </div>
            <div className='  w-full sm:w-[50%] h-[70vh] sm:h-[90vh] flex justify-center items-center'>
                <div className='w-[23rem] aspect-auto bg-[#ffff] shadow-md'>
                    <form onSubmit={verifyOtp} className=' h-full relative flex items-center flex-col'>
                        <h4 className='text-2xl text-center mb-10 relative top-4 flex justify-center'><FaShieldAlt size={50} /></h4>
                        <h4 className='text-2xl text-center mb-10 relative top-4'>OTP AUTHENTICATION</h4>
                        <small className='text-center text-2xl text-black my-2'>{otpMsg}</small>
                        <small className='text-center text-2xl text-green-600 my-2'>{otpSuccessMsg}</small>
                        <small className='text-center text-2xl text-red-800 my-2'>{otpErr}</small>
                        <div className='w-[98%] mx-auto  '>
                            {isOtpSent ?
                                <input type="tel" name='otp' placeholder='place enter otp here' required value={otp} onChange={handleChange} className='w-full p-4 rounded-full border border-black' /> : null
                            }
                            {
                                otpErr ? null : <button type="submit" disabled={buttonClicked} className={`w-full rounded-md shadow-sm py-3 my-5 bg-[#1D4ED8] ${buttonClicked && ' text-gray-300'}`} onClick={isOtpSent ? verifyOtp : requestOtp}>
                                    {isOtpSent ? "Submit" : "Request otp"}
                                </button>
                            }


                            {//if otp error occurs show this button for resending otp
                                otpErr && <button onClick={requestOtpAgain} className={`w-full rounded-md shadow-sm py-3 my-5 bg-[#1D4ED8] ${buttonClicked && ' text-gray-300'} `}>Request Again</button>
                            }
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmailOtpVerification
