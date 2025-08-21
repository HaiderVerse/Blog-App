import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthContainer({ children, authentication }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    // useEffect(() => {
    //     // If authentication is required but user is not logged in
    //     if (authentication && !authStatus) {
    //         navigate("/login");
    //     }
    //     // If authentication is NOT required but user is logged in
    //     else if (!authentication && authStatus) {
    //         navigate("/");
    //     }
    // }, [authentication, authStatus, navigate]);

    // Always return children here, not inside useEffect
    return children;
}
