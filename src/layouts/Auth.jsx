import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function AuthLayout({ children, authentication }) {
    const { status } = useSelector((state) => state.auth)

    if (!authentication && !status) {
        return children
    } else if (authentication && !status) {
        return <Navigate to="/login" />
    } else {
        return <Navigate to="/" />
    }



}
