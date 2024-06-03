import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faUser, faEnvelope, faPhone, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
export default function PaymentSuccess() {
  const { tripId } = useParams();
  const tripData = useSelector(state => state.tripStore.tripData);
  const user = useSelector((state) => state.user.user)
  const tripInfo = tripData.filter((item) => item._id === tripId)[0];
  const addTripToUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/addtrip', { email: user.email, tripId: tripId })
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    addTripToUser()
  }, [user])

  return (
    <div className="bg-gray-100 min-h-screen p-3 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Payment Successful!</h2>
        <div className='w-[100%]'>
          <img src="../../paymentsuccess.jpg" alt="" />
        </div>
        {tripInfo ? (
          <div className='flex flex-row justify-center items-center'>

            <div className='w-[100%]'>
              <div>
                <div className="mb-4 flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold">Trip Information</h3>
                </div>
                <table className="w-full mb-4">
                  <tbody>
                    <tr>
                      <td className="font-semibold">Destination:</td>
                      <td>{tripInfo.destination}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Trip Id:</td>
                      <td>{tripInfo._id}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Trip Price:</td>
                      <td>{tripInfo.price} Rs</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Trip Date:</td>
                      <td>{tripInfo.date}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Trip Duration:</td>
                      <td>{tripInfo.tripDuration} days</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mb-4 flex items-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold">Guide Information</h3>
                </div>
                <div className="mb-2 flex items-center">
                  <img src={tripInfo.guideAllotted.photo} alt="Guide" className="w-12 h-12 rounded-full mr-2" />
                  <div>
                    <p className='text-2xl font-semibold'>{tripInfo.guideAllotted.username}</p>

                  </div>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 mr-2" />
                  <p>{tripInfo.guideAllotted.email}</p>
                </div>
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-600 mr-2" />
                  <p>{tripInfo.guideAllotted.mobile}</p>
                </div>
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon icon={faVenusMars} className="text-gray-600 mr-2" />
                  <p>{tripInfo.guideAllotted.gender}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center">Loading tripInfo information...</p>
        )}
      </div>
    </div>
  );
}
