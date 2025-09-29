import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthContainer({ children, authentication }) {
    const navigate = useNavigate();
    const { status: authStatus, loading: authLoading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        // Only run after loading is finished
        if (!authLoading) {
            if (authentication && !authStatus) {
                navigate("/login");
            } else if (!authentication && authStatus) {
                navigate("/");
            }
        }
    }, [authStatus, authentication, authLoading, navigate]);

    // Show spinner or nothing until loading finishes
    if (authLoading) {
        return <div>Loading...</div>;
    }

    return children;
}
