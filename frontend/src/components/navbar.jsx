import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserLarge, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Navbar() {
  const location = useLocation()
  const [returnFlag, setReturnFlag] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const username = useSelector((state) => state.user.username)
  const navigate = useNavigate()
  const handleChange = (e) => {
    console.log(e.target.value)
    const name = e.target.value.toLowerCase()
    e.target.value = ""
    if (name == '/') {//if option is / home then navigate to / and return
      navigate('/')
      return
    }
    navigate(`/${name}page`)

  }
  window.addEventListener('resize', () => {
    //this is because on smaller devices less than 670 px admin page has its own sidebard as navigation pannel
    //so this navbar should hide at that time
    const width = window.innerWidth
    console.log(width)
    if (width <= '678' && location.pathname == '/adminpage') {
      setReturnFlag(false)
    }
    else if (width > '670') {
      setReturnFlag(false)
    }
  })
  if (returnFlag)
    return null

  return (
    <header>
      <nav className='bg-[#1D4ED8] w-100  relative text-white shadow-md'>
        <div className="uppernav h-[8vh] top-1 border-b border-white text-2xl flex justify-between px-5 items-center">
          <h2>Hikers</h2>
          <ul className='hidden md:flex gap-12  justify-between items-center'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/explore'>Explore</Link>
            </li>
            <li>
              <Link to='/aboutus'>About Us</Link>
            </li>
            <li>
              <Link to='/Gallery'>Gallery</Link>
            </li>
          </ul>
          <div className='block md:hidden' onClick={() => setOpen(!isOpen)}><FontAwesomeIcon icon={faBars} className='text-[2rem]' /></div>
          <div className='dropdownmenu hidden md:block'>
            <select className="bg-[#ffff] max-w-[16vw] text-black p-2 rounded-full" name='category' onChange={handleChange}>
              <option value="">Sign in</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Guide">Guide</option>
              <option value="/">Home</option>
            </select>
          </div>
        </div>
        <div className={`btmnav ${isOpen ? `h-[80vh]` : `h-[0vh]`} w-full overflow-hidden  absolute z-40 transition-all  bg-[#4A71E0] top-[8vh] left-0   duration-500 ease-in-out`}>
          <ul className='w-full  p-3 flex flex-col text-2xl py-12 justify-between items-center'>
            <li className=' hover:bg-gray-400 p-3 px-6 rounded-full'>
              <Link to='/'>Home</Link>
            </li>
            <li className=' hover:bg-gray-400 p-3 px-6 rounded-full'>
              <Link to='/explore'>Explore</Link>
            </li>
            <li className=' hover:bg-gray-400 p-3 px-6 rounded-full'>
              <Link to='/aboutus'>About Us</Link>
            </li>
            <li className=' hover:bg-gray-400 p-3 px-6 rounded-full'>
              <Link to='/gallery'>Gallery</Link>
            </li>
           
            <li className=' hover:bg-gray-400 p-3 px-6 rounded-full'>
              <Link to='/userregister'>Register</Link>
            </li>
           
          </ul>
          <select className="bg-[#ffff] text-black text-2xl select select-info w-full p-2 rounded-full" name='category' onChange={handleChange}>
              <option value="">Sign in</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Guide">Guide</option>
              <option value="/">Home</option>
            </select>
        </div>
      </nav>
    </header>
  )
}
