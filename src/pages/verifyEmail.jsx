import { useEffect } from 'react'
import authService from '@/services/auth'
import { useDispatch } from 'react-redux'
import { login } from '@/features/auth/authSlice'
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
    const urlParams = new URLSearchParams(window.location.search);
    const dispatch = useDispatch();
    console.log(urlParams.get('userId'), urlParams.get('secret'));
    const navigate = useNavigate();
    useEffect(() => {
        authService.completeMagicLogin({ userId: urlParams.get('userId'), secret: urlParams.get('secret') })
            .then(response => {
                if (response.user) {
                    dispatch(login(response.user))
                    navigate('/')
                }
            }).catch(error => {
                console.error('Email verification failed:', error);
                navigate('/');
            });
    }, [])
    return (
        <></>
    )
}
