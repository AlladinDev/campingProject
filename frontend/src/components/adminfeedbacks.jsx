import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addFeedbacks, deleteFeedback } from '../redux/feedBackSlice'
function AllFeedBackMessages() {
    const [apiErr, setApiErr] = useState('')
    const dispatch = useDispatch()
    const feedbackStore = useSelector((state) => state.feedBackStore)
    const fetchAllFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/feedback/getallfeedbacks')
            console.log(response.data)
            dispatch(addFeedbacks(response.data.feedBacks))
        }
        catch (err) {
            if (err.request) {
                setApiErr("Server Error")
            }
            if (err.response) {
                setApiErr(err.response.data.message)
            }
        }
    }
    useEffect(() => {
        fetchAllFeedbacks()
    }, [])
    const handleDeleteFeedback = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete('http://localhost:8000/api/feedback/deletefeedback', { data: { id: id } })
            dispatch(deleteFeedback(id))
            alert('feedback deleted successfully')
        }
        catch (err) {
            console.log('err in feedback page while deleting feedback', err)
        }
    }
    if (!feedbackStore.feedBacksPresent)
        return <div className='h-[90vh] flex justify-center items-center'>
            <h3 className='p-8 w-[18rem] aspect-video  flex justify-center items-center text-center bg-white shadow-md shadow-black text-2xl hover:scale-105 transition-all text-black duration-700 hover:bg-blue-600 rounded-lg'>No Feedbacks Yet</h3>
        </div>
    return (

        <div className='p-2 min-h-[80vh]  flex  flex-col min-[1030px]:flex-row flex-wrap  justify-around items-center gap-4'>
            {feedbackStore.feedBacks.length !== 0 && feedbackStore.feedBacks.map((item, key) => (
                <div
                    key={key}
                    className="w-full max-w-md flex hover:scale-105 transition-all duration-700 hover:bg-blue-700 hover:text-white text-black rounded-lg justify-center p-7 min-h-32 bg-white shadow-black shadow-md items-center flex-col border border-black"
                >
                    <table className="w-full table ">
                        <tbody className=' '>
                            <tr>
                                <td className="font-semibold">Username</td>
                                <td>{item.username}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Email</td>
                                <td>{item.email}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Message</td>
                                <td className=''>{item.feedBack}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className="w-full btn ring ring-offset-1 ring-purple-500 bg-violet-500 rounded-md text-white text-2xl mt-4"
                        onClick={() => handleDeleteFeedback(item._id)}
                    >
                        Delete Feedback
                    </button>
                </div>

            ))}
        </div>
    )
}

export default AllFeedBackMessages
{/*    <h2 className='p-3 text-2xl  '>userName :{" "}{item.username}</h2>
<h2 className='p-3  '>email :{" "}{item.email}</h2>
<h2 className='p-3'>message :{" "}{item.feedBack}</h2>
*/}