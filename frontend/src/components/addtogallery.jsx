import api from './baseApi';
import React, { useState } from 'react';
function AddToGallery() {
    const [apiErr, setApiErr] = useState('')
    const [apiSuccess, setApiSuccess] = useState('')
    const [msg, setMsg] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const handleSubmission = async (e) => {
        try {
            e.preventDefault()
            console.log(e.target[0].files[0])
            setApiErr('')
            setApiSuccess('')
            setMsg("Uploading Photo...")
            
            setSubmitting(true)
            
            const result = await api.post('/api/gallery/addphoto', { photo: e.target[0].files[0] }, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
            setSubmitting(false)
            setMsg('')
            setApiSuccess("Uploaded Successfully")

        }
        catch (err) {
            setSubmitting(false)
            setMsg('')
            if (err.response) {
                setApiErr(err.response.data.message)
                return
            }
            if (err.request) {
                setApiErr('Server Error')
                return
            }
            if(err)
                setApiErr("Some Error Occurred")
            console.log(err)

        }

    }

    return (
        <div className='min-h-[90vh] flex justify-center items-center'>
            <form action="" onSubmit={handleSubmission} className='border-2 p-7 rounded-md bg-white bg-opacity-20 backdrop-blur-lg min-h-[40vh] '>
                <h2 className='text-2xl text-center text-black my-2'>Upload Some Memory Here</h2>
                {apiErr && <small className='text-red-700 w-full  text-2xl block text-center my-2'>{apiErr}</small>}
                {apiSuccess && <small className='text-green-700 text-2xl block text-center my-2'>{apiSuccess}</small>}
                {msg && <small className='text-black  text-2xl   block text-center my-2'>{msg}</small>}
                <div className=' flex justify-center items-center p-3 '>
                    <input type="file" name="" id="" className='p-5 border-2 border-black  rounded-full w-full my-2' />
                </div>
                <div><button  disabled ={submitting} className='p-3 w-full bg-blue-500 rounded-lg hover:scale-95 transition-all duration-500 text-2xl my-2'>{submitting ? "Submitting ...":"Upload"}</button></div>
            </form>

        </div>
    );
}

export default AddToGallery;

