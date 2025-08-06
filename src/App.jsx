import conf from '@/conf/conf';
import { useEffect, useState } from 'react';
import authService from '@/services/auth.js'
import { useDispatch } from 'react-redux';
import { login, logout } from '@/features/auth/authSlice.js';


export default function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <h1>{loading}</h1>
    </>
  )
}