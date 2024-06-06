import api from './baseApi';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addAnotherTrip } from '../redux/tripsSlice';
const TripForm = () => {
  const dispatch = useDispatch()
  const availableGuides = useSelector((state) => state.allMembers.memberData)
  const [guides, setGuides] = useState([])
  const [apiErr, setApiError] = useState('')
  const [apiSuccess, setApiSuccess] = useState('')
  const [apiMsg, setApiMsg] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [tripData, setTripData] = useState({
    destination: '',
    photo: "",
    guideAllotted: '',
    date: '',
    pickUpPlace: '',
    price: '',
    description: '',
    tripServices: '',
    tripDuration: '',
    tripType:'',
    difficulty:''
  });
  useEffect(() => {
    setGuides(availableGuides)
  }, [availableGuides])

  const handleChange = (e) => {
    setApiMsg('')
    setApiSuccess('')
    setApiError('')
    setSubmitting(false)
    const { name, value, files } = e.target;
    if (files) {
      console.log(files)
      setTripData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
    else {
      setTripData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
 const validateData=(data)=>{

 }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    setApiSuccess('')
    console.log('final data is', tripData)
    setApiMsg('adding trip plz wait')
    setSubmitting(true)

    try {
      console.log(tripData)
      const response = await api.post('/api/trips/addtrip', tripData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })
      console.log(response)
      setApiSuccess("Trip Added Successfully")
      dispatch(addAnotherTrip(response.data.trip))
      setSubmitting(false)
      // setApiSuccess('Trip Added Successfully')
      // const tripsResponse = await api.get('http://localhost:8000/api/trips/getalltrips')
    }
    catch (err) {
      setApiError('oops something went wrong')
      setApiSuccess('')
      console.log(err)
    }
    setSubmitting(false)
    setApiMsg('')
  };
  return (
    <div className="max-w-sm mx-auto bg-white bg-opacity-15 backdrop-blur-lg text-black p-6 border border-gray rounded-lg shadow-lg">
      <h2 className="text-2xl text-white font-semibold mb-4">Add New Trip</h2>
      <h2 className='text-white text-center font-serif'>{apiMsg && apiMsg}</h2>
      <h2 className='text-white text-2xl text-center font-serif'>{apiErr && apiErr}</h2>
      <h2 className='text-white  text-2xl text-center font-serif'>{apiSuccess && apiSuccess}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-white font-semibold mb-2 ">Destination</label>
          <input type="text" id="destination" name="destination" value={tripData.destination} onChange={handleChange} className="input border border-black w-full py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-white font-semibold mb-2">Photos</label>
          <input type="file" id="photo" name="photo" onChange={handleChange} className="input w-full py-2 px-4 border border-black" />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-white font-semibold mb-2">Trip Date</label>
          <input type="date" id="Date" name="date" value={tripData.date} onChange={handleChange} className="input w-full py-2 px-4 border border-black" />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-white font-semibold mb-2">Trek Duration</label>
          <input type="text" id="tripDuration" name="tripDuration" value={tripData.tripDuration} onChange={handleChange} className="input w-full py-2 px-4 border border-black" />
        </div>
        <div className="mb-4">
          <label htmlFor="pickupPlace" className="block text-white font-semibold mb-2">Pickup Place</label>
          <input type="text" id="pickupPlace" name="pickUpPlace" value={tripData.pickUpPlace} onChange={handleChange} className="input w-full border border-black py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-white font-semibold mb-2">Amount To Be Paid</label>
          <input type="tel" id="price" name="price" value={tripData.price} onChange={handleChange} className="input w-full border border-black py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="placedescription" className="block text-white font-semibold mb-2">Description</label>
          <input type="text" id="description" name="description" value={tripData.description} onChange={handleChange} className="input w-full border border-black py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="whatIsIncluded" className="block text-white font-semibold mb-2">what's Included</label>
          <input type="text" id="tripIncludedServices" name="tripServices" value={tripData.tripServices} onChange={handleChange} className="input w-full border border-black py-2 px-4" />
        </div>
        <div className="mb-4  ">
         <select name="tripType" id="" className='rounded-lg px-4 py-3 w-full' value={tripData.tripType} onChange={handleChange}>
          <option value="">Trip Type</option>
          <option value="camping">Camping</option>
          <option value="trekking">Trekking</option>
         </select>
        </div>
        <div className="mb-4  ">
         <select name="difficulty" id="" className='rounded-lg px-3 py-3 w-full' value={tripData.difficulty} onChange={handleChange}>
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Tough">Tough</option>
         </select>
        </div>
        <div className="mb-4">
          <select name="guideAllotted" id="" value={tripData.guideAllotted} onChange={handleChange} className="border  border-gray-400 rounded-lg px-3 py-3 w-full">
            <option value=''>Guide List</option>
            {
              guides.map((item, keys) => (
                <option key={keys} value={item._id} onChange={handleChange}>{item.username}</option>
              ))
            }
          </select>

        </div>
        <button disabled={isSubmitting} type="submit" className=" text-2xl w-full p-3 shadow-sm transition duration-600 text-white bg-blue-400 hover:bg-blue-600">{isSubmitting ? "Submitting..."   : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TripForm;

