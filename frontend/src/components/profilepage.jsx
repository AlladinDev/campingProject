import React from 'react'
export default function Profilepage({ data, heading = '' }) {
  console.log('data received is', data)

  return (
    <div>
      <div className="bg-gray-100 p-6 min-h-screen">
        {/* data Profile Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className='text-center font-bold text-2xl'>Hey ! Welcome Back <span className='text-blue-600 text-3xl'>{data.username}</span></h2>
          <div className="flex items-center mb-4">
            <img className="w-24 h-24 rounded-full mr-4 shadow-lg" src={data.photo} alt="data Profile Picture" />

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Username</strong> <span className=' text-blue-600'>{data.username}</span></p>
              <p><strong>Phone:</strong> {data.mobile}</p>
            </div>
            <div>
              <p><strong>Address:</strong> {data.address}</p>
              <p><strong>Qualification</strong> {data.qualification ? data.qualification : "Not Available"}</p>
            </div>
            <div>
              <p><strong>Age:</strong> {data.age}</p>
              <p><strong>Gender</strong> {data.gender}</p>
            </div>
            <div>
              <p><strong>Total Trips:</strong> {data.tripId?.length}</p>
              <p><strong>Email:</strong> {data.email}</p>

            </div>
          </div>
        </div>

        {/* Trip Information Section */}
        {data?.tripId?.length !== 0 ?

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{heading}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.tripId.map((trip, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-6 shadow-lg  hover:border hover:border-black">
                  <h4 className="text-lg font-bold mb-4 text-gray-800">{trip.name}</h4>
                  <table className="min-w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-gray-700">Destination:</td>
                        <td className="py-2 text-gray-700">{trip.destination}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-gray-700">Date:</td>
                        <td className="py-2 text-gray-700">{trip.date}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-gray-700">Duration:</td>
                        <td className="py-2 text-gray-700">{trip.tripDuration} days</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-gray-700">Pick Up Place:</td>
                        <td className="py-2 text-gray-700">{trip.pickUpPlace}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-gray-700">Trip Cost:</td>
                        <td className="py-2 text-gray-700">{trip.price}Rs</td>
                      </tr>
                      <tr>
                        <td colSpan='2' className=" text-center py-2 text-gray-700">Trip Id</td>
                      </tr>
                      <tr>
                        <td colSpan='2' className="py-2 text-gray-700">{trip._id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div> : <div className='border h-10vh flex justify-center items-center '><h2 className='bg-[#ffff] p-9 w-[18rem] text-center font-bold text-2xl rounded-sm hover:scale-105 transition-all duration-500 shadow-lg'>No Trips Associated With You</h2></div>}
      </div>
    </div>
  )
}
