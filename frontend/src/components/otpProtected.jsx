import { React, useEffect, useState } from 'react'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
function OtpProtected() {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (!location?.state) {
            navigate('/userlogin')
        }
    }, [location])
    return (
        location?.state && <Outlet />
    )
}

export default OtpProtected
