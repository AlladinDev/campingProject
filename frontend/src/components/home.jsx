import React from 'react';
import imagesJson from './frontImages';
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload'; // Import LazyLoad
import { useSelector } from 'react-redux';
import { useRef } from 'react';

function Home() {
    const navigate = useNavigate();
    
    // console.log(ref)
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch('https://api.tomorrow.io/v4/weather/realtime?location=srinagar&apikey=A9cQ2PDmrxiLRpZUI9s4gjCl592GPpAc', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

    const user = useSelector((state) => state.user.user)
    const advertisementObj = useSelector((state) => state.advertisementStore.advertisement)
    const advertisementPresent = useSelector((state) => state.advertisementStore.advertisementPresent)
    return (
        <>


            <div className='bg-[url(../../homepic.jpg)] min-h-[92vh]  relative bg-cover bg-center '>
                {advertisementPresent && <marquee className='text-2xl p-2 border-2 h-[3rem]  text-white bg-blue-500'>{advertisementObj.advertisement}</marquee>}
                <div className="introcontent  relative top-16 py-12 text-left  text-white font-bold text-4xl">
                    <h4 className='my-5 pl-12 '>Discover The </h4>
                    <h4 className='my-5 pl-12 '>the most Wild</h4>
                    <h4 className='my-5 pl-12 '>places!</h4>
                </div>

                <p className='text-white my-3 text-2xl pl-12'>Discover new places, make memories for the rest of your life!</p>
                <div className='relative top-[100%] my-1  w-full text-center'>
                    <button className='p-3 hover:ring ring-pink-300 hover:animate-pulse text-2xl text-white mt-12 animate-bounce  px-5 bg-blue-700 rounded-full' onClick={() => navigate('/userregister')}>Sign up</button>
                </div>

            </div>

            <div className="videomemories w-full flex justify-around flex-wrap gap-3 sm:gap-4 ">
                <h3 className='w-[98%] mx-auto rounded-lg my-2 flex items-center justify-center bg-blue-700 min-h-12 text-white text-3xl text-center'>Some Of Our Memories</h3>
                {
                    imagesJson.length !== 0 &&
                    imagesJson.map((item, keys) => (
                        <LazyLoad key={keys} height={200} once>
                            <div className="w-full sm:max-w-sm border aspect-square  border-black rounded overflow-hidden shadow-md shadow-black">
                                <img className="w-full" src={item.imgSrc}>
                                </img>
                            </div>
                        </LazyLoad>
                    ))
                }
            </div>
            <div className="trackerReviews w-full my-2">
                <h3 className=' min-h-12 bg-blue-700 text-center flex items-center text-3xl justify-center w-[98%] mx-auto rounded-lg text-white'>Why Join Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2 px-2">
                    <div className="bg-[#ffff] border border-black p-4 rounded-md shadow-xl"><h4 className='text-2xl'>You’re guarded with our trek again philosophy</h4>
                        <p className='my-2'>If you are unable to complete a trek, or if you love a trek, you can repeat it with us anytime. You don’t have to pay us for it. See our thoughts behind this here.  </p></div>
                    <div className="bg-[#ffff] border border-black p-4 shadow-xl rounded-md"><h4 className='text-2xl'>Get expert guidance even before you start the trek</h4>
                        <p className='my-2'>Get personalised support from our expert Experience Coordinators. From registration to departure, they'll prepare you every step of the way.</p></div>
                    <div className="bg-[#ffff] border border-black p-4 shadow-xl rounded-md"><h4 className='text-2xl'>Join any group, they are all women-friendly groups </h4>
                        <p className='my-2'>With around 30% of our trekkers being women, all women, including those travelling solo are comfortable to join any of our groups.</p></div>
                    <div className="bg-[#ffff] border border-black p-4 shadow-xl rounded-md"><h4 className='text-2xl'>Meet like-minded trekkers</h4>
                        <p className='my-2'>Indiahikes carries with it a strong spirit of trekking, one that comes with fitness, minimalism, mindfulness and a deep love for nature.</p></div>
                </div>
            </div>
            <h4 className='text-center py-3 my-2  text-lg border border-black shadow-xl bg-[#ffff]'>Any Queries</h4>
            <div className='contactUs grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 my-3 bg-[url(../../frontContact.jpg)] bg-cover bg-no-repeat'>
                <div className='flex justify-center text-2xl items-center flex-col text-white my-2'>
                    <p className='my-1'>Lets Chat Tell me About your Problems</p>
                    <h2 className='my-2'>You can Contact me at hikersNature@gmail.com</h2>
                </div>
                <div className="p-4 bg-white bg-opacity-15 backdrop-blur-lg rounded shadow-lg border border-black">
                    <h2 className="text-xl font-semibold mb-4 text-center">Contact Us Form</h2>
                    <form className="">
                        <div className="flex flex-col py-2">
                            <label htmlFor="username" className="text-sm text-white">Username</label>
                            <input type="text" id="username" name="username" className="input py-2 border border-black" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="email" className="text-sm text-white">Email</label>
                            <input type="email" id="email" name="email" className="input py-2 border border-black" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="subject" className="text-sm text-white">Subject</label>
                            <input type="text" id="subject" name="subject" className="input py-2 border border-black" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="problem" className="text-sm text-white">Describe the problem</label>
                            <textarea id="problem" name="problem" rows="4" className="input py-2 border border-black"></textarea>
                        </div>
                        <button type="submit" className="btn w-full p-3 bg-blue-500 rounded-md">Submit</button>
                    </form>
                </div>
            </div>
            <div className='footer bg-black text-white  flex justify-around items-center flex-wrap w-full gap-4 my-4'>
                <div className="footerLeftSide text-center p-5 text-2xl">
                    <h2>FAQs</h2>
                    <h2>Cancellation policy</h2>
                    <h2>Contact us</h2>
                    <h2>About us</h2>
                    <h2>Work with us</h2>
                    <h2>Our sustainability practices</h2>
                    <h2>© 2024 Hikers@Nature Private Limited</h2>
                    <h2>All images are copyrighted by their respective authors.</h2>

                </div>
                <div className="footerRightSide  text-center  p-5 text-2xl">
                    <h3 className='text-3xl text-yellow-500'>Contact Us</h3>
                    <h3>080 468 01269</h3>
                    <h3>Mon to Sat - 9.30 AM to 7.30 PM</h3>
                    <h3>Sun - 9.30 AM to 6.30 PM</h3>
                    <h3 className='text-3xl text-yellow-500'>Srinagar Office</h3>
                    <h3 className='text-3xl text-yellow-500'>Karanagar Srinagar</h3>
                    <h3>Delhi Office</h3>
                    <h3>Chandni Chowk</h3>
                </div>
            </div>
        </>
    );
}

export default Home;
