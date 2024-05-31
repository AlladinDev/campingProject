import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
function Protected() {
    let location = useLocation()
    const authStatus = useSelector((state) => state.user.authStatus)
    const userType = useSelector((state) => state.user.userType)
    if (!authStatus || !location.pathname.includes(userType))
        return <Navigate to={`/userlogin`} replace />
    else
        return <Outlet />
}

export default Protected
