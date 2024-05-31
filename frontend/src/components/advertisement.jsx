import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addAdvertisement } from '../redux/advertisementSlice'
export default function Advertisement() {
    const [apiSuccess, setApiSuccess] = useState('')
    const [apiErr, setApiErr] = useState('')
    const [msg, setMsg] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setApiErr('')
            console.log('i')
            const data = new FormData(e.target)
            const formData = {}
            data.entries().forEach(([key, value]) => {

                formData[key] = value
            })
            console.log(formData)
            setMsg("Adding Advertisement")
            setSubmitting(true)
            const response = await axios.post('http://localhost:8000/api/advertisement/addadvertisement', { advertisement: formData.advertisement })
            setSubmitting(false)
            dispatch(addAdvertisement(response.data.advertisement))
            setMsg('')
            // dispatch(addAdvertisement(response.data.advertisement))
            setApiSuccess("Advertisement Added ")


        }

        catch (err) {
            console.log(err)
            setSubmitting(false)
            setMsg('')
            setApiSuccess('')
            if (err.response) {
                setApiErr(err.response.data.message)
            }
            if (err.request) {
                setApiErr('Server Error')
            }
        }
    }
    const handleChange = () => {
        setMsg('')
        setApiErr('')

    }
    return (
        <div className='min-h-[80vh] flex justify-center items-center  gap-4  px-7'>
            <div className='w-full   min-h-[80vh] flex flex-col justify-center items-center'>
                <h2 className='my-1 text-center'><img src="../../bell.png" alt="" className={`w-[13rem] rounded-full ${isSubmitting ? 'animate-bounce' : "animate-none"}`} /></h2>
                {apiErr && <small className='text-red-700 text-2xl text-center font-bold my-1'>{''}{apiErr}</small>}
                {apiSuccess && <small className='text-green-700 text-2xl text-center  font-bold my-1'>{''}{apiSuccess}</small>}
                {msg && <small className='text-black text-center  font-bold my-1'>{''}{msg}</small>}
                <form action="" onSubmit={handleSubmit} className=' '>
                    <textarea type="text" name="advertisement" id="" className='w-full border-2 border-black h-[12rem] text-black shadow-lg rounded-md outline-none ' placeholder='add some advertisement' onChange={handleChange} />
                    <button className='w-full my-2 text-white p-4  bg-blue-600 rounded-md' >{isSubmitting ? "Adding Advertisement..." : "Add advertisement"}</button>
                </form>
            </div>

        </div>
    )
}
